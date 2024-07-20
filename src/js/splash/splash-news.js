export default function () {
    const list = document.querySelector('.splash-news__list');

    setInterval(function () {
        let el = $(list).find('.splash-news__item:last');

        el.prependTo(list);
        el.addClass('splash-news__item_in');

        setTimeout(() => {
            el.removeClass('splash-news__item_in');
        }, 1000);
    }, 10000);
}
