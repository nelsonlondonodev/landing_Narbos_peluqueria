import googleReviews from '../data/google-reviews.js';

const MAPS_URL = 'https://maps.app.goo.gl/h3sVPXeiKamdy9KH9';

const AVATAR_COLORS = [
    'bg-brand-green/10 text-brand-green',
    'bg-[#B59449]/10 text-[#B59449]',
    'bg-brand-gray-dark/10 text-brand-gray-dark',
    'bg-indigo-600/10 text-indigo-600',
    'bg-rose-600/10 text-rose-600',
    'bg-sky-600/10 text-sky-600'
];

/**
 * El texto llega de Google escrito por cualquiera y acaba en `innerHTML`: sin escapar,
 * una reseña con `<` rompería el marcado o colaría HTML en la página.
 */
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Tarjeta de una opinión. La comparten el componente y el SSG, que pinta el carril en
 * el build para que el rastreador vea las reseñas reales sin depender del JS.
 * @param {{author: string, rating: number, text: string, relativeTime: string}} review
 * @param {number} index - Posición, para rotar el color del avatar.
 * @returns {string}
 */
export function reviewCardHTML(review, index) {
    const author = escapeHTML(review.author || '');
    const initial = author ? author.charAt(0).toUpperCase() : 'C';
    const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
    const text = escapeHTML(review.text || '').replace(/\n/g, '<br>');
    const stars = '★'.repeat(review.rating || 5);

    return `
        <a href="${MAPS_URL}" target="_blank" rel="noopener noreferrer" class="block w-80 md:w-96 flex-shrink-0 bg-white p-6 rounded-xl shadow-md border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" title="Ver opiniones en Google Maps">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full ${colorClass} flex items-center justify-center font-bold text-lg">${initial}</div>
                    <div>
                        <p class="font-bold text-brand-gray-dark text-sm">${author}</p>
                        <p class="text-xs text-gray-500">${escapeHTML(review.relativeTime || '')}</p>
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
                "${text}"
            </p>
        </a>
    `;
}

/**
 * Marquesina de opiniones de Google.
 *
 * El SSG deja el carril pintado con las opiniones del build; el componente solo lo
 * rellena si llega vacío (servidor de desarrollo sin build), para no repintar en el
 * cliente lo que ya está en el HTML.
 *
 * El bucle infinito se consigue clonando el juego completo de tarjetas, no repitiendo
 * el HTML en la página: los clones van con `aria-hidden` para que un lector de
 * pantalla no lea dos veces las mismas opiniones.
 */
export class ReviewsMarquee {
    /**
     * @param {string} [trackSelector='.marquee-track'] - Selector del carril que se anima.
     */
    constructor(trackSelector = '.marquee-track') {
        this.track = document.querySelector(trackSelector);
    }

    render() {
        if (!this.track) return;

        this._hydrateHeader();

        const reviews = googleReviews.reviews || [];
        if (this.track.children.length === 0 && reviews.length > 0) {
            this.track.innerHTML = reviews.map(reviewCardHTML).join('');
        }

        this._duplicateForLoop();
    }

    /**
     * La calificación y el volumen se localizan por atributo de datos, no por id: cada
     * página los nombraba a su manera y eso obligaba a que el punto de montaje supiera
     * en cuál estaba.
     * @private
     */
    _hydrateHeader() {
        const average = document.querySelector('[data-google-rating]');
        const count = document.querySelector('[data-google-count]');

        if (average && googleReviews.rating) {
            average.textContent = googleReviews.rating.toFixed(1);
        }
        if (count && googleReviews.userRatingCount) {
            count.textContent = `(${googleReviews.userRatingCount} opiniones en Google)`;
        }
    }

    /** @private */
    _duplicateForLoop() {
        const originals = Array.from(this.track.children).filter(c => !c.hasAttribute('aria-hidden'));

        originals.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add('clone');
            this.track.appendChild(clone);
        });
    }
}
