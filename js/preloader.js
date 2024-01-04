document.addEventListener('DOMContentLoaded', function () {
  const preloader = document.getElementById('preloader');
  const preloaderImage = preloader.querySelector('img');
  const body = document.body;

  // Funzione per reimpostare la GIF al primo frame
  function resetGif() {
      preloaderImage.src = preloaderImage.src;
  }

  // Attendi il caricamento completo del sito prima di rimuovere la classe 'loading'
  window.addEventListener('pageshow', function (event) {
      // Verifica se l'evento pageshow è dovuto al back/forward del browser
      if (event.persisted) {
          // Resetta la GIF al primo frame ogni volta che il preloader viene visualizzato
          resetGif();
      }

      setTimeout(function () {
          body.classList.remove('loading');
          preloader.style.opacity = '0'; // Riduci l'opacità del preloader
          setTimeout(function () {
              preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
          }, 500); // 500 millisecondi = 0.5 secondi
      }, 2050); // 2100 millisecondi = 2.3 secondi
  });

  // Resetta la GIF al primo frame quando il preloader viene nascosto
  preloader.addEventListener('transitionend', resetGif);
});