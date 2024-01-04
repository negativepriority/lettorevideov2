// Get the textarea element - FORM MESSAGE SI ALLUNGA VERTICALMENTE SE CI SONO TROPPE RIGHE
var textarea = document.querySelector('.contact-form textarea');

// Set the minimum height you desire
var minHeight = '120px';

// Store the initial height
var initialHeight = Math.max(textarea.scrollHeight, parseInt(minHeight)) + 'px';
textarea.style.height = initialHeight;

// Attach an event listener for the input event (when the user types)
textarea.addEventListener('input', function () {
    // Store the current scroll position
    var currentScrollPosition = window.scrollY;

    // Set the height of the textarea based on its scrollHeight
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';

    // Set padding-bottom to ensure text doesn't touch the bottom
    this.style.paddingBottom = '20px'; // Adjust this value as needed

    // Remove the scrollbar by setting overflow to hidden
    this.style.overflow = 'hidden';

    // Adjust the height only if it exceeds the initial height
    if (this.scrollHeight <= parseInt(initialHeight)) {
        this.style.height = initialHeight;
    }

    // Restore the scroll position
    window.scrollTo(0, currentScrollPosition);
});