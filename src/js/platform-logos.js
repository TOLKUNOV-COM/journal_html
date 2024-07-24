export default () => {

    function placeCircles(circles, width, height) {
        if (circles.length === 0) return [];

        let placedCircles = [];
        let placedCount = 0;

        function isPositionValid(x, y, r) {
            if (x + r > width / 2 || x - r < -(width / 2)) {
                return false;
            }

            if (y + r > height / 2 || y - r < -(height / 2)) {
                return false;
            }

            for (const circle of placedCircles) {
                const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
                if (distance < r + circle.size) {
                    return false;
                }
            }
            return true;
        }

        function calculateCoordinates(angle, distance) {
            // Преобразуем угол из градусов в радианы
            const angleInRadians = angle * (Math.PI / 180);

            // Вычисляем координаты x и y
            const x = Math.sin(angleInRadians) * distance;
            const y = Math.cos(angleInRadians) * distance;

            // Округляем значения до двух знаков после запятой
            return {
                x: Math.round(x),
                y: Math.round(y),
            };
        }

        while (placedCount < circles.length) {
            let currentCircle = circles[placedCount];
            let placed = false;
            let possible = [];
            let iteration = 0;

            while (possible.length < 5 && iteration < 80) {
                iteration++;

                let angle = Math.floor(Math.random() * 361);
                let distance = 0;

                while (distance < Math.max(width / 2, height / 2)) {
                    distance++;

                    let { x, y } = calculateCoordinates(angle, distance);

                    if (isPositionValid(x, y, currentCircle.size, placedCircles)) {
                        possible.push({ x: x, y: y, distance: distance });

                        break;
                    }
                }
            }

            if (possible.length > 0) {
                // Find less distance
                const objectWithMinDistance = possible.reduce((min, obj) =>
                    obj.distance < min.distance ? obj : min
                );

                let x = objectWithMinDistance.x;
                let y = objectWithMinDistance.y;

                placedCircles.push({ ...currentCircle, x: x, y: y });
                placed = true;
            }

            placedCount++;
        }

        return placedCircles;
    }

    const blockSelector = '.platform-logos';
    const itemSelector = '.platform-logos__item';

    // Пример использования
    const circles = [];

    $(blockSelector).find(itemSelector).each(function () {
        const size = parseInt($(this).data('size'));
        const id = $(this).data('id');

        circles.push({ size: size, id: id, el: this });
    });

    // const circles = [
    //     // { size: 9, name: "Circle 11" },
    //     { size: 1, name: "SMALL" },
    //     { size: 1, name: "SMALL" },
    //     { size: 11, name: "BIGGER" },
    //     // { size: 16, name: "BIGGEST" },
    // ];

    const generatePositions = function () {
        const containerWidth = 2000;
        const containerHeight = 680;
        const gap = 4;
        const cellSize = 15;

        for (let circle of circles) {
            circle.size += 10 + gap;
        }

        const coefficient = cellSize / 2;

        const width = Math.ceil(containerWidth / cellSize * 2); //150 * 2; // 1500 / 15  // Ширина области размещения
        const height = Math.ceil(containerHeight / cellSize * 2); // 5 * 2; // 650px / 15 // Высота области размещения

        const placedCircles = placeCircles(circles, width, height);
        console.log(placedCircles);

        const container = document.querySelector('.platform-logos__list');

        placedCircles.forEach(({ x, y, size, id, el }) => {
            $(el).css({
                'top': ((height / 2) + y) * coefficient,
                'left': ((width / 2) + x) * coefficient,
                'width': ((size - gap - 1) * coefficient) * 2,
                'height': ((size - gap - 1) * coefficient) * 2,
            }).attr({
                x: x,
                y: y,
                size: size,
            });
        });
    }

    generatePositions();
    // window.addEventListener('resize', generatePositions); // Подгонка при изменении размера окна

    let container = document.querySelector('.platform-logos__container');
    let list = document.querySelector('.platform-logos__list');

    // let items = document.querySelectorAll('.platform-logos__item');

    const parallax = function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;

        let containerWidth = $(container).width();
        let listWidth = $(list).width();

        let containerHeight = $(container).height();
        let listHeight = $(list).height();

        // items.forEach((item) => {
        //     let itemOffsetX = $(item).attr('x');
        //     let itemOffsetY = $(item).attr('y');
        // });

        let a = ((containerWidth - listWidth) * x);
        let b = ((containerHeight - listHeight) * y);

        list.style.transform = 'translate(' + a + 'px, ' + b + 'px)';
    }

    window.addEventListener('mousemove', e => parallax(e));
}
