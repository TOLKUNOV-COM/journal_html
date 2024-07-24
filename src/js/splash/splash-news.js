export default function () {
    const rotateInterval = 10000;
    const moveListDownDuration = 500;
    const animationDuration = 1000;

    let $list = $('.splash-news__list');

    setInterval(function () {
        let $el = $list.find('.splash-news__item:last');
        let height = $el.outerHeight();

        height -= 7;

        $list.css('transition-duration', moveListDownDuration + 'ms');
        $list.css('transform', `translateY(${height}px)`);

        setTimeout(() => {
            $list.css('transition-duration', '0ms');
            $list.css('transform', `translateY(0px)`);

            $list.prepend($el);
            $el.addClass('splash-news__item_in');

            setTimeout(() => {
                $el.removeClass('splash-news__item_in');
            }, animationDuration);
        }, moveListDownDuration);
    }, rotateInterval);
}
