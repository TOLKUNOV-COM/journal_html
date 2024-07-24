export default function () {
    let container = document.querySelector('.splash-dict');
    let list = document.querySelector('.splash-dict__container');

    if (!list) {
        return;
    }

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

        list.style.transform = 'translate(' + -x * 60 + 'px, ' + -y * 60 + 'px)';
    }

    window.addEventListener('mousemove', e => parallax(e));
}
