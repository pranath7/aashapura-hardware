import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processLogo() {
  try {
    const inputPath = path.join(__dirname, 'public', 'images', 'logo.png');
    const outputPath = path.join(__dirname, 'public', 'images', 'logo_white.png');

    console.log('Reading logo from:', inputPath);
    const image = await Jimp.read(inputPath);

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];

      // If the pixel is very light (close to white background)
      if (red > 240 && green > 240 && blue > 240) {
        // Set to fully transparent
        this.bitmap.data[idx + 0] = 0;
        this.bitmap.data[idx + 1] = 0;
        this.bitmap.data[idx + 2] = 0;
        this.bitmap.data[idx + 3] = 0;
      } else {
        // Turn the logo elements (monogram, text, handle) to pure solid white
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
        this.bitmap.data[idx + 3] = 255;
      }
    });

    console.log('Saving processed white logo to:', outputPath);
    await image.write(outputPath);
    console.log('Logo processing completed successfully!');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
