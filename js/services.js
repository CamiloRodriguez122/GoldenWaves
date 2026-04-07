// ========================================
// GOLDEN WAVES - SERVICES.JS
// JS exclusivo de services.html y paquetes.html
// ========================================

// ========== REVEAL ANIMATION (ROOMS) ==========
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

// ========== DATOS DE HABITACIONES ==========
const roomsData = [
    {
        title: "Suite Mar y Manglar",
        desc: "Nuestra estancia más exclusiva con vistas duales al ecosistema local y acabados en madera noble.",
        price: "$1,200,000 / noche",
        img: "assets/img/Suit_manglarymar.png",
        amenities: ["Terraza Privada", "Cama King Size", "Jacuzzi", "Mini Bar Premium", "Wifi 6G", "Aire Central"]
    },
    {
        title: "Suite Vista al Mar",
        desc: "Elegancia frente al horizonte caribeño diseñada para despertares bañados en luz natural.",
        price: "$1,500,000 / noche",
        img: "assets/img/Suit_mar.png",
        amenities: ["Balcón al Mar", "Cama King Size", "Smart TV 65'", "Cafetera Nespresso", "Caja Fuerte", "Ducha Lluvia"]
    },
    {
        title: "Suite Básica",
        desc: "Minimalismo cálido y confort absoluto diseñado para la desconexión total del mundo exterior.",
        price: "$950,000 / noche",
        img: "assets/img/Suit_normal.png",
        amenities: ["Cama Queen Size", "Smart TV 55'", "Escritorio", "Wifi Alta Velocidad", "Aire Acondicionado", "Ducha Moderna"]
    }
];

// ========== MODAL DE DETALLES (ROOMS) ==========
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

// ========== INICIALIZACIÓN ROOMS/PAQUETES ==========
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar modal al hacer click fuera
    const overlay = document.getElementById('details-overlay');
    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target.id === 'details-overlay') closeDetails();
        });
    }

    // Cerrar modal con ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDetails();
    });

    // Reveal inicial
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

// ========== FUNCIÓN DE RESERVA (PAQUETES) ==========
function trabajar() {}

function reservar(paquete) {
    alert("Solicitud recibida para: " + paquete);
}
