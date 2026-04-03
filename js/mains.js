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