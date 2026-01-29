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
        title: "Corte caballero",
        description: "Cortes clásicos, degradados (fade) y las últimas tendencias, adaptados a tu facciones.",
        link: "barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/barber-hero.jpg",
        variant: "standard"
    },
    {
        title: "Arreglo de barba",
        description: "Perfilado con navaja, hidratación y ritual de toalla caliente para una experiencia relajante.",
        link: "#open-modal-beard",
        image: "images/brand/logo_narbos.webp",
        variant: "logo"
    }
]);
