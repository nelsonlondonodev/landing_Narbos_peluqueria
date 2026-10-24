/**
 * @typedef {Object} HeroProps
 * @property {string} title - H1. Admite HTML para el tramo en verde.
 * @property {string} subtitle - Línea de apoyo bajo el H1.
 * @property {string} imageSrc - Foto, ya resuelta para la página.
 * @property {string} [imageSrcMobile] - Variante ligera para pantallas de hasta 768 px.
 * @property {string} imageAlt
 * @property {string} [eyebrow] - Frase corta sobre el H1 («Peluquería · Chía»).
 * @property {string} [ctaMessage] - Mensaje precargado del botón de WhatsApp. Nombra la
 *   página para que la conversación llegue atribuida.
 */

const DEFAULT_CTA_MESSAGE = "Hola, vengo de la web de Narbo's y quiero agendar una cita";

/**
 * Hero editorial de las páginas interiores: el mismo lenguaje que la home (frase de
 * categoría, H1 a dos tonos, llamada a la acción y badges en línea) con una sola foto
 * en lugar del mosaico, que queda como pieza propia de la home.
 *
 * Lo pinta el SSG en dist (y `App.mountHero` en desarrollo). El SSG cuelga después los
 * badges de confianza en `data-hero-badges` y completa el enlace de WhatsApp a partir de
 * `data-whatsapp-message`; en el HTML basta el número, que funciona aunque eso no corra.
 *
 * @param {HeroProps} props
 * @returns {string} HTML del `<section id="inicio">`.
 */
export const getHeroHTML = ({ title, subtitle, imageSrc, imageSrcMobile, imageAlt, eyebrow, ctaMessage = DEFAULT_CTA_MESSAGE }) => `
    <section id="inicio" class="relative bg-brand-light/30">
        <div class="container mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-10 md:grid-cols-[1.05fr_1fr] md:py-14 lg:gap-14 lg:py-16">
            <div class="max-w-xl">
                ${eyebrow ? `<p class="hero-rise text-xs font-semibold uppercase tracking-[0.3em] text-brand-green md:text-sm">${eyebrow}</p>` : ''}
                <h1 id="hero-title" class="hero-rise [--d:0.05s] ${eyebrow ? 'mt-4' : ''} font-serif text-[2.1rem] font-bold leading-[1.1] text-brand-gray-dark sm:text-5xl lg:text-[3.6rem]">${title}</h1>
                <p id="hero-subtitle" class="hero-rise [--d:0.1s] mt-5 max-w-md text-lg text-brand-gray-dark/75">${subtitle}</p>
                <div class="hero-rise [--d:0.15s] mt-8">
                    <a href="https://wa.me/573123462618" data-whatsapp-message="${ctaMessage}" target="_blank" rel="noopener" class="group inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-green/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gray-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                        Agenda tu cita
                        <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/></svg>
                    </a>
                </div>
                <!-- relative z-20: la animación deja un transform (contexto de apilamiento) y,
                     sin z, el desplegable de horarios quedaba bajo la sección siguiente. -->
                <div data-hero-badges class="hero-rise [--d:0.2s] relative z-20 mt-8 flex flex-wrap items-center gap-3"></div>
            </div>
            ${renderHeroImage(imageSrc, imageSrcMobile, imageAlt)}
        </div>
    </section>
`;

/**
 * La foto, candidata a LCP: prioridad alta. El tamaño lo fija la proporción del
 * contenedor, así que no mueve el layout aunque cada página traiga una foto distinta.
 */
function renderHeroImage(src, srcMobile, alt) {
    const img = `<img src="${src}" alt="${alt}" class="h-full w-full object-cover" loading="eager" fetchpriority="high" decoding="async">`;
    const picture = srcMobile
        ? `<picture><source media="(max-width: 768px)" srcset="${srcMobile}">${img}</picture>`
        : img;

    return `
            <div class="hero-rise [--d:0.1s] relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-28px_rgb(54_64_65/0.45)] md:aspect-[5/4]">
                ${picture}
            </div>`;
}
