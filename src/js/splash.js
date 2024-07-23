import splashVideo from "./splash/splash-video.js";
import splashCounter from "./splash/splash-counter.js";
import splashNews from "./splash/splash-news.js";
import splashSlider from "./splash/splash-slider.js";
import stories from "./stories.js";
import mainTags from "./main-tags.js";
import randomFacts from "./random-facts.js";
import platformLogos from "./platform-logos.js";


splashVideo();
splashCounter();
splashNews();
splashSlider();
stories();
mainTags();
randomFacts();
platformLogos();

let $splash = $("#splash");

const calcSplashZoom = function () {
    if ($(window).innerWidth() > 1160) {
        $splash.css('zoom', ($(window).innerWidth()) / 1160);
    } else {
        $splash.css('zoom', 1);
    }
}

$(window).on("resize", calcSplashZoom);

calcSplashZoom();
