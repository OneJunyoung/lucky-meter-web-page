import fs from 'fs';
import path from 'path';
import https from 'https';

const baseUrl = 'https://lucky-meter.com';
const images = [
  "/images/ec-9e-90-ec-82-b0-202.png",
  "/images/image-2025-12-18-17-48-12.png",
  "/images/image-2025-12-18-17-12-47.png",
  "/indian-man-driver-portrait-1.jpg",
  "/indian-man-driver-portrait-2.jpg",
  "/indian-man-driver-portrait-3.jpg",
  "/indian-man-driver-portrait-4.jpg",
  "/cricket-match-highlights.png",
  "/football-match-highlights.png",
  "/kabaddi-match-highlights.jpg",
  "/amazon-logo.png",
  "/zomato-logo-red.jpg",
  "/blinkit-logo-yellow.jpg",
  "/zepto-logo-purple.jpg",
  "/swiggy-logo-orange.png",
  "/uber-logo-black.png",
  "/flipkart-logo-blue.jpg"
];

const downloadImage = (urlPath) => {
  return new Promise((resolve, reject) => {
    const fileUrl = baseUrl + urlPath;
    const dest = path.join(process.cwd(), 'public', urlPath);
    
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    
    const file = fs.createWriteStream(dest);
    https.get(fileUrl, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(urlPath);
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
};

async function run() {
  for (const img of images) {
    try {
      await downloadImage(img);
      console.log(`Downloaded ${img}`);
    } catch (e) {
      console.error(`Failed to download ${img}: ${e.message}`);
    }
  }
}

run();
