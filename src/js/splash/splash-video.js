export default function () {
    const container = document.querySelector('.splash-video');
    const video = document.querySelector('.splash-video video');

    container.addEventListener('click', () => {
        let isActive = $(container).hasClass('splash-video_active');
        let isMuted = $(video).prop('muted');

        $(container).toggleClass('splash-video_active');
        $(video).prop('muted', !isMuted);

        if (!isActive) {
            video.currentTime = 0;
        }
    });
}
