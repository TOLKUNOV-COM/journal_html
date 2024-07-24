import Swiper from 'swiper/bundle';
import {gsap} from "gsap";
import videoDuration from "../helpers/video-duration.js";
import {startAutoPlay, stopAutoPlay, pauseAutoPlay, resumeAutoPlay} from "../helpers/video-utils.js";

export default function () {
    let el = document.querySelector('.splash-slider__slider');

    if (!el) {
        return;
    }

    videoDuration(el);

    const autoplayDuration = 8000;

    const slider = new Swiper(el, {
        speed: 1,
        // watchSlidesProgress: true,
        loop: true,
        autoplay: {
            delay: autoplayDuration,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        navigation: {
            nextEl: ".splash-slider__next",
            prevEl: ".splash-slider__prev",
        },
        crabCursor: true,
        pagination: {
            el: document.querySelector('.splash-slider__pagination'),
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '" data-index="' + index + '"> <div class="swiper-pagination-progress"></div> </div>';
            }
        },
        on: {
            autoplayTimeLeft(swiper, time, progress) {
                let currentSlide = document.querySelectorAll('.splash-slider .swiper-slide')[swiper.activeIndex]
                let currentBullet = document.querySelectorAll('.splash-slider .swiper-pagination-progress')[swiper.realIndex]
                let fullTime = currentSlide.dataset.swiperAutoplay ? parseInt(currentSlide.dataset.swiperAutoplay) : swiper.params.autoplay.delay;

                let percentage = Math.min(Math.max(parseFloat(((fullTime - time) * 100 / fullTime).toFixed(1)), 0), 100);
                let offset = parseFloat($(currentSlide).attr('data-swiper-autoplay-offset'));

                if (offset) {
                    percentage = offset + ((100 - offset) * percentage / 100);
                }

                if (time !== swiper.params.autoplay.delay) {
                    gsap.set(currentBullet, { width: percentage + '%' });
                }
            },
            transitionEnd(swiper) {
                let activeSlide = swiper.slides[swiper.activeIndex];
                if (activeSlide.querySelector('video')) {
                    activeSlide.querySelector('video').currentTime = 0;
                    // activeSlide.querySelector('video').play();
                }

                // let prevSlide = swiper.slides[swiper.previousIndex];
                // if (prevSlide.querySelector('video')) {
                //     prevSlide.querySelector('video').currentTime = 0;
                //     prevSlide.querySelector('video').pause();
                // }
            },
            slideChange(swiper) {
                let allBullets = $('.splash-slider .swiper-pagination-progress');
                let bulletsBefore = allBullets.slice(0, swiper.realIndex);
                let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
                if (bulletsBefore.length) {
                    gsap.set(bulletsBefore, { width: '0%' })
                }
                if (bulletsAfter.length) {
                    gsap.set(bulletsAfter, { width: '0%' })
                }

                // on slide change: 1) drop offset, 2) revert swiper autoplay value to original (from origin-duration or rm attr).
                let activeSlide = swiper.slides[swiper.previousIndex];

                $(activeSlide).removeAttr('data-swiper-autoplay-offset');
                $(activeSlide).removeAttr('data-swiper-autoplay');

                let originalDuration = $(activeSlide).attr('data-original-duration');

                if (originalDuration) {
                    $(activeSlide).attr('data-swiper-autoplay', originalDuration);
                }
            },
        }
    });

    // Function to calculate click percentage
    const getClickPercentage = function (event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left; // X coordinate within the element
        const width = rect.width;

        return (x / width) * 100;
    }

    $('.splash-slider .swiper-pagination-bullet').on('click', function (e) {
        // Check if this bullet is not active
        if (!$(this).hasClass('swiper-pagination-bullet-active')) {
            return;
        }

        let percentage = getClickPercentage(e);

        let currentSlide = document.querySelectorAll('.splash-slider .swiper-slide')[slider.activeIndex];
        let currentBullet = document.querySelectorAll('.splash-slider .swiper-pagination-progress')[slider.realIndex];

        let duration = $(currentSlide).data('original-duration');

        if (!duration) {
            duration = autoplayDuration;
        }

        let targetTimeStart = duration * percentage / 100;
        let targetTimeLeft = duration - targetTimeStart;

        slider.autoplay.stop();

        $(currentSlide).attr('data-swiper-autoplay', targetTimeLeft);
        $(currentSlide).attr('data-swiper-autoplay-offset', percentage);

        // need to set data-swiper-autoplay

        if (currentSlide.querySelector('video')) {
            currentSlide.querySelector('video').currentTime = targetTimeStart / 1000;
        }

        slider.autoplay.start();
    });

    window.splashSlider = slider;
}
