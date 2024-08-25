document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const preloaderImage = document.getElementById('preloader-img');
    const body = document.body;

    function resetGif() {
        const gifSrc = preloaderImage.src;
        preloaderImage.src = '';
        preloaderImage.src = gifSrc + '?' + new Date().getTime();
    }

    function showPreloader() {
        if (!body.classList.contains('menu-interaction')) { // Mostra il preloader solo se non è in corso un'interazione con il menu
            preloader.style.display = 'flex';
            preloader.style.opacity = '1';
            resetGif();
            body.classList.add('loading');
        }
    }

    function hidePreloader() {
        setTimeout(function () {
            body.classList.remove('loading');
            preloader.style.opacity = '0';
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        }, 2050);
    }

    window.addEventListener('load', hidePreloader);

    window.addEventListener('popstate', function (event) {
        if (!event.state || !event.state.menuInteraction) {
            showPreloader();
        }
    });

    window.addEventListener('pageshow', function (event) {
        if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
            showPreloader();
            hidePreloader();
        }
    });

    history.replaceState({ pageReloaded: true }, '');

    resetGif();
});