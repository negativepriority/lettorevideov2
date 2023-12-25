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




