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
        link: `${basePath}servicios/peluqueria/index.html`,
        items: [
            { label: "Corte Dama", link: `${basePath}servicios/peluqueria/cortes-de-pelo-en-chia.html` },
            { label: "Balayage y Mechas", link: `${basePath}servicios/peluqueria/balayage-mechas-chia.html` },
            { label: "Color y Tinturas", link: `${basePath}servicios/peluqueria/color-tinturas-cabello.html` },
            { label: "Tratamientos", link: `${basePath}servicios/peluqueria/tratamientos-capilares-chia.html` }
        ]
    },
    {
        title: "Uñas",
        link: `${basePath}servicios/unas-spa/index.html`,
        items: [
            { label: "Acrílicas y Gel", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html` },
            { label: "Diseño y Nail Art", link: `${basePath}servicios/unas-spa/diseno-de-unas-nail-art.html` },
            { label: "Manicure Spa", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html#manicure` },
            { label: "Pedicure Spa", link: `${basePath}servicios/unas-spa/unas-acrilicas-gel-chia.html#pedicure` }
        ]
    },
    {
        title: "Estética",
        link: `${basePath}servicios/estetica/index.html`,
        items: [
            { label: "Spa Facial", link: `${basePath}servicios/estetica/spa-facial-integral.html` },
            { label: "Limpieza Facial", link: `${basePath}servicios/estetica/limpieza-facial.html` },
            { label: "Masajes Relajantes", link: `${basePath}servicios/estetica/masajes-relajantes.html` },
            { label: "Cejas y Pestañas", link: `${basePath}servicios/estetica/cejas-y-pestanas.html` },
            { label: "Depilación", link: `${basePath}servicios/depilacion/index.html` }
        ]
    },
    {
        title: "Barbería",
        link: `${basePath}servicios/barberia/index.html`,
        items: [
            { label: "Corte y Barba", link: `${basePath}servicios/barberia/barberia-cortes-hombre.html` }
        ]
    }
];
