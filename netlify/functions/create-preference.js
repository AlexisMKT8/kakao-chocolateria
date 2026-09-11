const https = require('https');

const MP_ACCESS_TOKEN = 'APP_USR-6791239021176944-052015-228b2f95e2ebacbf0053f6ae85934566-168629346';

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { items, payer, folio } = data;

    const mpItems = (items || []).map(item => ({
      title: item.name || 'Bandeja KAKAO Chocolatería',
      unit_price: Number(item.unitPrice || item.price || 360),
      quantity: Number(item.qty || 1),
      currency_id: 'MXN'
    }));

    if (mpItems.length === 0) {
      mpItems.push({
        title: `Pedido KAKAO Tapalpa #${folio || 'ORDEN'}`,
        unit_price: Number(data.totalAmount || 360),
        quantity: 1,
        currency_id: 'MXN'
      });
    }

    const preferencePayload = JSON.stringify({
      items: mpItems,
      payer: {
        name: payer?.name || 'Cliente KAKAO',
        email: payer?.email || 'contacto@kakaochocolateria.com',
        phone: {
          number: payer?.phone || ''
        }
      },
      external_reference: folio || `KAK-${Date.now().toString().slice(-4)}`,
      statement_descriptor: 'KAKAO CHOCOLATERIA',
      back_urls: {
        success: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=approved',
        failure: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=rejected',
        pending: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=pending'
      },
      notification_url: 'https://kakao-chocolateria-tapalpa.netlify.app/.netlify/functions/mercadopago-webhook',
      auto_return: 'approved'
    });

    const options = {
      hostname: 'api.mercadopago.com',
      path: '/checkout/preferences',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Length': Buffer.byteLength(preferencePayload)
      }
    };

    const mpResponse = await new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, body }));
      });
      req.on('error', reject);
      req.write(preferencePayload);
      req.end();
    });

    const parsedResponse = JSON.parse(mpResponse.body || '{}');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        init_point: parsedResponse.init_point,
        id: parsedResponse.id
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
