// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')

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

// element argument can be a selector string
//   for an individual element
var msnry = new Packery('.news-list', {
    itemSelector: '.news-item',
    // columnWidth: '.news-item__width',
    // gutter: '.news-item__gutter',
    // fitWidth: true,
    // percentPosition: true
});

// var msnry = new Packery( '.test', {
//     itemSelector: '.test-block',
//     // columnWidth: '.test-block__width',
//     gutter: '.test-block__gutter',
//     fitWidth: false,
//     horizontal: true,
//     stagger: 0,
//     // no transitions
//     transitionDuration: 0,
// });

// element argument can be a selector string
//   for an individual element
var pckry = new Packery('.grid', {
    itemSelector: '.grid-item',
    // options
});
