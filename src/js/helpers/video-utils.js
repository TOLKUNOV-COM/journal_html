export function startAutoPlay(slider) {
    slider.autoplay.start();

    let activeSlide = slider.slides[slider.activeIndex];

    if (activeSlide.querySelector('video')) {
        activeSlide.querySelector('video').currentTime = 0;
        activeSlide.querySelector('video').play();
    }
}

export function stopAutoPlay(slider) {
    slider.autoplay.stop();

    let activeSlide = slider.slides[slider.activeIndex];

    if (activeSlide.querySelector('video')) {
        activeSlide.querySelector('video').pause();
        activeSlide.querySelector('video').currentTime = 0;
    }
}

export function pauseAutoPlay(slider) {
    slider.autoplay.pause();

    let activeSlide = slider.slides[slider.activeIndex];

    if (activeSlide.querySelector('video')) {
        activeSlide.querySelector('video').pause();
    }
}

export function resumeAutoPlay(slider) {
    slider.autoplay.resume();

    let activeSlide = slider.slides[slider.activeIndex];

    if (activeSlide.querySelector('video')) {
        activeSlide.querySelector('video').play();
    }
}
