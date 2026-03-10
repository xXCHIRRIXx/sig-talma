// ELEMENTOS DEL DOM
const progressBar = document.querySelector(".progress-bar");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("img-ampliada");
const captionText = document.getElementById("caption");
const modalInfo = document.getElementById("modal-info");

/**
 * 1. MANEJO DE SCROLL HORIZONTAL
 * Convierte el desplazamiento vertical del mouse en horizontal.
 * Bloquea el scroll si hay un modal o lightbox abierto.
 */
window.addEventListener("wheel", (evt) => {
    // Si algún modal está visible, permitimos el scroll normal (o lo bloqueamos)
    if (lightbox.style.display === "flex" || modalInfo.style.display === "flex") return;

    evt.preventDefault();
    document.documentElement.scrollLeft += evt.deltaY;
    
    // Cálculo de la barra de progreso
    const totalWidth = document.documentElement.scrollWidth - window.innerWidth;
    const currentPos = document.documentElement.scrollLeft;
    
    if (totalWidth > 0) {
        const progress = (currentPos / totalWidth) * 100;
        progressBar.style.width = `${progress}%`;
    }
}, { passive: false });

/**
 * 2. LÓGICA DEL LIGHTBOX (ZOOM DE IMÁGENES)
 */
document.querySelectorAll('.clickable img').forEach(image => {
    image.onclick = function() {
        lightbox.style.display = "flex";
        // Pequeño timeout para permitir que el navegador registre el display antes de la transición
        setTimeout(() => {
            lightbox.style.opacity = "1";
        }, 10);
        lightboxImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
});

// Función para cerrar el Lightbox de imágenes
function cerrarLightbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
}

// Evento para el botón X del lightbox
const closeImgBtn = document.getElementById("close-img");
if (closeImgBtn) {
    closeImgBtn.onclick = cerrarLightbox;
}

/**
 * 3. LÓGICA DEL MODAL DE INFORMACIÓN (POLÍTICA Y OBJETIVOS)
 */
function abrirModal(titulo, texto) {
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-cuerpo').innerText = texto;
    
    modalInfo.style.display = "flex";
    setTimeout(() => {
        modalInfo.style.opacity = "1";
    }, 10);
}

function cerrarModal() {
    modalInfo.style.opacity = "0";
    setTimeout(() => {
        modalInfo.style.display = "none";
    }, 300);
}

/**
 * 4. EVENTOS DE CIERRE GLOBALES
 */

// Cerrar al hacer clic fuera del contenido (en el fondo oscuro)
window.onclick = (e) => {
    if (e.target === lightbox) {
        cerrarLightbox();
    }
    if (e.target === modalInfo) {
        cerrarModal();
    }
};

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        if (lightbox.style.display === "flex") cerrarLightbox();
        if (modalInfo.style.display === "flex") cerrarModal();
    }
});