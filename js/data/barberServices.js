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
        title: "Corte y Barba",
        description: "Servicio completo: corte de cabello + perfilado de barba con ritual de toalla caliente.",
        price: masterPrices.barber.corteBarba,
        link: "barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/barber-hero.webp",
        variant: "standard"
    },
    {
        title: "Arreglo de barba",
        description: "Perfilado con navaja, hidratación y ritual de toalla caliente.",
        link: "#open-modal-beard",
        image: "images/brand/logo_narbos.webp",
        variant: "logo"
    }
]);
