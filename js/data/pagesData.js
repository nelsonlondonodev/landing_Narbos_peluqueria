/**
 * @typedef {Object} HeroData
 * @property {string} title - Título H1 de la página.
 * @property {string} subtitle - Subtítulo descriptivo.
 * @property {string} imageSrc - Ruta de la imagen de fondo.
 * @property {string} imageAlt - Texto alternativo de la imagen.
 */

/**
 * @typedef {Object.<string, {hero: HeroData}>} PagesConfig
 */

/**
 * Configuración de contenido específico por página.
 * Utilizado por SSG (Node.js) y scripts del cliente.
 * @type {PagesConfig}
 */
export const pagesData = Object.freeze({
    'peluqueria': {
        hero: {
            title: "Peluquería en Chía: Expertos en estilo, color y bienestar",
            subtitle: "Expertos en realzar tu belleza con técnicas de vanguardia y productos de clase mundial.",
            imageSrc: "../../images/pages/peluqueria/estilismo-barba.webp",
            imageAlt: "Servicio de Peluquería profesional en Narbo's"
        }
    },
    'barberia': {
         hero: {
            title: "Barbería exclusiva en Chía",
            subtitle: "El espacio que mereces para cuidar tu imagen.",
            imageSrc: "../../images/pages/barberia/barber-hero.jpg",
            imageAlt: "Servicios de barbería profesional en Chía"
        }
    }
});
