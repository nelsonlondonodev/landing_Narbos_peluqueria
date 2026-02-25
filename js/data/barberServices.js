import { masterPrices } from './masterPrices.js';

/**
 * @typedef {Object} BarberService
 * @property {string} title - Título del servicio.
 * @property {string} description - Descripción breve.
 * @property {string} link - Enlace a la sección o página del servicio.
 * @property {string} image - Ruta de la imagen ilustrativa.
 * @property {'standard'|'overlay'} [variant] - Variante visual de la tarjeta.
 */

/**
 * Lista de servicios de barbería disponibles.
 * Usado para generar grids dinámicos.
 * @type {BarberService[]}
 */
export const barberServices = Object.freeze([
    {
        id: 'corte-cabello',
        title: "Corte de Cabello",
        description: "Asesoría de imagen y corte (clásico o fade) con lavado y peinado.",
        price: masterPrices.barber.corte || '$35.000', // Fallback if not in masterPrices
        link: "servicios/barberia/barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/barber-hero.webp",
        variant: "standard"
    },
    {
        id: 'corte-barba',
        title: "Corte + Barba (Ritual)",
        description: "La experiencia completa: Corte de cabello y perfilado de barba con toalla caliente.",
        price: masterPrices.barber.corteBarba,
        link: "servicios/barberia/barberia-cortes-hombre.html",
        image: "../../images/brand/logo_narbos.webp",
        variant: "logo"
    },
    {
        id: 'arreglo-barba',
        title: "Arreglo de Barba",
        description: "Perfilado con navaja, hidratación y ritual de toalla caliente.",
        price: '$45.000', // Estimated
        link: "servicios/barberia/barberia-cortes-hombre.html",
        image: "../../images/brand/logo_narbos.webp",
        variant: "logo" // Changed to logo variant for dark placeholder
    },
    {
        id: 'camuflaje-canas',
        title: "Camuflaje de Canas",
        description: "Matización sutil de canas para un look rejuvenecido y natural.",
        price: '$50.000', // Estimated
        link: "servicios/barberia/barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/barber-hero.webp",
        variant: "standard"
    },
    {
        id: 'barberia-infantil',
        title: "Barbería Infantil",
        description: "Cortes modernos y clásicos para niños con paciencia y estilo.",
        price: '$30.000', // Estimated
        link: "servicios/barberia/barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/barber-hero.webp",
        variant: "standard"
    }
]);
