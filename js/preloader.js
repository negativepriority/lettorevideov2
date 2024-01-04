document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.getElementById('preloader');
  const preloaderImage = preloader.querySelector('img');
  const body = document.body;

  // Funzione per salvare lo stato della GIF nel localStorage
  function saveGifState() {
      localStorage.setItem('preloaderGifState', preloaderImage.src);
  }

  // Funzione per ripristinare lo stato della GIF dal localStorage
  function restoreGifState() {
      const savedState = localStorage.getItem('preloaderGifState');
      if (savedState) {
          preloaderImage.src = savedState;
      }
  }

  // Funzione per reimpostare la GIF al primo frame
  function resetGif() {
      preloaderImage.src = preloaderImage.src;
  }

  // Funzione per gestire il caricamento della pagina e la rimozione del preloader
  function handlePageLoad() {
      setTimeout(function () {
          body.classList.remove('loading');
          preloader.style.opacity = '0'; // Riduci l'opacità del preloader
          setTimeout(function () {
              preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
          }, 500); // 500 millisecondi = 0.5 secondi
      }, 2050); // 2100 millisecondi = 2.3 secondi

      // Salva lo stato della GIF quando la pagina sta per essere scaricata
      saveGifState();
  }

  // Attendi il caricamento completo della pagina prima di rimuovere la classe 'loading'
  window.addEventListener('load', function () {
      // Ripristina lo stato della GIF dal localStorage
      restoreGifState();

      // Gestisci il caricamento della pagina e la rimozione del preloader
      handlePageLoad();
  });

  // Gestisci l'evento unload per salvare lo stato della GIF prima che la pagina venga scaricata
  window.addEventListener('unload', saveGifState);

  // Resetta la GIF al primo frame quando il preloader viene nascosto
  preloader.addEventListener('transitionend', resetGif);

  // Aggiungi un nuovo elemento di stato per indicare il ricaricamento della pagina
  history.replaceState({ pageReloaded: true }, '');

  // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
  window.addEventListener('pageshow', function (event) {
      // Verifica se l'evento pageshow è dovuto al back/forward del browser
      if (event.persisted) {
          // Ripristina lo stato della GIF dal localStorage
          restoreGifState();
      }
  });
});