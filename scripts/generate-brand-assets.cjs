const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const publicDir = path.join(root, 'public');
const faviconDir = path.join(publicDir, 'favicon');
const ogDir = path.join(publicDir, 'og');

fs.mkdirSync(faviconDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });

const svgPath = path.join(faviconDir, 'favicon.svg');

async function buildFavicon() {
  const iconPng = path.join(faviconDir, 'favicon-32x32.png');
  const applePng = path.join(faviconDir, 'apple-touch-icon.png');
  const icon192 = path.join(faviconDir, 'icon-192.png');
  const icon512 = path.join(faviconDir, 'icon-512.png');
  const icoPath = path.join(publicDir, 'favicon.ico');

  await sharp(svgPath).resize(32, 32).png().toFile(iconPng);
  await sharp(svgPath).resize(180, 180).png().toFile(applePng);
  await sharp(svgPath).resize(192, 192).png().toFile(icon192);
  await sharp(svgPath).resize(512, 512).png().toFile(icon512);
  await sharp(svgPath).resize(64, 64).toFile(icoPath);
}

function ogSvg() {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8f4ee"/>
      <stop offset="55%" stop-color="#efe7db"/>
      <stop offset="100%" stop-color="#e2d4bf"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d4af37" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="600" cy="315" r="260" fill="url(#glow)"/>

  <rect x="70" y="70" width="1060" height="490" rx="36" fill="none" stroke="#c7a97f" stroke-width="2" opacity="0.85"/>
  <rect x="92" y="92" width="1016" height="446" rx="30" fill="none" stroke="#d8c1a1" stroke-width="1" opacity="0.75"/>

  <circle cx="600" cy="315" r="110" fill="none" stroke="#c7a97f" stroke-width="2"/>
  <circle cx="600" cy="315" r="95" fill="none" stroke="#c7a97f" stroke-width="1" opacity="0.75"/>

  <text x="600" y="333" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="72" letter-spacing="4" fill="#b8905c">S&amp;S</text>

  <path d="M170 315 C280 240, 390 240, 500 315" fill="none" stroke="#c7a97f" stroke-opacity="0.35" stroke-width="1.5"/>
  <path d="M700 315 C810 240, 920 240, 1030 315" fill="none" stroke="#c7a97f" stroke-opacity="0.35" stroke-width="1.5"/>
  <path d="M170 315 C280 390, 390 390, 500 315" fill="none" stroke="#c7a97f" stroke-opacity="0.35" stroke-width="1.5"/>
  <path d="M700 315 C810 390, 920 390, 1030 315" fill="none" stroke="#c7a97f" stroke-opacity="0.35" stroke-width="1.5"/>
</svg>
`;
}

async function buildOgImage() {
  const svg = Buffer.from(ogSvg());
  await sharp(svg).png({ compressionLevel: 9 }).toFile(path.join(ogDir, 'og-card.png'));
}

Promise.all([buildFavicon(), buildOgImage()])
  .then(() => console.log('Assets generated'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
