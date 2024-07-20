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

            text.setAttribute('font-size', fontSize);
        }
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize); // Подгонка при изменении размера окна
}
