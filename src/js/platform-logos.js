export default () => {
    let logos = window.platformLogos || [];

    let $list = $('.platform-logos__list');

    logos.forEach(logo => {
        let { size, url, backgroundColor, backgroundImage } = logo;

        let spot = $list.find('a[data-size="' + size + '"]:not([data-placed]):first');

        $(spot).css('background', backgroundColor + ' url("' + backgroundImage + '") no-repeat center');
        $(spot).attr('data-placed', true);
        $(spot).attr('href', url);
    });

    $list.find(':not([data-placed])').remove();

    let container = document.querySelector('.platform-logos__container');
    let list = document.querySelector('.platform-logos__list');

    const parallax = function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;

        let containerWidth = $(container).width();
        let listWidth = $(list).width();

        let containerHeight = $(container).height();
        let listHeight = $(list).height();

        let a = ((containerWidth - listWidth) * x);
        let b = ((containerHeight - listHeight) * y);

        list.style.transform = 'translate(calc(-50% + ' + (x - 0.5) * -200 + 'px), ' + b * -1 + 'px)';
    }

    window.addEventListener('mousemove', e => parallax(e));
}
