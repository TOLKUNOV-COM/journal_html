import Swiper from 'swiper/bundle';
import {gsap} from "gsap";
import videoDuration from "./helpers/video-duration.js";
import {startAutoPlay, stopAutoPlay, pauseAutoPlay, resumeAutoPlay} from "./helpers/video-utils.js";

/**
 * Stories viewed methods
 */
const viewedStoriesStorageKey = "viewedStories";

const getViewedStories = () => {
    const localStorage = window.localStorage || {};

    const data = localStorage.getItem(viewedStoriesStorageKey);

    if (data) {
        return JSON.parse(data);
    }

    return null;
}

const setViewedStories = (data) => {
    try {
        localStorage.setItem(viewedStoriesStorageKey, JSON.stringify(data));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('Local storage is full.');
        } else {
            console.error('An error occurred while accessing local storage.', e);
        }
    }
}

const addViewedStorySlide = function (storyId, slideId) {
    const viewedStories = getViewedStories() || [];

    let value = storyId + '_' + slideId;

    if (!viewedStories.includes(value)) {
        viewedStories.push(value);
    }

    setViewedStories(viewedStories);
}

const markSlideAsViewed = function (slide) {
    let storyId = $(slide).data('story-id');
    let slideId = $(slide).data('slide-id');

    if (storyId && slideId) {
        addViewedStorySlide(storyId, slideId);

        updateStoriesListViewed();
    }
}

/**
 * Collect stories and their slides IDs
 */
let storiesSlides = {};

$('.stories__slide').each(function () {
    let storyId = $(this).data('story-id');

    $(this).find('.story__slide').each(function () {
        let slideId = $(this).data('slide-id');

        if (!storiesSlides[storyId]) {
            storiesSlides[storyId] = [];
        }

        storiesSlides[storyId].push(slideId);
    });
});

const updateStoriesListViewed = function () {
    let viewedStories = getViewedStories() || [];

    $('.stories-list .story-item:not(.story-item_viewed)').each(function () {
        let storyId = $(this).data('story-id');

        let storySlideIds = storiesSlides[storyId] || [];

        for (let slideId of storySlideIds) {
            let value = storyId + '_' + slideId;

            console.log(viewedStories);
            console.log(value);

            if (!viewedStories.includes(value)) {
                return;
            }
        }

        $(this).addClass('story-item_viewed');
    });
}

window.markSlideAsViewed = markSlideAsViewed;
window.getViewedStories = getViewedStories;

updateStoriesListViewed();

/**
 * End Story views methods
 */

export default function stories() {
    const asd = new Swiper('.stories-list', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        // freeMode: true,
    });

    let sliderOpened = false;

    const openStories = function (storyId) {
        let container = document.querySelector('.stories-slider');

        // Change mainSlider index
        let targetIndex = $('.stories__slide[data-story-id="' + storyId + '"]').index();
        mainSlider.slideTo(targetIndex);

        sliderOpened = true;

        $('body').addClass('overflow-hidden');
        $(container).addClass('stories-slider-in');

        let slider = sliders[targetIndex];

        startAutoPlay(slider);

        let activeSlide = slider.slides[slider.activeIndex];

        markSlideAsViewed(activeSlide);
    }

    const closeStories = function () {
        if (!sliderOpened) {
            return false;
        }

        sliderOpened = false;

        let container = document.querySelector('.stories-slider');

        $(container).addClass('stories-slider-out');

        for (let slider of sliders) {
            stopAutoPlay(slider);
        }

        setTimeout(() => {
            $(container).removeClass('stories-slider-out');
            $(container).removeClass('stories-slider-in');
            $('body').removeClass('overflow-hidden');
        }, 300);
    }

    $('.story-item').on('click', (e) => openStories($(e.currentTarget).data('story-id')));

    $('.stories-slider__close').on('click', () => closeStories());
    $('.stories-slider__overlay').on('click', () => closeStories());

    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
                // Ваш код, который выполняется при нажатии на ESC
                closeStories();
            }
        });
    });

    const initStory = function (el) {
        videoDuration(el);

        const sliderEl = el.querySelector(".story__slider");

        $(sliderEl).find('.swiper-button-next').on('click', function () {
            if (slider.slideNext() === false) {
                if (mainSlider.slideNext() === false) {
                    closeStories();
                }
            }
        });

        $(sliderEl).find('.swiper-button-prev').on('click', function () {
            if (slider.slidePrev() === false) {
                if (mainSlider.slidePrev() === false) {
                    slider.autoplay.start();
                }
            }
        });

        const slider = new Swiper(sliderEl, {
            speed: 1,
            watchSlidesProgress: true,

            loop: false,
            // allowSlidePrev: true,
            // allowSlideNext: true,

            allowTouchMove: false,
            autoplay: {
                enabled: false,
                delay: 5000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            // navigation: {
            //     nextEl: ".story__next",
            //     prevEl: ".story__prev",
            // },
            pagination: {
                el: '.story__pagination',
                renderBullet: function (index, className) {
                    return '<div class="' + className + '"> <div class="swiper-pagination-progress"></div> </div>';
                }
            },
            on: {
                autoplayTimeLeft(swiper, time, progress) {
                    let currentSlide = el.querySelectorAll('.story__slider .swiper-slide')[swiper.activeIndex]
                    let currentBullet = el.querySelectorAll('.story__slider .swiper-pagination-progress')[swiper.realIndex]
                    let fullTime = currentSlide.dataset.swiperAutoplay ? parseInt(currentSlide.dataset.swiperAutoplay) : swiper.params.autoplay.delay;

                    let percentage = Math.min(Math.max(parseFloat(((fullTime - time) * 100 / fullTime).toFixed(1)), 0), 100) + '%';

                    if (time !== swiper.params.autoplay.delay) {
                        gsap.set(currentBullet, { width: percentage });
                    }
                },
                transitionEnd(swiper) {
                    let allBullets = $(el).find('.story__slider .swiper-pagination-progress');
                    let bulletsBefore = allBullets.slice(0, swiper.realIndex);
                    let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
                    if (bulletsBefore.length) {
                        gsap.set(bulletsBefore, { width: '100%' })
                    }
                    if (bulletsAfter.length) {
                        gsap.set(bulletsAfter, { width: '0%' })
                    }
                },
                slideChange(swiper) {
                    // Start video current slide
                    let activeIndex = swiper.activeIndex;
                    let realIndex = swiper.realIndex;
                    let previousIndex = swiper.previousIndex;

                    let activeSlide = swiper.slides[activeIndex];
                    let previousSlide = swiper.slides[previousIndex];

                    console.group('Inner slider change');
                    console.log('Active index: ' + swiper.activeIndex);
                    console.log('Prev index: ' + swiper.previousIndex);
                    console.log('Real index: ' + swiper.realIndex);
                    console.log('Prev real index: ' + swiper.previousRealIndex);

                    console.log('Current slide: ', activeSlide);

                    // Mark story slide as viewed
                    markSlideAsViewed(activeSlide);

                    // Play current video
                    if (activeSlide.querySelector('video')) {
                        activeSlide.querySelector('video').currentTime = 0;
                        activeSlide.querySelector('video').play();
                    }

                    console.groupEnd();

                    // Pause other videos
                    let slides = swiper.slides;

                    for (let index of slides.keys()) {
                        let slide = slides[index];

                        if (index !== activeIndex) {
                            if (slide.querySelector('video')) {
                                slide.querySelector('video').currentTime = 0;
                                slide.querySelector('video').pause();
                            }
                        }
                    }

                    if (activeIndex === 0 && previousIndex === swiper.slides.length - 1) {
                        if (mainSlider.slideNext() === false) {
                            closeStories();
                        }
                    }
                },
            }
        });

        return slider;
    }

    let stories = document.querySelectorAll('.story');

    let sliders = [];

    for (let story of stories) {
        sliders.push(initStory(story));
    }

    const mainSlider = new Swiper(".stories-slider__slider", {
        effect: "cube",
        grabCursor: true,
        // loop: true,
        cubeEffect: {
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        on: {
            transitionEnd: (swiper) => {
                /**
                 * Stop autoplay
                 */
                let activeIndex = swiper.activeIndex;
                let previousIndex = swiper.previousRealIndex;
                let realIndex = swiper.realIndex;

                console.group('Transition end (main)');
                console.log('Active index: ' + activeIndex);
                console.log('Prev index: ' + previousIndex);
                console.log('Real index: ' + realIndex);

                console.groupEnd();

                if (typeof previousIndex !== "undefined") {
                    let slider = sliders[previousIndex];

                    stopAutoPlay(slider);
                }
            },
            slideChange: (swiper) => {
                let activeIndex = swiper.realIndex;

                let slider = sliders[activeIndex];

                startAutoPlay(slider);

                let activeSlide = slider.slides[slider.activeIndex];

                markSlideAsViewed(activeSlide);
            },
            touchStart: function (swiper) {
                let activeIndex = swiper.realIndex;

                let slider = sliders[activeIndex];

                pauseAutoPlay(slider);
            },
            touchEnd: function (swiper) {
                let activeIndex = swiper.realIndex;

                let slider = sliders[activeIndex];

                resumeAutoPlay(slider);
            },
        }
    });

    window.sliders = sliders;
    window.stories = stories;
    window.mainSlider = mainSlider;
}
