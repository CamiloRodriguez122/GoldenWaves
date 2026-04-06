<<<<<<< HEAD
// JS DE ROOMS.HTML

function handleScrollAnimation() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        
        
        const isVisible = (elementTop < windowHeight - 100) && (elementBottom > 100);

        if (isVisible) {
            el.classList.add('in-view');
            el.classList.remove('out-of-view');
        } else {
            el.classList.add('out-of-view');
            el.classList.remove('in-view');
        }
    });
}


window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

//FIN DE JS DE ROOMS.HTML

// ========================================
// GOLDEN WAVES - MAIN.JS
// Funcionalidad Global
// ========================================

// ========== VARIABLES GLOBALES ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ========== NAVEGACIÓN ==========
// Scroll navbar background
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle mobile menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu on click outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
        
        if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#reservar') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== AOS (ANIMATE ON SCROLL) ==========
// Simple AOS implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// ========== COUNTER ANIMATION ==========
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stat numbers
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                animateCounter(statNumber);
                statNumber.classList.add('counted');
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
    
    // Floating elements parallax
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== SCROLL REVEAL (GSAP Alternative) ==========
// If GSAP is loaded, use it for advanced animations
if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .from('.hero-subtitle', { 
            opacity: 0, 
            y: 30, 
            duration: 1,
            delay: 0.5
        })
        .from('.title-line', { 
            opacity: 0, 
            y: 50, 
            stagger: 0.2, 
            duration: 1 
        }, '-=0.5')
        .from('.hero-description', { 
            opacity: 0, 
            y: 30, 
            duration: 1 
        }, '-=0.5')
        .from('.hero-buttons', { 
            opacity: 0, 
            y: 30, 
            duration: 1 
        }, '-=0.5');
    
    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        const elements = section.querySelectorAll('[data-aos]');
        
        if (elements.length > 0) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                onEnter: () => {
                    elements.forEach(element => {
                        element.classList.add('aos-animate');
                    });
                }
            });
        }
    });
}

// ========== CURSOR PERSONALIZADO (OPCIONAL) ==========
// Puedes activarlo si lo deseas
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// Descomentar para activar cursor personalizado
// if (window.innerWidth > 768) {
//     initCustomCursor();
// }

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ========== SCROLL TO TOP BUTTON ==========
function createScrollTopButton() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', createScrollTopButton);

// ========== PRELOAD IMAGES ==========
function preloadImages() {
    const images = [
        'assets/img/hero-background.jpg',
        'assets/img/Suit_manglar.png',
        'assets/img/Suit_marp.png',
        'assets/img/Suit_normal.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    
    // Add loaded class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========== EXPORT FUNCTIONS (if needed) ==========
window.GoldenWaves = {
    animateCounter,
    initCustomCursor
};
=======
const roomsData = [
    {
        title: "Suite Mar y Manglar",
        desc: "Nuestra estancia más exclusiva con vistas duales al ecosistema local y acabados en madera noble.",
        price: "$2.100",
        img: "assets/img/Suit_manglarymar.png",
        amenities: ["Terraza Privada", "Cama King Size", "Jacuzzi", "Mini Bar Premium", "Wifi 6G", "Aire Central"]
    },
    {
        title: "Suite Vista al Mar",
        desc: "Elegancia frente al horizonte caribeño diseñada para despertares bañados en luz natural.",
        price: "$1.750",
        img: "assets/img/Suit_mar.png",
        amenities: ["Balcón al Mar", "Cama King Size", "Smart TV 65'", "Cafetera Nespresso", "Caja Fuerte", "Ducha Lluvia"]
    },
    {
        title: "Suite Básica",
        desc: "Minimalismo cálido y confort absoluto diseñado para la desconexión total del mundo exterior.",
        price: "$950",
        img: "assets/img/Suit_normal.png",
        amenities: ["Cama Queen Size", "Smart TV 55'", "Escritorio", "Wifi Alta Velocidad", "Aire Acondicionado", "Ducha Moderna"]
    }
];

function openDetails(index) {
    const data = roomsData[index];
    const overlay = document.getElementById('details-overlay');
    if (!data || !overlay) return;

    document.getElementById('details-title').innerText = data.title;
    document.getElementById('details-desc').innerText = data.desc;
    document.getElementById('details-price').innerHTML = `Inversión <strong>${data.price}</strong>`;
    document.getElementById('details-img').style.backgroundImage = `url('${data.img}')`;
    document.getElementById('details-list').innerHTML = data.amenities.map(i => `<li>${i}</li>`).join('');
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetails() {
    const overlay = document.getElementById('details-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('details-overlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target.id === 'details-overlay') closeDetails();
        });
    }

    const checkReveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('in-view');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); 
});

function trabajar() { } 

function reservar(paquete) {
    alert("Solicitud recibida para: " + paquete);
}
>>>>>>> f85a3c73b8b1e1b36c4286d8bb99b07a2c2161e9
