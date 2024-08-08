document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const preloaderImage = document.getElementById('preloader-img');
    const body = document.body;

    // Funzione per mostrare il preloader
    function showPreloader() {
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        body.classList.add('loading');
    }

    // Funzione per nascondere il preloader dopo il caricamento della pagina
    function hidePreloader() {
        setTimeout(function () {
            body.classList.remove('loading');
            preloader.style.opacity = '0';
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 500);
        }, 2050);
    }

    // Attendi il caricamento completo della pagina prima di rimuovere la classe 'loading'
    window.addEventListener('load', hidePreloader);

    // Gestisci l'evento popstate quando si torna indietro nella cronologia del browser
    window.addEventListener('popstate', function () {
        showPreloader();
        hidePreloader();
    });

    // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
    window.addEventListener('pageshow', function (event) {
        if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
            showPreloader();
            hidePreloader();
        }
    });
});
