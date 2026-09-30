import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const REVIEW_URL = 'https://www.northhindipandit.in/review';
const OUTPUT_DIR = path.resolve('client/public');

async function generateQRCodes() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate crisp QR code PNG
  const qrPath = path.join(OUTPUT_DIR, 'google_review_qr.png');
  await QRCode.toFile(qrPath, REVIEW_URL, {
    width: 600,
    margin: 2,
    color: {
      dark: '#7C2D12', // Deep spiritual maroon
      light: '#FFFFFF'
    }
  });

  // Generate SVG QR code
  const svgPath = path.join(OUTPUT_DIR, 'google_review_qr.svg');
  const svgString = await QRCode.toString(REVIEW_URL, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#7C2D12',
      light: '#FFFFFF'
    }
  });
  fs.writeFileSync(svgPath, svgString);

  console.log('Successfully generated review QR codes at:', qrPath, svgPath);
}

generateQRCodes();
