export default () => {
    const buttonSelector = '#header_menu_toggle';
    const menuSelector = '.header__menu';
    const menuActiveClass = 'header__menu_active';
    const menuAnimateClass = 'header__menu_animate';

    let $button = $(buttonSelector);
    let $menu = $(menuSelector);

    let isOpen = false;

    $($button).on('click', () => {
        isOpen = !isOpen;

        $button.toggleClass('tham-active');

        if (isOpen) {
            $menu.addClass(menuAnimateClass);
            $menu.addClass(menuActiveClass);
            $('body').addClass('overflow-hidden');
        } else {
            $menu.removeClass(menuActiveClass);
            $('body').removeClass('overflow-hidden');

            setTimeout(() => {
                $menu.removeClass(menuAnimateClass);
            }, 200);
        }
    });
}
