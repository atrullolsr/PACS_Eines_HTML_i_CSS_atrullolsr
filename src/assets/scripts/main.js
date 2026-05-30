/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

// 1. GESTIÓ DEL MENÚ HAMBURGUESA
function initHamburgerMenu() {
  document.addEventListener('click', (event) => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('menu-links');

    if (!menuBtn || !mobileMenu) return;

    // Si l'usuari ha clicat el botó de l'hamburguesa (o un element de dins seu)
    if (menuBtn.contains(event.target)) {
      // Commutem la visibilitat del menú (mostrat/amagat)
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    }
  });
}

// 2. FUNCIÓ ÚNICA PER AL CARRUSEL
function initCarousel() {
  const inner = document.getElementById('carousel-inner');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!inner || !dots.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalSlides = dots.length;

  function updateCarousel(index) {
    currentIndex = index;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      const isSelected = i === currentIndex;
      dot.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      dot.classList.toggle('bg-white', isSelected);
      dot.classList.toggle('bg-white/50', !isSelected);
    });
  }

  nextBtn.addEventListener('click', () => updateCarousel((currentIndex + 1) % totalSlides));
  prevBtn.addEventListener('click', () => updateCarousel((currentIndex - 1 + totalSlides) % totalSlides));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      updateCarousel(parseInt(dot.getAttribute('data-slide')));
    });
  });

  setInterval(() => nextBtn.click(), 5000);
}

// 3. EXECUTOR PRINCIPAL AL CARREGAR EL DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log("Hello, UOC!");

  // Inicialitza el menú mòbil
  initHamburgerMenu();

  // Inicialitza el carrusel en una sola línia cridant la funció
  initCarousel();
});