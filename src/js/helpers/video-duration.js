export default function videoDuration(el) {
    const videos = el.querySelectorAll('video');

    const setDuration = function (video) {
        const duration = video.duration; // Получаем продолжительность видео в секундах

        $(video).parent('.swiper-slide').attr('data-swiper-autoplay', duration * 1000);
    }

    videos.forEach(video => {
        if (video.readyState >= 1) { // HAVE_METADATA
            setDuration(video);
        } else {
            // Если метаданные не загружены, ждем события loadedmetadata
            video.addEventListener('loadedmetadata', e => setDuration(e.target));
        }
    });
}
