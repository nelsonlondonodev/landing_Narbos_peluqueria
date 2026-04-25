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
export const getMenuCategories = () => [
    {
        title: "Peluquería",
        link: "servicios/peluqueria/",
        items: [
            { label: "Corte Dama", link: "servicios/peluqueria/cortes-de-pelo" },
            { label: "Balayage y Mechas", link: "servicios/peluqueria/balayage-mechas" },
            { label: "Color y Tinturas", link: "servicios/peluqueria/color-tinturas-cabello" },
            { label: "Tratamientos", link: "servicios/peluqueria/tratamientos-capilares" }
        ]
    },
    {
        title: "Uñas",
        link: "servicios/unas-spa/",
        items: [
            { label: "Acrílicas y Gel", link: "servicios/unas-spa/unas-acrilicas-gel" },
            { label: "Manicure y Pedicure", link: "servicios/unas-spa/manicure-pedicure" }
        ]
    },
    {
        title: "Estética",
        link: "servicios/estetica/",
        items: [
            { label: "Spa Facial", link: "servicios/estetica/spa-facial-integral" },
            { label: "Masajes Relajantes", link: "servicios/estetica/masajes-relajantes" },
            { label: "Cejas y Pestañas", link: "servicios/estetica/cejas-y-pestanas" },
            { label: "Depilación Corporal", link: "servicios/estetica/depilacion-corporal" }
        ]
    },
    {
        title: "Maquillaje",
        link: "servicios/maquillaje/",
        items: [
            { label: "Todo en Maquillaje", link: "servicios/maquillaje/" }
        ]
    },
    {
        title: "Barbería",
        link: "servicios/barberia/",
        items: [
            { label: "Corte y Barba", link: "servicios/barberia/barberia-cortes-hombre" }
        ]
    }
];
