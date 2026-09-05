import googleReviews from '../data/google-reviews.js';

/**
 * Badges de confianza del hero: la calificación de Google y el estado del negocio.
 *
 * Viven aquí, y no en el HTML de cada página, porque `sync-google-reviews.js` solo
 * reescribe la calificación visible en una lista fija de ficheros: un badge copiado a
 * mano en dieciséis heroes se congelaría en el valor del día que se pegó. Leyendo de
 * `google-reviews.js` —que el build sí sincroniza siempre— el dato no puede derivar.
 *
 * No se inyectan desde `HeroSection.js` porque solo la mitad de los heroes salen de ese
 * componente: siete fichas de servicio y la home llevan su hero escrito a mano. El SSG
 * los cuelga de `section#inicio`, que es el único anclaje que tienen las dieciséis.
 */

// Repetido en nueve sitios del repo; `siteConfig.contact.mapsLink` sigue con el
// marcador de plantilla, así que no se puede leer de ahí todavía.
const MAPS_URL = 'https://maps.app.goo.gl/h3sVPXeiKamdy9KH9';

/**
 * El sprite de la estrella, para las páginas que aún no lo declaran. La home ya lo trae
 * por el carrusel de opiniones: un segundo `<symbol>` con el mismo id sería marcado
 * inválido y `<use>` resolvería al primero de todos modos.
 */
export function getStarSpriteHTML() {
    return `<svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false"><symbol id="star-icon" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></symbol></svg>`;
}

/**
 * @param {Object} opciones
 * @param {boolean} [opciones.reviews=true] - Badge de calificación de Google.
 * @param {boolean} [opciones.status=true] - Badge de ABIERTO/CERRADO AHORA.
 * @returns {string} HTML de los badges, listo para colgar del `<section>` del hero.
 */
export function getHeroBadgesHTML({ reviews = true, status = true } = {}) {
    const rating = Number(googleReviews.rating).toFixed(1);
    const count = googleReviews.userRatingCount;

    // Apilados por debajo de `md` compartiendo borde izquierdo, en esquinas opuestas por
    // encima. Sin el badge de reseñas arriba, el estado sube a ocupar su hueco en vez de
    // dejar un espacio muerto.
    const statusTop = reviews ? 'top-16 md:top-8' : 'top-4 md:top-8';

    const ratingBadge = reviews ? `
                    <a href="${MAPS_URL}" target="_blank" rel="noopener" id="hero-google-rating" class="absolute top-4 md:top-8 left-[10%] md:left-[8%] lg:left-[12%] z-20 animate-fade-in-up delay-100 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 backdrop-blur-md shadow-lg px-3 py-1.5 md:px-4 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300" title="Ver opiniones en Google Maps" aria-label="Calificación ${rating} sobre 5 en Google. Ver las opiniones en Google Maps">
                        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span data-google-rating class="text-sm font-bold text-brand-gray-dark">${rating}</span>
                        <!-- La primera estrella acompaña siempre al ${rating}; las otras cuatro compiten por el ancho en móvil. -->
                        <span class="flex gap-0.5 text-yellow-400">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><use href="#star-icon"/></svg>
                            <svg class="hidden md:block w-4 h-4 fill-current" viewBox="0 0 20 20"><use href="#star-icon"/></svg>
                            <svg class="hidden md:block w-4 h-4 fill-current" viewBox="0 0 20 20"><use href="#star-icon"/></svg>
                            <svg class="hidden md:block w-4 h-4 fill-current" viewBox="0 0 20 20"><use href="#star-icon"/></svg>
                            <svg class="hidden md:block w-4 h-4 fill-current" viewBox="0 0 20 20"><use href="#star-icon"/></svg>
                        </span>
                        <span class="text-brand-gray-dark/80 text-xs font-medium whitespace-nowrap">(${count} opiniones en Google)</span>
                    </a>` : '';

    // `StoreBadge` lo hidrata en runtime; `App.js` ya lo instancia en las 47 páginas y
    // hoy es un no-op donde falta este contenedor. La llamada a Places va cacheada en
    // localStorage 12 h, así que extenderlo no multiplica las peticiones.
    const statusBadge = status
        ? `\n                    <div id="business-status-root" class="absolute ${statusTop} left-[10%] md:left-auto md:right-[8%] lg:right-[12%] z-20 animate-fade-in-up delay-100"></div>`
        : '';

    return `${ratingBadge}${statusBadge}`;
}
