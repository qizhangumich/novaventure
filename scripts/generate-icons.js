import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../public/logo.svg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    const svgBuffer = await fs.readFile(inputFile);
    
    // Generate favicon.ico (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.ico'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 