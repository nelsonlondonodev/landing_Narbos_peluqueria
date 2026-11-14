import googleReviews from '../data/google-reviews.js';
// El texto llega de Google escrito por cualquiera y acaba en `innerHTML`.
import { escapeHTML } from '../utils/escapeHTML.js';

const AVATAR_COLORS = [
    'bg-brand-green/10 text-brand-green',
    'bg-[#B59449]/10 text-[#B59449]',
    'bg-brand-gray-dark/10 text-brand-gray-dark',
    'bg-indigo-600/10 text-indigo-600',
    'bg-rose-600/10 text-rose-600',
    'bg-sky-600/10 text-sky-600'
];

// Las opiniones habituales rondan los 230-350 caracteres. Por encima de LIMITE_TEXTO
// se recorta hacia CORTE_TEXTO para que la tarjeta mida como sus vecinas, y el resto
// queda tras «Ver más». Recortar por caracteres y no con line-clamp deja la decisión
// en el build: el SSG ya sabe qué tarjetas llevan botón sin medir nada en el cliente.
const LIMITE_TEXTO = 360;
const CORTE_TEXTO = 300;

const QUOTE_CLASS = 'text-brand-gray-dark/80 text-sm leading-relaxed';
const TOGGLE = '[data-review-toggle]';
const OPEN = `${TOGGLE}[aria-expanded="true"]`;

/** @param {string} raw @returns {string} */
const formatText = raw => escapeHTML(raw).replace(/\n/g, '<br>');

/**
 * Corta en el último espacio antes de `max` para no partir una palabra.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
function cutAtWord(text, max) {
    const cut = text.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!¡¿?-]+$/, '');
}

/**
 * Cuerpo de la opinión. Si es larga, lleva las dos versiones en el HTML: el rastreador
 * lee la completa aunque esté oculta, y «Ver más» solo alterna cuál se ve.
 * @param {string} raw
 * @returns {string}
 */
function reviewBodyHTML(raw) {
    if (raw.length <= LIMITE_TEXTO) {
        return `<p class="${QUOTE_CLASS}">"${formatText(raw)}"</p>`;
    }
    return `
            <p class="${QUOTE_CLASS}" data-review-short>"${formatText(cutAtWord(raw, CORTE_TEXTO))}…"</p>
            <p class="${QUOTE_CLASS} hidden" data-review-full>"${formatText(raw)}"</p>
            <button type="button" class="mt-2 text-sm font-semibold text-brand-green hover:underline" data-review-toggle aria-expanded="false">Ver más</button>`;
}

/**
 * Tarjeta de una opinión. La comparten el componente y el SSG, que pinta el carril en
 * el build para que el rastreador vea las reseñas reales sin depender del JS.
 * No enlaza a la ficha: el clic sacaba al usuario de la web en mitad de la lectura, y
 * el enlace a Google ya está en la cabecera con la calificación.
 * @param {{author: string, rating: number, text: string, relativeTime: string}} review
 * @param {number} index - Posición, para rotar el color del avatar.
 * @returns {string}
 */
export function reviewCardHTML(review, index) {
    const author = escapeHTML(review.author || '');
    const initial = author ? author.charAt(0).toUpperCase() : 'C';
    const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
    const stars = '★'.repeat(review.rating || 5);

    return `
        <article class="w-80 md:w-96 flex-shrink-0 bg-white p-6 rounded-xl shadow-md border border-gray-100/50 hover:shadow-xl transition-shadow duration-300">
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
            ${reviewBodyHTML(review.text || '')}
        </article>
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
        this._bindExpand();
    }

    /**
     * «Ver más» abre solo su tarjeta, y mientras haya una abierta el carril se detiene
     * (`is-paused`). Cuándo se cierra depende del puntero:
     * - Con ratón, el hover ya lo detiene: al salir del carril se cierra y sigue.
     * - Sin ratón (móvil), un toque fuera de la tarjeta abierta la cierra y reanuda.
     * Un solo listener de clic en `document` cubre las dos cosas: alterna la tarjeta
     * del botón pulsado y cierra cualquier otra, así que nunca hay dos abiertas.
     * @private
     */
    _bindExpand() {
        this.track.addEventListener('pointerleave', event => {
            if (event.pointerType === 'mouse') this._closeAllExcept(null);
        });

        document.addEventListener('click', event => {
            const target = /** @type {Element} */ (event.target);
            const card = this.track.contains(target) ? target.closest('article') : null;
            if (card && target.closest(TOGGLE)) this._setExpanded(card, !this._isOpen(card));
            this._closeAllExcept(card);
        });
    }

    /** @param {Element} card @returns {boolean} @private */
    _isOpen(card) {
        return card.querySelector(OPEN) !== null;
    }

    /**
     * @param {Element} card
     * @param {boolean} expanded
     * @private
     */
    _setExpanded(card, expanded) {
        const button = card.querySelector(TOGGLE);
        card.querySelector('[data-review-short]').classList.toggle('hidden', expanded);
        card.querySelector('[data-review-full]').classList.toggle('hidden', !expanded);
        button.setAttribute('aria-expanded', String(expanded));
        button.textContent = expanded ? 'Ver menos' : 'Ver más';
        this.track.classList.toggle('is-paused', this.track.querySelector(OPEN) !== null);
    }

    /**
     * @param {Element|null} except - Tarjeta que se deja como está.
     * @private
     */
    _closeAllExcept(except) {
        this.track.querySelectorAll(OPEN).forEach(button => {
            const card = button.closest('article');
            if (card !== except) this._setExpanded(card, false);
        });
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
            // Un botón dentro de `aria-hidden` no debe recibir el foco del teclado.
            clone.querySelectorAll('button').forEach(b => b.setAttribute('tabindex', '-1'));
            this.track.appendChild(clone);
        });
    }
}
