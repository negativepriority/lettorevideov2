//No scroll da telefono quando l'utente clicca il menù hamburger della nav
document.addEventListener('DOMContentLoaded', function () {
    const checkBtn = document.getElementById('check');
    const body = document.body;
    const html = document.documentElement;

    checkBtn.addEventListener('change', function () {
      if (checkBtn.checked) {
        body.classList.add('no-scroll');
        // blocco per Firefox
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        body.style.height = '100%';
      } else {
        body.classList.remove('no-scroll');
        // Ablocco per Firefox
        body.style.overflow = '';
        html.style.overflow = '';
        body.style.height = '';
      }
    });
  });

  //Nella nav il menù hamburger diventa una X e viceversa
  document.addEventListener('DOMContentLoaded', function () {
            const checkBtn = document.getElementById('check');
            const iconToggle = document.getElementById('icon-toggle');

            checkBtn.addEventListener('change', function () {
                if (checkBtn.checked) {
                    iconToggle.classList.replace('fa-bars', 'fa-times');
                } else {
                    iconToggle.classList.replace('fa-times', 'fa-bars');
                }
            });
        });




// Get the button:
let mybutton = document.getElementById("mybackontopBtn");

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function () {
  if (window.scrollY > 150) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document with animation
function topFunction() {
  // Define how much to scroll on each animation frame
  const scrollStep = window.scrollY / 30;

  // Define the animation function
  function animateScroll() {
    if (window.scrollY > 0) {
      // Scroll up by scrollStep on each animation frame
      window.scrollTo(0, window.scrollY - scrollStep);

      // Request the next animation frame
      requestAnimationFrame(animateScroll);
    } else {
      // Clear the interval when reaching the top
      mybutton.style.display = "none";
    }
  }

  // Start the animation
  animateScroll();
}