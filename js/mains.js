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