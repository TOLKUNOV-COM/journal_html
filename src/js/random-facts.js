import Swiper from 'swiper/bundle';

export default function () {
    const randomFactsSlider = new Swiper('.random-facts__list', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        loop: false,
        grabCursor: false,
    });

    $('.random-fact__button').on('click', () => {
        if (randomFactsSlider.slideNext() === false) {
            randomFactsSlider.slideTo(0);
        }
    });
}
