import Swiper from 'swiper/bundle';

export default function () {
    const selector = '.filter';

    if (!document.querySelector(selector)) {
        return;
    }

    const mainTagsSlider = new Swiper(selector, {
        slidesPerView: 'auto',
        freeMode: true,
        // centeredSlides: true,
        // centeredSlidesBounds: true,
        // centerInsufficientSlides: true,
    });

    // let centerSlideIndex = Math.ceil((mainTagsSlider.slides.length - 1) / 2);
    // mainTagsSlider.slideTo(centerSlideIndex);
}
