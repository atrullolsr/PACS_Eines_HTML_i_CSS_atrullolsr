document.addEventListener("DOMContentLoaded", () => {
    initMenu();
});

window.addEventListener("load", () => {
    initLazyImages();
    initIntersectionAnimations();
    initGliderWhenIdle();
});

/* ==============================
Menú responsive
================================ */
function initMenu() {
    const menuToggle = document.querySelector("header .menu-toggle");
    const navLinks = document.querySelector("header .nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        const expanded = navLinks.classList.toggle("active");

        menuToggle.textContent = expanded ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", expanded);
        menuToggle.setAttribute(
            "aria-label",
            expanded ? "Tancar menú" : "Obrir menú"
        );
    });
}

/* ==============================
Lazy loading d’imatges
(excloent la imatge LCP)
================================ */
function initLazyImages() {
    document
        .querySelectorAll("img:not([loading]):not(.featured-image)")
        .forEach(img => {
            img.loading = "lazy";
            img.decoding = "async";
        });
}

/* ==============================
IntersectionObserver animacions
(no observa la imatge LCP)
================================ */
function initIntersectionAnimations() {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document
        .querySelectorAll(".gallery-img, .card")
        .forEach(el => observer.observe(el));
}

/* ==============================
Glider.js (carregat quan el navegador està lliure)
================================ */
function initGliderWhenIdle() {
    const gallery = document.querySelector(".glider");
    if (!gallery) return;

    const loadGlider = async () => {
        const { default: Glider } = await import("glider-js");
        await import("glider-js/glider.min.css");
        initGlider(gallery, Glider);
    };

    if ("requestIdleCallback" in window) {
        requestIdleCallback(loadGlider);
    } else {
        setTimeout(loadGlider, 300);
    }
}

function initGlider(gallery) {
    const glider = new Glider(gallery, {
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: true,
        dots: ".dots",
        arrows: {
            prev: ".glider-prev",
            next: ".glider-next"
        },
        responsive: [
            { breakpoint: 0, settings: { slidesToShow: 1 } },
            { breakpoint: 775, settings: { slidesToShow: 2 } }
        ]
    });

    // Accessibilitat fletxes
    document.querySelector(".glider-prev")?.setAttribute(
        "aria-label",
        "Slide anterior"
    );
    document.querySelector(".glider-next")?.setAttribute(
        "aria-label",
        "Següent slide"
    );

    // Animació progressiva de slides
    glider.track?.querySelectorAll(".glider-slide").forEach((slide, index) => {
        setTimeout(() => {
            slide.classList.add("slide-in");
        }, index * 150);
    });

    // Ajust del gap
    function updateGap() {
        const slide = glider.track?.querySelector(".glider-slide");
        if (!slide) return;

        const slidesVisible = Math.floor(
            gallery.offsetWidth / slide.offsetWidth
        );

        gallery.classList.toggle("has-gap", slidesVisible > 1);
    }

    updateGap();

    // Resize amb debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            glider.refresh(true);
            updateGap();
        }, 150);
    });
}