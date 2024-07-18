import Swiper from 'swiper/bundle';

/**
 * Main tags
 */
export default function mainTags() {
    const mainTagsSlider = new Swiper(".main-tags__list", {
        slidesPerView: 'auto',
        // freeMode: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
    });

    let centerSlideIndex = Math.ceil((mainTagsSlider.slides.length - 1) / 2);
    mainTagsSlider.slideTo(centerSlideIndex);
}
