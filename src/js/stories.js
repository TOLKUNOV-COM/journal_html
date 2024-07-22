import Swiper from 'swiper/bundle';
import {gsap} from "gsap";
import videoDuration from "./helpers/video-duration.js";

export default function stories() {
    const asd = new Swiper('.stories-list', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        // freeMode: true,
    });

    let sliderOpened = false;

    const openStories = function () {
        let container = document.querySelector('.stories-slider');

        sliderOpened = true;

        $(container).addClass('stories-slider-in');
        $('body').addClass('overflow-hidden');

        let slider = sliders[mainSlider.activeIndex];

        startAutoPlay(slider);
    }

    const closeStories = function () {
        if (!sliderOpened) {
            return false;
        }

        sliderOpened = false;

        let container = document.querySelector('.stories-slider');

        $(container).addClass('stories-slider-out');
        $('body').removeClass('overflow-hidden');

        for (let slider of sliders) {
            stopAutoPlay(slider);
        }

        setTimeout(() => {
            $(container).removeClass('stories-slider-out');
            $(container).removeClass('stories-slider-in');
        }, 300);
    }

    const startAutoPlay = function (slider) {
        slider.autoplay.start();

        let activeSlide = slider.slides[slider.activeIndex];

        if (activeSlide.querySelector('video')) {
            activeSlide.querySelector('video').currentTime = 0;
            activeSlide.querySelector('video').play();
        }
    }

    const stopAutoPlay = function (slider) {
        slider.autoplay.stop();

        let activeSlide = slider.slides[slider.activeIndex];

        if (activeSlide.querySelector('video')) {
            activeSlide.querySelector('video').pause();
            activeSlide.querySelector('video').currentTime = 0;
        }
    }

    const pauseAutoPlay = function (slider) {
        slider.autoplay.pause();

        let activeSlide = slider.slides[slider.activeIndex];

        if (activeSlide.querySelector('video')) {
            activeSlide.querySelector('video').pause();
        }
    }

    const resumeAutoPlay = function (slider) {
        slider.autoplay.resume();

        let activeSlide = slider.slides[slider.activeIndex];

        if (activeSlide.querySelector('video')) {
            activeSlide.querySelector('video').play();
        }
    }

    $('.story-item').on('click', () => openStories());
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

                    console.group('Inner slider change');
                    console.log('Active index: ' + swiper.activeIndex);
                    console.log('Prev index: ' + swiper.previousIndex);
                    console.log('Real index: ' + swiper.realIndex);
                    console.log('Prev real index: ' + swiper.previousRealIndex);

                    console.log('Current slide: ', activeSlide);

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
