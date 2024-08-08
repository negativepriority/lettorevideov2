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
            preloader.style.opacity = '0'; // Riduci l'opacità del preloader
            setTimeout(function () {
                preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
            }, 500); // 500 millisecondi = 0.5 secondi
        }, 2000); // Ridotto a 2 secondi per evitare ritardi nel nascondere il preloader
    }

    // Attendi il caricamento completo della pagina prima di rimuovere la classe 'loading'
    window.addEventListener('load', hidePreloader);

    // Gestisci l'evento popstate quando si torna indietro nella cronologia del browser
    window.addEventListener('popstate', function () {
        preloaderImage.src = preloaderImage.src.split("?")[0] + '?' + new Date().getTime();
        showPreloader();
        hidePreloader();
    });

    // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
    window.addEventListener('pageshow', function (event) {
        if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
            preloaderImage.src = preloaderImage.src.split("?")[0] + '?' + new Date().getTime();
            showPreloader();
            hidePreloader();
        }
    });

    // Mostra il preloader all'avvio
    showPreloader();
});