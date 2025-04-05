const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ICON_SIZES = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];
const SOURCE_ICON = path.join(__dirname, '../src/assets/logo.png');
const PUBLIC_DIR = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // Ensure public directory exists
    await fs.mkdir(PUBLIC_DIR, { recursive: true });

    // Generate favicon.ico (multi-size)
    await sharp(SOURCE_ICON)
      .resize(32, 32)
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));

    // Generate PNG icons
    for (const size of ICON_SIZES) {
      await sharp(SOURCE_ICON)
        .resize(size, size)
        .toFile(path.join(PUBLIC_DIR, `icon-${size}x${size}.png`));
    }

    // Generate apple-touch-icon
    await sharp(SOURCE_ICON)
      .resize(180, 180)
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

    // Generate android chrome icons
    await sharp(SOURCE_ICON)
      .resize(192, 192)
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));

    await sharp(SOURCE_ICON)
      .resize(512, 512)
      .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));

    console.log('✅ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 