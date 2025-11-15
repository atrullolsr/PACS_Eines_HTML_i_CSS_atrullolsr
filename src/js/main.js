import "core-js/stable";
import "regenerator-runtime/runtime";
import "../styles/main.scss";
import Glider from "glider-js";
import "glider-js/glider.min.css";

// Precarreguem imatges
const imagesToPreload = [
    new URL("../assets/images/viatge.jpg", import.meta.url),
    new URL("../assets/images/roma/roma-bandera.jpg", import.meta.url),
    new URL("../assets/images/roma/panoramica_roma.jpg", import.meta.url),
    new URL("../assets/images/roma/coloseu.jpg", import.meta.url),
    new URL("../assets/images/roma/panteo_roma.jpg", import.meta.url),
    new URL("../assets/images/roma/fontana_di_trevi.jpg", import.meta.url),
    new URL("../assets/images/paris/paris-bandera.jpg", import.meta.url),
    new URL("../assets/images/paris/panoramica_paris.jpg", import.meta.url),
    new URL("../assets/images/paris/torre_eiffel.jpg", import.meta.url),
    new URL("../assets/images/paris/arc-de-triomf.jpg", import.meta.url),
    new URL("../assets/images/paris/louvre.jpg", import.meta.url),
    new URL("../assets/images/paris/notre_dame.jpg", import.meta.url),
    new URL("../assets/images/lisboa/lisboa-bandera.jpg", import.meta.url),
    new URL("../assets/images/lisboa/panoramica_lisboa.jpg", import.meta.url),
    new URL("../assets/images/lisboa/belem.jpg", import.meta.url),
    new URL("../assets/images/lisboa/jeronimos.jpg", import.meta.url),
    new URL("../assets/images/lisboa/tramvia_28.jpg", import.meta.url),
    new URL("../assets/images/lisboa/elevador_santa_justa.jpg", import.meta.url),
    new URL("../assets/images/londres/londres-bandera.jpg", import.meta.url),
    new URL("../assets/images/londres/panoramica_londres.jpg", import.meta.url),
    new URL("../assets/images/londres/bigben.jpg", import.meta.url),
    new URL("../assets/images/londres/london-eye.jpg", import.meta.url),
    new URL("../assets/images/londres/tower-bridge.jpg", import.meta.url),
];

imagesToPreload.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Menú responsive + carrusel
document.addEventListener("DOMContentLoaded", () => {

    // Menú responsive
    const menuToggle = document.querySelector('header .menu-toggle');
    const navLinks = document.querySelector('header .nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Canvia icona ☰ a ✕
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    } else {
        console.error('No s’ha trobat .menu-toggle o .nav-links');
    }

    // Carrusel Glider.js
    const gallery = document.querySelector(".glider");
    if (gallery) {
        const glider = new Glider(gallery, {
            slidesToShow: 2,
            slidesToScroll: 1,
            draggable: true,
            dots: ".dots",
            arrows: { prev: ".glider-prev", next: ".glider-next" },
            responsive: [
                { breakpoint: 0, settings: { slidesToShow: 1 } },
                { breakpoint: 775, settings: { slidesToShow: 2 } },
            ],
        });

        function updateGap() {
            if (!gallery || !glider) return;

            const containerWidth = gallery.offsetWidth;
            const slide = glider.track.querySelector('.glider-slide');
            if (slide) {
                const slideWidth = slide.offsetWidth;
                const slidesVisible = Math.floor(containerWidth / slideWidth);
                if (slidesVisible > 1) {
                    gallery.classList.add("has-gap");
                } else {
                    gallery.classList.remove("has-gap");
                }
            }
        }

        // Inicial
        updateGap();

        // Recalcul en resize amb refresh
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                glider.refresh();
                updateGap();
            }, 150);
        });
    }
});