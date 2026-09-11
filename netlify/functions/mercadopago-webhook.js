const https = require('https');

/**
 * Netlify Function: mercadopago-webhook
 * Procesa notificaciones IPN / Webhooks de Mercado Pago.
 * Envía alertas automáticas vía Push (ntfy.sh) y Correo (Resend / SendGrid)
 * ÚNICAMENTE cuando el estado del pago es 'approved'.
 */

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-6791239021176944-052015-228b2f95e2ebacbf0053f6ae85934566-168629346';
const NTFY_TOPIC = process.env.NTFY_TOPIC || 'kakao_tapalpa_orders_sec_9942';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'contacto@kakaochocolateria.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';

// Helper para peticiones HTTPS genéricas
function sendHttpsRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// 1. Notificación Push vía ntfy.sh
async function sendNtfyPushNotification(orderInfo) {
  try {
    const topic = encodeURIComponent(NTFY_TOPIC);
    const message = `🍫 ¡Nuevo pedido PAGADO!\nFolio: ${orderInfo.folio}\nCliente: ${orderInfo.clientName}\nTotal: $${orderInfo.total} MXN\n\nResumen:\n${orderInfo.summary}`;

    const options = {
      hostname: 'ntfy.sh',
      path: `/${topic}`,
      method: 'POST',
      headers: {
        'Title': 'Nuevo pedido pagado — KAKAO Chocolateria',
        'Priority': 'urgent',
        'Tags': 'chocolate,moneybag,sparkles',
        'Content-Type': 'text/plain; charset=utf-8'
      }
    };

    await sendHttpsRequest(options, message);
    console.log('[ntfy] Notificación push enviada con éxito.');
  } catch (err) {
    console.error('[ntfy] Error enviando push:', err.message);
  }
}

// 2. Notificación Correo (Resend o SendGrid)
async function sendEmailNotification(orderInfo) {
  // Intentar con Resend si está disponible
  if (RESEND_API_KEY) {
    try {
      const emailPayload = JSON.stringify({
        from: 'KAKAO Notificaciones <onboarding@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        subject: `Nuevo pedido pagado — #${orderInfo.folio}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #603813; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">¡Nuevo Pedido Pagado! · KAKAO Chocolatería</h2>
            <p><strong>Folio:</strong> ${orderInfo.folio}</p>
            <p><strong>Cliente:</strong> ${orderInfo.clientName}</p>
            <p><strong>Teléfono:</strong> ${orderInfo.clientPhone || 'No especificado'}</p>
            <p><strong>Total:</strong> $${orderInfo.total} MXN</p>
            <p><strong>Fecha/Hora de Pick Up:</strong> ${orderInfo.pickupInfo || 'Tapalpa Centro'}</p>
            <div style="background: #faf7f2; padding: 12px; border-radius: 6px; margin: 15px 0;">
              <strong>Detalle del pedido:</strong>
              <pre style="white-space: pre-wrap; font-family: inherit; margin-top: 5px;">${orderInfo.summary}</pre>
            </div>
            <p style="color: #666; font-size: 12px;">Transacción confirmada vía Mercado Pago.</p>
          </div>
        `
      });

      const options = {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(emailPayload)
        }
      };

      await sendHttpsRequest(options, emailPayload);
      console.log('[Resend] Email enviado con éxito.');
      return;
    } catch (err) {
      console.error('[Resend] Error enviando email:', err.message);
    }
  }

  // Fallback con SendGrid si está configurado
  if (SENDGRID_API_KEY) {
    try {
      const sgPayload = JSON.stringify({
        personalizations: [{ to: [{ email: NOTIFICATION_EMAIL }] }],
        from: { email: 'notificaciones@kakaochocolateria.com', name: 'KAKAO Chocolatería' },
        subject: `Nuevo pedido pagado — #${orderInfo.folio}`,
        content: [{
          type: 'text/html',
          value: `<h2>Nuevo Pedido Pagado #${orderInfo.folio}</h2><p>Cliente: ${orderInfo.clientName}</p><p>Total: $${orderInfo.total} MXN</p><p>${orderInfo.summary}</p>`
        }]
      });

      const options = {
        hostname: 'api.sendgrid.com',
        path: '/v3/mail/send',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(sgPayload)
        }
      };

      await sendHttpsRequest(options, sgPayload);
      console.log('[SendGrid] Email enviado con éxito.');
    } catch (err) {
      console.error('[SendGrid] Error enviando email:', err.message);
    }
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: ''
    };
  }

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        // Podría venir como x-www-form-urlencoded
      }
    }

    const query = event.queryStringParameters || {};
    const topic = body.topic || query.topic || body.type;
    const paymentId = (body.data && body.data.id) || query.id || query['data.id'] || body.id;

    console.log(`[Webhook MP] Recibido evento: type=${topic}, paymentId=${paymentId}`);

    // Si viene la notificación de pago
    if (paymentId && (topic === 'payment' || topic === 'merchant_order' || !topic)) {
      // Consultar estado en la API de Mercado Pago
      const mpOptions = {
        hostname: 'api.mercadopago.com',
        path: `/v1/payments/${paymentId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      };

      const mpRes = await sendHttpsRequest(mpOptions, null);
      if (mpRes.statusCode === 200) {
        const paymentData = JSON.parse(mpRes.body);
        const status = paymentData.status; // 'approved', 'pending', 'rejected', etc.

        console.log(`[Webhook MP] Estado del pago #${paymentId}: ${status}`);

        // DISPARAR NOTIFICACIÓN SOLO SI EL PAGO ESTÁ APROBADO
        if (status === 'approved') {
          const folio = paymentData.external_reference || `KAK-${paymentId}`;
          const total = paymentData.transaction_amount || 0;
          const payerName = (paymentData.payer && (paymentData.payer.first_name || paymentData.payer.email)) || 'Cliente KAKAO';
          const payerPhone = (paymentData.payer && paymentData.payer.phone && paymentData.payer.phone.number) || '';
          
          let itemsSummary = 'Artículos:\n';
          if (paymentData.additional_info && paymentData.additional_info.items) {
            itemsSummary += paymentData.additional_info.items.map(it => `• ${it.title} x${it.quantity} ($${it.unit_price} c/u)`).join('\n');
          } else {
            itemsSummary += '• Pedido realizado y pagado con Mercado Pago.';
          }

          const orderInfo = {
            folio: folio,
            clientName: payerName,
            clientPhone: payerPhone,
            total: total,
            summary: itemsSummary,
            pickupInfo: 'Pick Up en el centro de Tapalpa'
          };

          // Ejecutar en paralelo sin bloquear la respuesta a Mercado Pago
          await Promise.allSettled([
            sendNtfyPushNotification(orderInfo),
            sendEmailNotification(orderInfo)
          ]);
        }
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ok', received: true })
    };
  } catch (error) {
    console.error('[Webhook MP] Error general:', error);
    return {
      statusCode: 200, // Siempre responder 200 a MP para evitar reintentos excesivos
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'error_logged', message: error.message })
    };
  }
};
