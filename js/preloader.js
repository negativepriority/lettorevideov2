document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // Attendi il caricamento completo del sito prima di rimuovere la classe 'loading'
    window.addEventListener('load', function () {
      setTimeout(function () {
        body.classList.remove('loading');
        preloader.style.opacity = '0'; // Riduci l'opacità del preloader
        setTimeout(function () {
          preloader.style.display = 'none'; // Nascondi il preloader dopo l'animazione
        }, 500); // 500 millisecondi = 0.5 secondi
      }, 2050); // 2100 millisecondi = 2.3 secondi
    });
  });