import Swiper from 'swiper/bundle';
import {gsap} from "gsap";

export default function () {
    //set video duration
    const videos = document.querySelectorAll('.splash-slider__slide video');
    videos.forEach(video => {
        $(video).parent('.splash-slider__slide').attr('data-swiper-autoplay', video.duration * 1000);
    });

    const slider = new Swiper(".splash-slider__slider", {
        speed: 1,
        watchSlidesProgress: true,
        loop: true,
        autoplay: {
            delay: 15000,
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
            renderBullet: function (index, className) {
                return '<div class="' + className + '"> <div class="swiper-pagination-progress"></div> </div>';
            }
        },
        on: {
            autoplayTimeLeft(swiper, time, progress) {
                let currentSlide = document.querySelectorAll('.splash-slider .swiper-slide')[swiper.activeIndex]
                let currentBullet = document.querySelectorAll('.splash-slider .swiper-pagination-progress')[swiper.realIndex]
                let fullTime = currentSlide.dataset.swiperAutoplay ? parseInt(currentSlide.dataset.swiperAutoplay) : swiper.params.autoplay.delay;

                let percentage = Math.min( Math.max ( parseFloat(((fullTime - time) * 100 / fullTime).toFixed(1)), 0), 100) + '%';

                gsap.set(currentBullet, {width: percentage});
            },
            transitionEnd(swiper) {
                let allBullets = $('.splash-slider .swiper-pagination-progress');
                let bulletsBefore = allBullets.slice(0, swiper.realIndex);
                let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
                if(bulletsBefore.length) {gsap.set(bulletsBefore, {width: '100%'})}
                if(bulletsAfter.length) {gsap.set(bulletsAfter, {width: '0%'})}

                let activeSlide = document.querySelectorAll('.splash-slider .swiper-slide')[swiper.realIndex];
                if (activeSlide.querySelector('video')) {
                    activeSlide.querySelector('video').currentTime = 0;
                }
            },
        }
    });
}
