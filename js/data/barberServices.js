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
        title: "Corte Caballero",
        description: "Cortes clásicos, degradados (fade) y las últimas tendencias, adaptados a tu facciones.",
        link: "barberia-cortes-hombre.html",
        image: "../../images/pages/barberia/corte-caballero.webp",
        variant: "standard"
    },
    {
        title: "Arreglo de Barba",
        description: "Perfilado con navaja, hidratación y ritual de toalla caliente para una experiencia relajante.",
        link: "#open-modal-beard",
        image: "../../images/pages/peluqueria/estilismo-barba.webp",
        variant: "standard"
    }
]);
