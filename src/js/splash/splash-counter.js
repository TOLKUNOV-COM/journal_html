export default function () {
    function adjustFontSize() {
        const containers = document.querySelectorAll('.fit-text-container');

        for (let container of containers) {
            const text = container.querySelector('text');
            const radius = 95; // Радиус круга
            const textContent = text.textContent;
            const textLength = textContent.length;
            const circumference = 2 * Math.PI * radius; // Длина окружности

            let fontSize = (circumference / textLength) * 0.6; // Коэффициент для подгонки размера текста

            fontSize = Math.min(fontSize, 200);
            text.setAttribute('font-size', fontSize);
        }
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize); // Подгонка при изменении размера окна

    let items = $('.splash-counter__item');

    items.addClass('hidden');

    if (items.length > 0) {
        // Шаг 3: Выбрать случайный элемент
        var randomIndex = Math.floor(Math.random() * items.length);
        var randomElement = items.eq(randomIndex);

        // Шаг 4: Удалить класс у случайного элемента
        randomElement.removeClass('hidden');
    }

    $('.splash-counter__refresh').on('click', function () {
        let current = $('.splash-counter__item:not(.hidden)');
        let next = current.next('.splash-counter__item.hidden');

        if (!next.length) {
            next = $('.splash-counter__item:first');
        }

        current.addClass('hidden');
        next.removeClass('hidden');
    });
}
