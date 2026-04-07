// ========================================
// GOLDEN WAVES - INDEX.JS
// Animaciones exclusivas de index.html
// ========================================

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            initHeroAnimations();
        }, 500);
    }, 4000);
});

// ========== HERO ANIMATIONS ==========
function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
            .to('.hero-subtitle', { opacity: 1, duration: 1 })
            .to('.title-line', { opacity: 1, y: 0, stagger: 0.2, duration: 1 }, '-=0.5')
            .to('.hero-description', { opacity: 1, duration: 1 }, '-=0.5')
            .to('.hero-buttons', { opacity: 1, duration: 1 }, '-=0.5');

        // Parallax con GSAP ScrollTrigger
        gsap.to('.hero-background', {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Floating elements
        gsap.utils.toArray('.float-element').forEach((el, i) => {
            gsap.to(el, {
                y: -100,
                x: i % 2 === 0 ? 50 : -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

    } else {
        // Fallback sin GSAP
        const subtitle = document.querySelector('.hero-subtitle');
        const lines = document.querySelectorAll('.title-line');
        const desc = document.querySelector('.hero-description');
        const btns = document.querySelector('.hero-buttons');

        if (subtitle) subtitle.style.opacity = '1';
        lines.forEach((line, i) => setTimeout(() => line.style.opacity = '1', i * 200));
        if (desc) setTimeout(() => desc.style.opacity = '1', 600);
        if (btns) setTimeout(() => btns.style.opacity = '1', 900);
    }
}

// ========== EXPERIENCE CARDS ANIMATION ==========
// Removido GSAP aquí porque causaba conflictos con la visibilidad al inicio
// debido al overflow de la pantalla de carga. Las tarjetas usarán animaciones
// estándar al scroll o estarán siempre visibles.

// ========== SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-preview');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.pageYOffset > 200 ? '0' : '1';
    });
}

// ========== VIDEO MODAL (About) ==========
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        alert('Video modal — Por implementar con el video del hotel');
    });
}

// ========== PARALLAX FLOATING ELEMENTS (sin GSAP) ==========
window.addEventListener('scroll', () => {
    if (typeof gsap !== 'undefined') return; // GSAP ya lo maneja
    const scrolled = window.pageYOffset;
    [
        { sel: '.float-1', speed: 0.5 },
        { sel: '.float-2', speed: 0.3 },
        { sel: '.float-3', speed: 0.7 }
    ].forEach(({ sel, speed }) => {
        const el = document.querySelector(sel);
        if (el) el.style.transform = `translateY(${-(scrolled * speed)}px)`;
    });
});

// ========== RESERVATION BUTTON ==========
document.querySelectorAll('a[href="#reservar"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Sistema de reservas — Por integrar con tu plataforma de booking');
    });
});

// ========== EXPORT ==========
window.GoldenWavesIndex = {
    initHeroAnimations
};

console.log('🌊 Golden Waves - Index page loaded');