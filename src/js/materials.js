import Packery from 'packery/js/packery';

export default function materials() {
    //   for an individual element
    let materialLists = document.querySelectorAll('.materials-list');

    for (let list of materialLists) {
        var msnry = new Packery(list, {
            itemSelector: '.materials-item',
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
// window.dispatchEvent(new Event('resize'));
}
