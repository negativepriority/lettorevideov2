    //Quando l'utente da pc sta con il cursore sopra una card, la gif dentro la card sostituisce il bg del sito
    document.addEventListener('DOMContentLoaded', function () {
        const siteBackground = document.getElementById('site-background');
        const imageContainers = document.querySelectorAll('.image-container');
    
        imageContainers.forEach(container => {
          container.addEventListener('mouseenter', function () {
            const overlayImage = container.querySelector('.hover-image img');
            siteBackground.style.backgroundImage = `url('${overlayImage.src}')`;
            siteBackground.classList.add('hover-effect');
          });
    
          container.addEventListener('mouseleave', function () {
            siteBackground.classList.remove('hover-effect');
          });
        });
      });