/*
 * Original Navbar JavaScript Author : Oğuzhan Avcı
 * https://github.com/oziavci
 * Andrea Capizzi's custom version.
*/

const openMenu = document.querySelector(".menu-open");
const closeMenu = document.querySelector(".menu-close");
const menuDiv = document.querySelector(".ozmenu");
const menu = document.querySelector(".ozmenu-nav");
const dropDowns = menu.getElementsByClassName("nav-dropdown");
const dropDownsChild = menu.querySelectorAll('.dropdown .nav-dropdown');

// Aggiungi la classe per identificare l'interazione del menu
openMenu.addEventListener("click", function() {
    menuToggle();
    document.body.classList.add('menu-interaction'); // Aggiungi la classe per segnalare l'interazione con il menu
});

closeMenu.addEventListener("click", function() {
    menuToggle();
    document.body.classList.remove('menu-interaction'); // Rimuovi la classe quando il menu viene chiuso
});

document.body.insertAdjacentHTML("beforeend", "<div id='menu-overlay'></div>");
document.querySelector("#menu-overlay").addEventListener("click", function() {
    menuToggle();
    document.body.classList.remove('menu-interaction'); // Rimuovi la classe quando si clicca fuori dal menu
});

function menuToggle() {
    menuDiv.classList.toggle("active");
    document.body.classList.toggle("hide-scrolling");
    document.body.classList.toggle("mobile-menu-active");
    document.getElementById("menu-overlay").classList.toggle("show");
}

for (var i = 0; i < dropDownsChild.length; i++) {
    dropDownsChild[i].classList.add('child');
    dropDownsChild[i].addEventListener("click", function() {
        this.classList.toggle('opened');
    });
}

for (var i = 0; i < dropDowns.length; i++) {
    if(!dropDowns[i].classList.contains("child")){
        dropDowns[i].classList.add('parent');
        dropDowns[i].addEventListener("click", function() {
            this.classList.toggle('opened');
        });
    }
}

//----------------------------------------------------------------------------

// Back on top script:

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