// ========================================
// GOLDEN WAVES - INDEX.JS
// Animaciones específicas de la página principal
// ========================================

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Wait for loading animation to complete
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Start hero animations after loading
        setTimeout(() => {
            initHeroAnimations();
        }, 500);
    }, 4000); // 4 seconds loading animation
});

// ========== HERO ANIMATIONS ==========
function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
        // GSAP Animations
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        heroTl
            .to('.hero-subtitle', {
                opacity: 1,
                duration: 1
            })
            .to('.title-line', {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1
            }, '-=0.5')
            .to('.hero-description', {
                opacity: 1,
                duration: 1
            }, '-=0.5')
            .to('.hero-buttons', {
                opacity: 1,
                duration: 1
            }, '-=0.5');
        
        // Parallax scroll animations
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
        
        // Floating elements animation
        gsap.utils.toArray('.float-element').forEach((element, index) => {
            gsap.to(element, {
                y: -100,
                x: index % 2 === 0 ? 50 : -50,
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
        // Fallback CSS animations
        document.querySelector('.hero-subtitle').style.opacity = '1';
        document.querySelectorAll('.title-line').forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, index * 200);
        });
        setTimeout(() => {
            document.querySelector('.hero-description').style.opacity = '1';
        }, 600);
        setTimeout(() => {
            document.querySelector('.hero-buttons').style.opacity = '1';
        }, 900);
    }
}

// ========== ROOM CARDS HOVER EFFECT ==========
document.addEventListener('DOMContentLoaded', () => {
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add 3D tilt effect
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
});

// ========== EXPERIENCE CARDS ANIMATION ==========
if (typeof gsap !== 'undefined') {
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)'
        });
    });
}

// ========== SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-preview');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ========== ABOUT PREVIEW VIDEO MODAL ==========
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        // Aquí puedes agregar un modal de video
        // Por ahora solo mostramos un alert
        alert('Video modal - Por implementar con tu video del hotel');
        // Implementación sugerida:
        // createVideoModal('url-de-tu-video.mp4');
    });
}

function createVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-overlay"></div>
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <video controls autoplay>
                <source src="${videoUrl}" type="video/mp4">
                Tu navegador no soporta el elemento de video.
            </video>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.video-modal-overlay').addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// ========== ROOMS SLIDER (Optional Auto-scroll) ==========
function initRoomsAutoScroll() {
    const roomsSlider = document.querySelector('.rooms-slider');
    if (!roomsSlider || window.innerWidth < 768) return;
    
    let isScrolling = false;
    let scrollInterval;
    
    const startAutoScroll = () => {
        scrollInterval = setInterval(() => {
            if (!isScrolling) {
                roomsSlider.scrollBy({
                    left: 400,
                    behavior: 'smooth'
                });
                
                // Reset to start if at end
                if (roomsSlider.scrollLeft >= roomsSlider.scrollWidth - roomsSlider.clientWidth) {
                    setTimeout(() => {
                        roomsSlider.scrollTo({
                            left: 0,
                            behavior: 'smooth'
                        });
                    }, 3000);
                }
            }
        }, 5000);
    };
    
    const stopAutoScroll = () => {
        clearInterval(scrollInterval);
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
            startAutoScroll();
        }, 10000);
    };
    
    roomsSlider.addEventListener('mouseenter', stopAutoScroll);
    roomsSlider.addEventListener('touchstart', stopAutoScroll);
    
    // Uncomment to enable auto-scroll
    // startAutoScroll();
}

document.addEventListener('DOMContentLoaded', initRoomsAutoScroll);

// ========== STATS COUNTER WITH INTERSECTION OBSERVER ==========
const statsCounters = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target;
                }
            };
            
            updateCounter();
            entry.target.classList.add('counted');
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsCounters.forEach(counter => statsObserver.observe(counter));

// ========== PARALLAX LAYERS ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Different parallax speeds for different layers
    const layers = [
        { selector: '.float-1', speed: 0.5 },
        { selector: '.float-2', speed: 0.3 },
        { selector: '.float-3', speed: 0.7 }
    ];
    
    layers.forEach(layer => {
        const element = document.querySelector(layer.selector);
        if (element) {
            const yPos = -(scrolled * layer.speed);
            element.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// ========== REVEAL ON SCROLL (For browsers without GSAP) ==========
if (typeof gsap === 'undefined') {
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => revealObserver.observe(element));
}

// ========== LOCATION MAP LAZY LOAD ==========
const mapIframe = document.querySelector('.location-map iframe');
if (mapIframe) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mapIframe.src = mapIframe.getAttribute('src');
                mapObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    mapObserver.observe(mapIframe);
}

// ========== SMOOTH SCROLL ENHANCEMENTS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== RESERVATION BUTTON INTERACTION ==========
document.querySelectorAll('a[href="#reservar"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí puedes integrar tu sistema de reservas
        // Por ejemplo, abrir un modal de reserva
        alert('Sistema de reservas - Por integrar con tu plataforma de booking');
    });
});

// ========== PERFORMANCE OPTIMIZATIONS ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for intensive operations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Use throttle for scroll parallax
window.addEventListener('scroll', throttle(() => {
    // Your scroll-based animations here
}, 16)); // ~60fps

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 Golden Waves - Index page loaded');
    
    // Add any initialization code here
    
    // Example: Add entrance animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.transition = 'opacity 1s ease';
            section.style.opacity = '1';
        }, index * 100);
    });
});

// ========== EXPORT FUNCTIONS ==========
window.GoldenWavesIndex = {
    createVideoModal,
    initRoomsAutoScroll,
    initHeroAnimations
};