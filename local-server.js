const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const MP_ACCESS_TOKEN = 'APP_USR-6791239021176944-052015-228b2f95e2ebacbf0053f6ae85934566-168629346';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle Mercado Pago Preference API proxy
  if (req.url.startsWith('/.netlify/functions/create-preference') || req.url.startsWith('/api/mp-preference') || req.url.startsWith('/api/create-preference')) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}');
          
          let items = [];
          if (Array.isArray(data.items) && data.items.length > 0) {
            items = data.items.map(it => ({
              title: it.name || it.title || 'Bandeja KAKAO Chocolatería',
              unit_price: Number(it.unitPrice || it.unit_price || it.price || 360),
              quantity: Number(it.qty || it.quantity || 1),
              currency_id: 'MXN'
            }));
          } else {
            items = [{
              title: `Pedido KAKAO Tapalpa #${data.folio || 'ORDEN'}`,
              unit_price: Number(data.totalAmount || 360),
              quantity: 1,
              currency_id: 'MXN'
            }];
          }

          const payload = JSON.stringify({
            items: items,
            payer: {
              name: data.payer?.name || 'Cliente KAKAO',
              email: data.payer?.email || 'contacto@kakaochocolateria.com',
              phone: {
                number: data.payer?.phone || ''
              }
            },
            external_reference: data.folio || 'KAK-ORDEN',
            statement_descriptor: 'KAKAO TAPALPA',
            back_urls: {
              success: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=approved',
              failure: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=failure',
              pending: 'https://kakao-chocolateria-tapalpa.netlify.app/?status=pending'
            },
            auto_return: 'approved'
          });

          const mpReq = https.request({
            hostname: 'api.mercadopago.com',
            path: '/checkout/preferences',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + MP_ACCESS_TOKEN,
              'Content-Length': Buffer.byteLength(payload)
            }
          }, mpRes => {
            let mpBody = '';
            mpRes.on('data', c => mpBody += c);
            mpRes.on('end', () => {
              res.writeHead(mpRes.statusCode || 200, { 'Content-Type': 'application/json' });
              res.end(mpBody);
            });
          });

          mpReq.on('error', err => {
            console.error('MP Request error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });

          mpReq.write(payload);
          mpReq.end();
        } catch (e) {
          console.error('Server parse error:', e);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }
  }

  // Static File Server
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl === '/') cleanUrl = '/index.html';
  let filePath = path.join(__dirname, decodeURIComponent(cleanUrl));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
