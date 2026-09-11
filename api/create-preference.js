const https = require('https');

const MP_ACCESS_TOKEN = 'APP_USR-6791239021176944-052015-228b2f95e2ebacbf0053f6ae85934566-168629346';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
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

    const host = req.headers.host || 'kakao-chocolateria.vercel.app';
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;

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
        success: `${baseUrl}/?status=approved`,
        failure: `${baseUrl}/?status=rejected`,
        pending: `${baseUrl}/?status=pending`
      },
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
      const mpReq = https.request(options, mpRes => {
        let body = '';
        mpRes.on('data', chunk => body += chunk);
        mpRes.on('end', () => resolve({ statusCode: mpRes.statusCode, body }));
      });
      mpReq.on('error', reject);
      mpReq.write(preferencePayload);
      mpReq.end();
    });

    const parsedResponse = JSON.parse(mpResponse.body || '{}');
    return res.status(200).json({
      init_point: parsedResponse.init_point,
      id: parsedResponse.id
    });
  } catch (error) {
    console.error('Error in create-preference:', error);
    return res.status(500).json({ error: error.message });
  }
};
