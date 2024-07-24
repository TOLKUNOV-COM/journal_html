export default function () {
    let container = document.querySelector('.splash-dict');
    let list = document.querySelector('.splash-dict__container');

    if (!list) {
        return;
    }

    // let items = document.querySelectorAll('.platform-logos__item');

    const parallax = function (e) {
        let x = (e.clientX - startX) / $(container).width();
        let y = (e.clientY - startY) / $(container).height();

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

        list.style.transform = 'translate(' + -x * 22 + 'px, ' + -y * 22 + 'px)';
    }

    let startX, startY;

    container.addEventListener('mouseenter', (e) => {
        $(list).css('transition-duration', '0ms');

        startX = e.clientX;
        startY = e.clientY;
    });

    container.addEventListener('mouseleave', (e) => {
        setTimeout(() => {
            $(list).css('transition', 'transform 200ms ease-in-out');
            $(list).css('transform', 'translate(0,0)');
        }, 100);
    });

    container.addEventListener('mousemove', e => parallax(e));
}
