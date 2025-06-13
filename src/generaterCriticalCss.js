import { generate } from 'critical';
import path from 'path';

// Function to generate critical CSS after Webpack build
async function generateCriticalCSS() {
  await generate({
    base: path.resolve(process.cwd(), 'dist/'),
    src: 'index.html',
    inline: true,
    extract: true,
    width: 1300,
    height: 1500,
  });
  console.log('Critical CSS generated successfully!');
}

generateCriticalCSS();
