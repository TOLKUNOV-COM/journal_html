export default function () {
    const copyContent = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');

            return true;
        } catch (err) {
            console.error('Failed to copy: ', err);

            return false;
        }
    }

    $('.share-button').on('click', async function (e) {
        e.preventDefault();

        let text = $(this).data('url');

        let result = await copyContent(text);

        if (result) {
            $(this).addClass('share-button_success');

            setTimeout(function () {
                $('.share-button').removeClass('share-button_success');
            }, 2000);
        }
    });
}
