document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const preloaderImage = document.getElementById('preloader-img');
    const body = document.body;

    // Funzione per reimpostare la GIF al primo frame
    function resetGif() {
        const gifSrc = preloaderImage.src;
        preloaderImage.src = '';  // Rimuove temporaneamente la src
        preloaderImage.src = gifSrc + '?' + new Date().getTime(); // Riaggiunge la src con un timestamp per evitare la cache
    }

    // Funzione per mostrare il preloader
    function showPreloader() {
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        resetGif(); // Resetta la GIF solo quando il preloader viene mostrato
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
        }, 2050); // 2050 millisecondi = 2.05 secondi
    }

    // Attendi il caricamento completo della pagina prima di rimuovere la classe 'loading'
    window.addEventListener('load', hidePreloader);

    // Gestisci l'evento popstate quando si torna indietro nella cronologia del browser
    window.addEventListener('popstate', function (event) {
        showPreloader();
    });

    // Aggiungi un nuovo elemento di stato per indicare il ricaricamento della pagina
    history.replaceState({ pageReloaded: true }, '');

    // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
    window.addEventListener('pageshow', function (event) {
        // Verifica se l'evento pageshow è dovuto al back/forward del browser o da cache
        if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
            showPreloader();
            hidePreloader();
        }
    });

    // Resetta la GIF al primo frame quando il DOM è pronto
    resetGif();
});