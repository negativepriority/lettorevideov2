document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const preloaderImage = document.getElementById('preloader-img');
    const body = document.body;
  
    // Funzione per reimpostare la GIF al primo frame
    function resetGif() {
        const gifSrc = preloaderImage.src;
        preloaderImage.src = '';
        preloaderImage.src = gifSrc + '?' + new Date().getTime(); // Aggiungi un timestamp per evitare la cache
    }
  
    // Funzione per gestire il caricamento della pagina e la rimozione del preloader
    function handlePageLoad() {
        setTimeout(function () {
            body.classList.remove('loading');
            preloader.style.opacity = '0'; // Riduci l'opacità del preloader
            setTimeout(function () {
                preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
            }, 500); // 500 millisecondi = 0.5 secondi
        }, 2050); // 2050 millisecondi = 2.05 secondi
    }
  
    // Attendi il caricamento completo della pagina prima di rimuovere la classe 'loading'
    window.addEventListener('load', handlePageLoad);
  
    // Gestisci l'evento popstate quando si torna indietro nella cronologia del browser
    window.addEventListener('popstate', function (event) {
        // Verifica se l'evento popstate è dovuto al back/forward del browser
        if (event.state && event.state.pageReloaded) {
            // Resetta la GIF al primo frame quando la pagina viene ripresa dalla cache
            resetGif();
        }
    });
  
    // Resetta la GIF al primo frame quando il preloader viene nascosto
    preloader.addEventListener('transitionend', resetGif);
  
    // Aggiungi un nuovo elemento di stato per indicare il ricaricamento della pagina
    history.replaceState({ pageReloaded: true }, '');
  
    // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
    window.addEventListener('pageshow', function (event) {
        // Verifica se l'evento pageshow è dovuto al back/forward del browser
        if (event.persisted) {
            // Resetta la GIF al primo frame quando la pagina viene ripresa dalla cache
            resetGif();
        }
    });
  
    // Resetta la GIF al primo frame quando il DOM è pronto
    resetGif();
  });