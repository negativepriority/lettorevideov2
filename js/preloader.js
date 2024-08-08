 document.addEventListener('DOMContentLoaded', function () {
      const preloader = document.getElementById('preloader');
      const preloaderImage = document.getElementById('preloader-img');
      const body = document.body;
      let preloaderStarted = false; // Flag per controllare se l'animazione è già partita
    
      // Funzione per reimpostare la GIF al primo frame
      function resetGif() {
          const gifSrc = preloaderImage.src;
          preloaderImage.src = '';  // Rimuove temporaneamente la src
          preloaderImage.src = gifSrc + '?' + new Date().getTime(); // Riaggiunge la src con un timestamp per evitare la cache
      }
    
      // Funzione per mostrare il preloader
      function showPreloader() {
          if (!preloaderStarted) {
              preloaderStarted = true;  // Imposta il flag per indicare che il preloader è partito
              preloader.style.display = 'flex';
              preloader.style.opacity = '1';
              body.classList.add('loading');
              resetGif();
          }
      }

      // Funzione per nascondere il preloader dopo il caricamento della pagina
      function hidePreloader() {
          setTimeout(function () {
              body.classList.remove('loading');
              preloader.style.opacity = '0'; // Riduci l'opacità del preloader
              setTimeout(function () {
                  preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
                  preloaderStarted = false; // Resetta il flag
              }, 500); // 500 millisecondi = 0.5 secondi
          }, 2050); // 2050 millisecondi = 2.05 secondi
      }
    
      // Ascolta l'evento pageshow per gestire il ricaricamento della pagina
      window.addEventListener('pageshow', function (event) {
          if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
              showPreloader();
              hidePreloader();
          }
      });
    
      // Ascolta l'evento load per gestire il caricamento normale della pagina
      window.addEventListener('load', hidePreloader);
    
      // Mostra subito il preloader quando il DOM è pronto
      showPreloader();
  });