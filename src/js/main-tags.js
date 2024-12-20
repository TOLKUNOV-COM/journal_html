import Swiper from 'swiper/bundle';

/**
 * Main tags
 */
export default function mainTags() {
    const sliderSpeed = 1000;

    const swiper = new Swiper(".main-tags__list", {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        freeModeMomentum: true,
        // preventInteractionOnTransition: true,

        loop: false, // Зацикливание слайдов
        speed: sliderSpeed, // Скорость перехода (30 секунд)
    });

    // Функция для прокрутки слайдера на 1 пиксель
    function scrollByPixel(direction, value) {
        // Текущее смещение прокрутки
        var currentTranslate = swiper.translate;

        // Вычисление нового значения смещения прокрутки
        var newTranslate = direction === 'right' ? currentTranslate - value : currentTranslate + value;

        // Получение максимального и минимального смещения прокрутки
        var maxTranslate = swiper.maxTranslate();
        var minTranslate = swiper.minTranslate();

        var isOutside = false;

        // Проверка, чтобы новое значение не выходило за границы
        if (newTranslate < maxTranslate) {
            newTranslate = maxTranslate;
            isOutside = true;
        }
        if (newTranslate > minTranslate) {
            newTranslate = minTranslate;
            isOutside = true;
        }

        // Прокрутка к новому значению
        swiper.setTranslate(newTranslate);

        // Обновление состояния слайдера
        swiper.updateProgress();

        return !isOutside;
    }

    window.mainTagsSlider = swiper;

    let isPlaying = true
    let isReversed = false;

    const handleTick = () => {
        if (isPlaying) {

            if (!isMouseEnter) {
                $('.main-tags__list .swiper-wrapper').css('transition-duration', '100ms');
            }

            if (isReversed === false) {
                if (scrollByPixel('right', 2) === false) {
                    isReversed = true;
                }
            } else {
                if (scrollByPixel('left', 2) === false) {
                    isReversed = false;
                }
            }
        }
    };

    setTimeout(() => {
        setInterval(handleTick, 100);
        handleTick();
    }, 100);

    let isMouseEnter = false;

    $('.main-tags')
        .on('mouseenter', function () {
            isPlaying = false;
            isMouseEnter = true;

            $('.main-tags__list .swiper-wrapper').css('transition-duration', '0ms');
        })
        .on('mouseleave', function () {
            isMouseEnter = false;

            setTimeout(() => {
                if (!isPlaying && !isMouseEnter) {
                    isPlaying = true;
                }
            }, 100);
        });

    // Функция для фиксации ширины блока .main-tags
    function fixMainTagsWidth() {
        const mainTags = document.querySelector('.main-tags');
        if (mainTags) {
            const width = document.documentElement.clientWidth - 2; // Получаем текущую ширину блока
            mainTags.style.width = `${width}px`; // Фиксируем ширину в пикселях
        }
    }

    fixMainTagsWidth();

    // Вызываем функцию при изменении размера окна
    window.addEventListener('resize', fixMainTagsWidth);
}
