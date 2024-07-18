import Swiper from 'swiper/bundle';

export default function () {
    const selector = '.portfolio-slider__list';

    const swiper = new Swiper(selector, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: false,
        loop: false, // Зацикливание слайдов
        speed: 30000, // Скорость перехода (30 секунд)
        autoplay: {
            delay: 0, // Задержка между автопрокрутками (0 секунд)
            disableOnInteraction: true, // Не останавливать автопрокрутку при взаимодействии
        },
        on: {
            'reachEnd': function (swiper) {
                swiper.autoplay.stop();

                setTimeout(() => {
                    swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
                    swiper.autoplay.start();
                }, swiper.params.speed);
            },
            'reachBeginning': function (swiper) {
                swiper.autoplay.stop();

                setTimeout(() => {
                    swiper.params.autoplay.reverseDirection = !swiper.params.autoplay.reverseDirection;
                    swiper.autoplay.start();
                }, swiper.params.speed);
            },
        },
    });

    window.portfolioSlider = swiper;
}
