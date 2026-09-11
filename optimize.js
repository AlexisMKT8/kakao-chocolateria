const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Defer Mercado Pago SDK
html = html.replace(
  '<script src="https://sdk.mercadopago.com/js/v2"></script>',
  '<script defer src="https://sdk.mercadopago.com/js/v2"></script>'
);

// 2. Preload none on video so it does not block initial load
html = html.replace(
  '<video class="hero-video-bg" autoplay muted loop playsinline poster="assets/hero_bg.jpg">',
  '<video class="hero-video-bg" autoplay muted loop playsinline preload="none" poster="assets/hero_bg.jpg">'
);

// 3. Add loading="lazy" and decoding="async" to images except brand-center-logo
html = html.replace(/<img (?!.*brand-center-logo)(?!.*loading=)([^>]+)>/g, '<img loading="lazy" decoding="async" $1>');

// 4. Also add fetchpriority="high" to brand-center-logo
html = html.replace('class="brand-center-logo"', 'class="brand-center-logo" fetchpriority="high"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html optimized successfully!');
