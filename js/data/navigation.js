/**
 * @typedef {Object} MenuItem
 * @property {string} label - Texto visible del enlace.
 * @property {string} link - URL destino.
 */

/**
 * @typedef {Object} MenuCategory
 * @property {string} title - Título de la categoría del menú.
 * @property {string} link - Enlace principal de la categoría.
 * @property {MenuItem[]} items - Elementos del submenú.
 */

/**
 * Genera la estructura de navegación del sitio.
 * @param {string} basePath - Ruta base para los assets y enlaces.
 * @returns {MenuCategory[]} Array de categorías y sus items.
 */
export const getMenuCategories = (basePath = './') => [
    {
        title: "Peluquería",
        link: `${basePath}servicios/peluqueria/`,
        items: [
            { label: "Corte Dama", link: `${basePath}servicios/peluqueria/cortes-de-pelo.html` },
            { label: "Balayage y Mechas", link: `${basePath}servicios/peluqueria/balayage-mechas.html` },
            { label: "Color y Tinturas", link: `${basePath}servicios/peluqueria/color-tinturas-cabello.html` },
            { label: "Tratamientos", link: `${basePath}servicios/peluqueria/tratamientos-capilares.html` }
        ]
    },
    {
        title: "Uñas",
        link: `${basePath}servicios/unas-spa/`,
        items: [
            { label: "Acrílicas y Gel", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel.html` },
            { label: "Manicure y Pedicure", link: `${basePath}servicios/unas-spa/manicure-pedicure.html` }
        ]
    },
    {
        title: "Estética",
        link: `${basePath}servicios/estetica/`,
        items: [
            { label: "Spa Facial", link: `${basePath}servicios/estetica/spa-facial-integral.html` },
            { label: "Masajes Relajantes", link: `${basePath}servicios/estetica/masajes-relajantes.html` },
            { label: "Cejas y Pestañas", link: `${basePath}servicios/estetica/cejas-y-pestanas.html` },
            { label: "Depilación Corporal", link: `${basePath}servicios/estetica/depilacion-corporal.html` }
        ]
    },
    {
        title: "Barbería",
        link: `${basePath}servicios/barberia/`,
        items: [
            { label: "Corte y Barba", link: `${basePath}servicios/barberia/barberia-cortes-hombre.html` }
        ]
    }
];
