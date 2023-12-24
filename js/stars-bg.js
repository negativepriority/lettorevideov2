const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
const stars = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a random number within a range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Create a star
function createStar() {
  return {
    x: randomRange(0, canvas.width),
    y: randomRange(0, canvas.height),
    size: randomRange(1, 2),
    speed: randomRange(0.2, 0.8)
  };
}

// Initialize stars
for (let i = 0; i < 8; i++) {
  stars.push(createStar());
}

// Update and draw stars
function updateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.y -= star.speed;

    if (star.y < 0) {
      star.y = canvas.height;
      star.x = randomRange(0, canvas.width);
    }

    ctx.fillStyle = '#fff';
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  requestAnimationFrame(updateStars);
}

// Handle scroll events to adjust star speed
let scrollSpeed = 0;
let lastScrollTop = 0;

function handleScroll() {
  const st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop) {
    // Scrolling down
    scrollSpeed += 3;
  } else {
    // Scrolling up
    scrollSpeed -= 3;
  }

  lastScrollTop = st;

  // Limit scroll speed
  scrollSpeed = Math.max(0, Math.min(scrollSpeed, 5));
}

window.addEventListener('scroll', handleScroll);

// Initial call to start animation
updateStars();