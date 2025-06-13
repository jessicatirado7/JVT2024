// Import general styles for the whole app
import '../css/style-responsive.css';
import '../css/style.css';

import 'jquery'; // Automatically loads `jquery.min.js` (from node_modules or directly)
import 'bootstrap'; // Automatically loads `bootstrap.bundle.min.js` (from node_modules)

// Dynamically import additional CSS files only when needed
const loadExtraStyles = async () => {
  const conditionToLoadCarousel = document.querySelector('.carousel');
  const conditionToLoadMagnificPopup = document.querySelector('.popup');

  if (conditionToLoadCarousel) {
    await import(/* webpackChunkName: "owl-carousel" */ '../css/owl.carousel.css');
  }

  if (conditionToLoadMagnificPopup) {
    await import(/* webpackChunkName: "magnific-popup" */ '../css/magnific-popup.css');
  }

  // Load other styles dynamically if needed
  await import(/* webpackChunkName: "vertical-rhythm" */ '../css/vertical-rhythm.min.css');
};

// Use dynamic imports for JS plugins
const loadPlugins = async () => {
  if (document.querySelector('.carousel')) {
    await import(/* webpackChunkName: "owl-carousel" */ '../css/owl.carousel.css');
    const { default: OwlCarousel } = await import('owl.carousel');
    OwlCarousel.init();
  }

  if (document.querySelector('.popup')) {
    await import(/* webpackChunkName: "magnific-popup" */ '../css/magnific-popup.css');
    const { default: MagnificPopup } = await import('magnific-popup');
    MagnificPopup.open();
  }
};



const loadAdditionalScripts = async () => {
  await import(/* webpackChunkName: "all-js" */ './all.js');   // Loads all.js
  //await import(/* webpackChunkName: "compress-js" */ './compress.js'); // Loads compress.js
  //await import(/* webpackChunkName: "generatorCriticalCss" */ './generaterCriticalCss.js'); // Loads generatorCriticalCss.js
  await import(/* webpackChunkName: "jquery-ajaxchimp" */ './jquery.ajaxchimp.min.js'); // Loads jquery.ajaxchimp.min.js
};

// Call the functions based on your application logic
document.addEventListener('DOMContentLoaded', async () => {
  loadExtraStyles();    // Load dynamic CSS as needed
  loadPlugins();        // Load JS plugins as needed
  loadAdditionalScripts();  // Optionally load additional scripts
});
