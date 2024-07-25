import Packery from 'packery/js/packery';

export default function materials() {
    const initList = function () {
        let materialLists = document.querySelectorAll('.materials-list');

        for (let list of materialLists) {
            let msnry = new Packery(list, {
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
    }

    initList();

    document.addEventListener('update-catalog', initList);
// window.dispatchEvent(new Event('resize'));
}
