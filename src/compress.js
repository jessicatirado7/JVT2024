const tinify = require('tinify');
tinify.key = 'QWRZf5mpRCR3qh0425xqMx12Y7JcXD9N'; // Replace with your actual API key

console.log(`Current working directory: ${process.cwd()}`);

// Compress an image from a file
tinify.fromFile('./images/demo-gradient/logo-dark.png').toFile('./images/demo-gradient/logo-dark-compressed.png');

tinify.fromFile('./images/demo-gradient/hs-image-1.jpg').toFile('./images/demo-gradient/hs-image-1-compressed.jpg')
.then(() => {
    console.log('Image compressed successfully!');
  })
  .catch(err => {
    console.error('Error compressing image:', err);
  });
  console.log('Compression function called.');

tinify.fromFile('./images/demo-gradient/decoration-2.png').toFile('./images/demo-gradient/decoration-2-compressed.png');
tinify.fromFile('./images/demo-gradient/section-image-1.jpg').toFile('./images/demo-gradient/section-image-1-compressed.jpg');
tinify.fromFile('./images/demo-gradient/section-image-2.jpg').toFile('./images/demo-gradient/section-image-2-compressed.jpg');
tinify.fromFile('./images/demo-gradient/section-image-3.jpg').toFile('./images/demo-gradient/section-image-3-compressed.jpg');
tinify.fromFile('./images/demo-gradient/section-image-4.jpg').toFile('./images/demo-gradient/section-image-4-compressed.jpg');
tinify.fromFile('./images/demo-gradient/services/service-1.png').toFile('./images/demo-gradient/services/service-1-compressed.png');
tinify.fromFile('./images/demo-gradient/services/service-2.png').toFile('./images/demo-gradient/services/service-2-compressed.png');
tinify.fromFile('./images/demo-gradient/services/service-3.png').toFile('./images/demo-gradient/services/service-3-compressed.png');
tinify.fromFile('./images/demo-gradient/services/service-4.png').toFile('./images/demo-gradient/services/service-4-compressed.png');
tinify.fromFile('./images/demo-gradient/section-image-6.jpg').toFile('./images/demo-gradient/section-image-6-compressed.jpg');
tinify.fromFile('./images/demo-gradient/section-image-7.jpg').toFile('./images/demo-gradient/section-image-7-compressed.jpg');
tinify.fromFile('./images/demo-gradient/section-image-5.png').toFile('./images/demo-gradient/section-image-5-compressed.png');
tinify.fromFile('./images/demo-gradient/portfolio/project-6.jpg').toFile('./images/demo-gradient/portfolio/project-6-compressed.jpg');
tinify.fromFile('./images/demo-gradient/portfolio/project-1.jpg').toFile('./images/demo-gradient/portfolio/project-1-compressed.jpg');
tinify.fromFile('./images/demo-gradient/portfolio/project-4.jpg').toFile('./images/demo-gradient/portfolio/project-4-compressed.jpg');
tinify.fromFile('./images/demo-gradient/portfolio/project-2.jpg').toFile('./images/demo-gradient/portfolio/project-2-compressed.jpg');
tinify.fromFile('./images/demo-gradient/portfolio/project-3.jpg').toFile('./images/demo-gradient/portfolio/project-3-compressed.jpg');
tinify.fromFile('./images/demo-gradient/portfolio/project-5.jpg').toFile('./images/demo-gradient/portfolio/project-5-compressed.jpg');



