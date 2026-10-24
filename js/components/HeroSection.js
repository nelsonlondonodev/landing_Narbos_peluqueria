import { getWhatsAppUrl } from '../config.js';
import { getHeroMosaicHTML } from './HeroMosaic.js';

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
 * @property {{ label: string, href: string }} [secondaryCta] - Enlace junto al botón.
 * @property {boolean} [mosaic=false] - La foto en mosaico, pieza propia de la home.
 * @property {number} [imageWidth] - Medidas intrínsecas de la foto, para el mosaico.
 * @property {number} [imageHeight]
 */

const DEFAULT_CTA_MESSAGE = "Hola, vengo de la web de Narbo's y quiero agendar una cita";

const ARROW_RIGHT = '<svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const ARROW_DOWN = '<svg class="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-6-6 6 6 6-6"/></svg>';

// Líneas curvas de fondo, como en la referencia del mosaico. Solo ellas se recortan: un
// overflow-hidden en la sección cortaba también el desplegable de horarios del badge.
const MOSAIC_DECOR = `
        <div class="pointer-events-none absolute inset-0 overflow-hidden max-md:hidden" aria-hidden="true">
            <svg class="absolute -right-24 top-6 h-[120%] w-[70%] text-brand-medium/50" viewBox="0 0 600 700" fill="none">
                <path d="M560 20C380 60 260 180 300 330s210 190 150 300S180 700 40 660" stroke="currentColor" stroke-width="2"/>
                <path d="M600 140C470 170 380 250 410 360s150 160 110 250" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        </div>`;

/**
 * Hero editorial de toda la web: frase de categoría, H1 a dos tonos, subtítulo,
 * «Agenda tu cita» por WhatsApp y los badges de confianza en línea; a la derecha la foto,
 * o el mosaico en la home. Lo pinta el SSG en dist (y `App.mountHero` en desarrollo), y
 * el SSG cuelga después los badges en `data-hero-badges`.
 *
 * @param {HeroProps} props
 * @returns {string} HTML del `<section id="inicio">`.
 */
export const getHeroHTML = ({
    title, subtitle, imageSrc, imageSrcMobile, imageAlt, eyebrow,
    ctaMessage = DEFAULT_CTA_MESSAGE, secondaryCta, mosaic = false, imageWidth, imageHeight
}) => `
    <section id="inicio" class="relative bg-brand-light/30">
        ${mosaic ? MOSAIC_DECOR : ''}
        <div class="container relative mx-auto grid max-w-screen-xl items-center gap-10 px-6 py-10 md:grid-cols-[1.05fr_1fr] md:py-12 lg:gap-16 lg:py-14">
            <div class="max-w-xl">
                ${eyebrow ? `<p class="hero-rise text-xs font-semibold uppercase tracking-[0.3em] text-brand-green md:text-sm">${eyebrow}</p>` : ''}
                <h1 id="hero-title" class="hero-rise [--d:0.05s] ${eyebrow ? 'mt-4' : ''} font-serif font-bold text-brand-gray-dark ${mosaic ? 'text-[2.3rem] leading-[1.08] sm:text-5xl lg:text-[4.25rem]' : 'text-[2.1rem] leading-[1.1] sm:text-5xl lg:text-[3.6rem]'}">${title}</h1>
                <p id="hero-subtitle" class="hero-rise [--d:0.1s] mt-5 max-w-md text-lg text-brand-gray-dark/75 ${mosaic ? 'md:text-xl' : ''}">${subtitle}</p>
                <div class="hero-rise [--d:0.15s] mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <a href="${getWhatsAppUrl(ctaMessage)}" target="_blank" rel="noopener" class="group inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-green/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gray-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                        Agenda tu cita
                        ${ARROW_RIGHT}
                    </a>
                    ${secondaryCta ? `
                    <a href="${secondaryCta.href}" class="group inline-flex items-center gap-2 font-semibold text-brand-gray-dark transition-colors hover:text-brand-green">
                        ${secondaryCta.label}
                        ${ARROW_DOWN}
                    </a>` : ''}
                </div>
                <!-- relative z-20: la animación deja un transform (contexto de apilamiento) y,
                     sin z, el desplegable de horarios quedaba bajo la sección siguiente. -->
                <div data-hero-badges class="hero-rise [--d:0.2s] relative z-20 mt-8 flex flex-wrap items-center gap-3"></div>
            </div>
            ${mosaic
                ? `<div class="hero-mosaic mx-auto aspect-square w-full max-w-[520px] md:mr-0">${getHeroMosaicHTML({ image: imageSrc, imageMobile: imageSrcMobile, alt: imageAlt, width: imageWidth, height: imageHeight })}</div>`
                : renderHeroImage(imageSrc, imageSrcMobile, imageAlt)}
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
