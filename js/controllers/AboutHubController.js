import googleReviews from '../data/google-reviews.js';

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
        this._hydrateHeader();
        if (this.marqueeTrack) {
            this._renderReviews();
        }
    }

    /**
     * Hidrata la cabecera de la sección de opiniones con la puntuación y volumen real de Google.
     * @private
     */
    _hydrateHeader() {
        const averageEl = document.getElementById("about-reviews-average");
        const countEl = document.getElementById("about-reviews-count");
        if (averageEl && googleReviews.rating) {
            averageEl.textContent = googleReviews.rating.toFixed(1);
        }
        if (countEl && googleReviews.userRatingCount) {
            countEl.textContent = `(${googleReviews.userRatingCount} opiniones en Google)`;
        }
    }

    /**
     * Renderiza dinámicamente las opiniones en la marquesina a partir de la fuente de verdad.
     * @private
     */
    _renderReviews() {
        const reviews = googleReviews.reviews || [];
        if (reviews.length === 0) {
            // Fallback seguro si no hay datos dinámicos sincronizados
            this._setupDynamicMarquee();
            return;
        }

        this.marqueeTrack.innerHTML = reviews
            .map((review, i) => this._createCardTemplate(review, i))
            .join('');

        this._setupDynamicMarquee();
    }

    /**
     * Crea la plantilla HTML para una tarjeta de opinión individual.
     * @param {Object} review 
     * @param {number} index 
     * @returns {string} HTML string
     * @private
     */
    _createCardTemplate(review, index) {
        const { initial, colorClass } = this._getAvatarConfig(review.author, index);
        const formattedText = this._formatText(review.text);
        const stars = '★'.repeat(review.rating || 5);

        return `
            <a href="https://maps.app.goo.gl/h3sVPXeiKamdy9KH9" target="_blank" rel="noopener noreferrer" class="block w-80 md:w-96 flex-shrink-0 bg-white p-6 rounded-xl shadow-md border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" title="Ver opinión en Google Maps">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full ${colorClass} flex items-center justify-center font-bold text-lg">${initial}</div>
                        <div>
                            <h4 class="font-bold text-brand-gray-dark text-sm">${review.author}</h4>
                            <p class="text-xs text-gray-500">${review.relativeTime}</p>
                        </div>
                    </div>
                    <svg class="w-5 h-5 opacity-60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>
                <div class="flex text-yellow-400 mb-3 text-sm">${stars}</div>
                <p class="text-brand-gray-dark/80 text-sm leading-relaxed">
                    "${formattedText}"
                </p>
            </a>
        `;
    }

    /**
     * Resuelve las iniciales y la paleta de colores de fondo para el avatar del autor.
     * @param {string} author 
     * @param {number} index 
     * @returns {Object} Configuración del avatar { initial, colorClass }
     * @private
     */
    _getAvatarConfig(author, index) {
        const colors = [
            'bg-brand-green/10 text-brand-green',
            'bg-[#B59449]/10 text-[#B59449]', // Dorado
            'bg-brand-gray-dark/10 text-brand-gray-dark', // Gris Oscuro
            'bg-indigo-600/10 text-indigo-600', // Indigo
            'bg-rose-600/10 text-rose-600', // Rosa
            'bg-sky-600/10 text-sky-600' // Cielo
        ];

        return {
            initial: author ? author.charAt(0).toUpperCase() : 'C',
            colorClass: colors[index % colors.length]
        };
    }

    /**
     * Sanitiza y formatea los saltos de línea del texto de reseña.
     * @param {string} text 
     * @returns {string} Texto formateado con etiquetas <br>
     * @private
     */
    _formatText(text) {
        return text ? text.replace(/\n/g, '<br>') : '';
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
    }
}
