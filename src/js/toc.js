export default function () {
    const tocSelector = '.toc';
    const tocListSelector = '.toc__list';
    const articleSelector = '.article';
    const anchorSelector = 'h2';

    let article = document.querySelector(articleSelector);
    let tocList = document.querySelector(tocListSelector);
    let toc = document.querySelector(tocSelector);

    if (!article || !tocList) {
        return;
    }

    /**
     * Create TOC elements
     */
    let anchors = article.querySelectorAll(anchorSelector);

    let contents = '';

    anchors.forEach((el, index) => {
        if (!el.id) {
            el.id = `id-${index}`;
        }

        const url = `#${el.id}`;
        contents += `<li><a href="${url}" class="toc__link">${el.textContent}</a></li>`;
    });

    tocList.innerHTML = contents;

    if (anchors.length > 0) {
        $(toc).removeClass('hidden');
    }

    /**
     * Watch scroll elements
     */
    const updateAnchorsActive = function () {
        if (!anchors.length) {
            return;
        }

        let target = null;

        for (let i = anchors.length - 1; i >= 0; i--) {
            let anchor = anchors[i];
            let top = anchor.getBoundingClientRect().top;

            if (top <= 100) {
                target = anchor;
                break;
            }
        }

        if (!target) {
            target = anchors[0];
        }

        let headerId = target.id;

        document.querySelectorAll('.toc li.active').forEach(el => {
            el.classList.remove('active');
        });
        if (headerId) {
            document.querySelector(`a[href$="#${headerId}"]`).parentElement.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateAnchorsActive);
    updateAnchorsActive();
}
