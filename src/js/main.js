import "core-js/stable";
import "regenerator-runtime/runtime";
import "../styles/main.scss";
import Glider from "glider-js";
import "glider-js/glider.min.css";

// -----------------------------
// 0. Precarregar imatges automàticament
// -----------------------------
import { imagesToPreload } from "./preload-images.js";

imagesToPreload.forEach(async url => {
    try {
        const img = new Image();
        img.src = url;
        await img.decode();
    } catch (err) {
        console.warn(`No s’ha pogut carregar la imatge: ${url}`);
    }
});

// ==============================
// 1. Funcions DOMContentLoaded
// ==============================
document.addEventListener("DOMContentLoaded", () => {

    // ---------- Menú responsive ----------
    const menuToggle = document.querySelector('header .menu-toggle');
    const navLinks = document.querySelector('header .nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            menuToggle.textContent = expanded ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // ---------- Glider.js Galeria ----------
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

        // Accessibilitat fletxes
        const prev = document.querySelector(".glider-prev");
        const next = document.querySelector(".glider-next");
        if (prev) prev.setAttribute("aria-label", "Slide anterior");
        if (next) next.setAttribute("aria-label", "Següent slide");

        // Lazy-loading imatges
        glider.track.querySelectorAll("img").forEach(img => {
            img.setAttribute("loading", "lazy");
        });

        // Ajusta gap
        function updateGap() {
            const containerWidth = gallery.offsetWidth;
            const slide = glider.track.querySelector('.glider-slide');
            if (slide) {
                const slideWidth = slide.offsetWidth;
                const slidesVisible = Math.floor(containerWidth / slideWidth);
                gallery.classList.toggle("has-gap", slidesVisible > 1);
            }
        }

        updateGap();

        // Resize debounce
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                glider.refresh();
                updateGap();
            }, 150);
        });

        // Animacions inicials slides
        glider.track.querySelectorAll(".glider-slide").forEach((slide, index) => {
            slide.style.opacity = 0;
            slide.style.transform = "translateY(20px)";
            slide.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            setTimeout(() => {
                slide.style.opacity = 1;
                slide.style.transform = "translateY(0)";
            }, index * 150);
        });
    }

    // ==============================
    // 2. Animació IntersectionObserver
    // ==============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elementsToObserve = [
        document.querySelector('.featured-image'),
        ...document.querySelectorAll('.gallery-img')
    ];
    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });

    // ==============================
    // 3. Mostrar les card
    // ==============================
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));

});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             