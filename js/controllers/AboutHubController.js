/**
 * AboutHubController
 * Maneja la lógica de la página Nosotros.
 * Implementa scroll infinito dinámico para reseñas (Marquee) para evitar duplicidad en el HTML.
 * Sigue los principios de funciones atómicas y limpieza de DOM.
 */
export default class AboutHubController {
    constructor() {
        this.marqueeTrack = document.querySelector('.marquee-track');
        this.init();
    }

    init() {
        if (this.marqueeTrack) {
            this._setupDynamicMarquee();
        }
    }

    /**
     * Clona dinámicamente las tarjetas de reseñas para crear el efecto infinito.
     * Esto permite reducir el tamaño del HTML original en más de un 50%.
     * @private
     */
    _setupDynamicMarquee() {
        // Obtenemos solo los hijos que NO son clones previos (si existieran)
        const originalCards = Array.from(this.marqueeTrack.children).filter(child => !child.hasAttribute('aria-hidden'));
        
        // Clonamos el set completo para asegurar que el scroll sea fluido en todas las pantallas
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Ocultar a lectores de pantalla (paridad SEO)
            clone.classList.add('clone');
            this.marqueeTrack.appendChild(clone);
        });

        // Debug: Log para confirmar hidratación
        // console.log(`[AboutHub] Marquee hydrated with ${originalCards.length} original cards and clones.`);
    }
}
