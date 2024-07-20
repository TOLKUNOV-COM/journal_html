// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import header from "./header.js";
import splashVideo from "./splash/splash-video.js";
import splashCounter from "./splash/splash-counter.js";
import splashNews from "./splash/splash-news.js";
import materials from "./materials.js";
import stories from "./stories.js";
import mainTags from "./main-tags.js";
import randomFacts from "./random-facts.js";
import platformLogos from "./platform-logos.js";
import portfolioSlider from "./portfolio-slider.js";

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
splashVideo();
splashCounter();
splashNews();
materials();
stories();
mainTags();
randomFacts();
platformLogos();
portfolioSlider();
