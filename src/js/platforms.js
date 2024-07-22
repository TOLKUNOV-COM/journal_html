import Packery from 'packery/js/packery';

export default function () {
    let lists = document.querySelectorAll('.platforms');

    for (let list of lists) {
        let msnry = new Packery(list, {
            itemSelector: '.platforms__item',
            gutter: 0,
            // fitWidth: false,
            // stagger: 0,
            transitionDuration: 0,

            // columnWidth: '.materials-item__width',
            // gutter: '.materials-item__gutter',
            // fitWidth: true,
            // percentPosition: true
        });
    }
}
