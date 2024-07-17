// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import materials from "./materials.js";
import stories from "./stories.js";
import mainTags from "./main-tags.js";
import randomFacts from "./random-facts.js";
import platformLogos from "./platform-logos.js";

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

materials();
stories();
mainTags();
randomFacts();
platformLogos($('.platform-logos'));
