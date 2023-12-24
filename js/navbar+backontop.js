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


// Get the button:
let mybutton = document.getElementById("mybackontopBtn");

// Function to handle scroll events
function handleScroll() {
  if (window.scrollY > 150) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Event listener for scroll
window.addEventListener("scroll", handleScroll);

// Function to scroll to the top with animation
function animateScroll() {
  const scrollStep = window.scrollY / 30;

  function scrollStepFunction() {
    if (window.scrollY > 0) {
      window.scrollTo(0, window.scrollY - scrollStep);
      requestAnimationFrame(scrollStepFunction);
    } else {
      mybutton.style.display = "none";
    }
  }

  scrollStepFunction();
}

// Event listener for button click
mybutton.addEventListener("click", animateScroll);