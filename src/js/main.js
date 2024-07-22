// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import header from "./header.js";
import materials from "./materials.js";
import portfolioSlider from "./portfolio-slider.js";
import toc from "./toc.js";
import filter from "./filter.js";
import platforms from "./platforms.js";

// import '../css/main.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
// import './templates/index.pug';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))

header();
materials();
portfolioSlider();
toc();
filter();
platforms();
