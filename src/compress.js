const tinify = require('tinify');
tinify.key = 'QWRZf5mpRCR3qh0425xqMx12Y7JcXD9N'; // Replace with your actual API key

console.log(`Current working directory: ${process.cwd()}`);

// Function to compress and convert an image to WebP
const compressToWebP = (inputPath, outputPath) => {
  tinify.fromFile(inputPath).toFile(outputPath)
    .then(() => {
      console.log(`Image ${inputPath} compressed and converted to WebP successfully!`);
    })
    .catch(err => {
      console.error(`Error compressing and converting ${inputPath}:`, err);
    });
};

// List of images to be compressed and converted
const images = [
  'logo-dark.png',
  'hs-image-1.jpg',
  'decoration-2.png',
  'section-image-1.jpg',
  'section-image-2.jpg',
  'section-image-3.jpg',
  'section-image-4.jpg',
  'services/service-1.png',
  'services/service-2.png',
  'services/service-3.png',
  'services/service-4.png',
  'section-image-6.jpg',
  'section-image-7.jpg',
  'section-image-5.png',
  'portfolio/project-6.jpg',
  'portfolio/project-1.jpg',
  'portfolio/project-4.jpg',
  'portfolio/project-2.jpg',
  'portfolio/project-3.jpg',
  'portfolio/project-5.jpg'
];

// Compress and convert each image to WebP
images.forEach(image => {
  const inputPath = `./images/demo-gradient/${image}`;
  const outputPath = `./images/demo-gradient/${image.split('.').slice(0, -1).join('.')}-compressed.webp`;
  compressToWebP(inputPath, outputPath);
});

console.log('Compression and conversion function called.');
