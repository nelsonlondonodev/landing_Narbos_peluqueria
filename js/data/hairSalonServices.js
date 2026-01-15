/**
 * @typedef {Object} HairSalonService
 * @property {string} title - Título del servicio.
 * @property {string} description - Descripción breve.
 * @property {string} link - Ruta o URL destino.
 * @property {string} image - Ruta de la imagen.
 * @property {'standard'|'overlay'} [variant] - Variante de visualización.
 */

/**
 * Catálogo de servicios de peluquería principal.
 * @type {HairSalonService[]}
 */
export const hairSalonServices = Object.freeze([
    {
        title: "Corte Dama",
        description: "Diseños personalizados, puntas perfectas y cambios de look completos.",
        link: "/servicios/peluqueria/cortes-de-pelo-en-chia.html",
        image: "/images/peluqueria/foto_6_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Balayage y Mechas",
        description: "Iluminaciones perfectas, rubios soñados y técnicas de degradado.",
        link: "/servicios/peluqueria/balayage-mechas-chia.html",
        image: "/images/peluqueria/foto_3_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Color y Tinturas",
        description: "Tintes completos, cubrimiento de canas y retoque de raíz profesional.",
        link: "/servicios/peluqueria/color-tinturas-cabello.html",
        image: "/images/peluqueria/foto_4_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Tratamientos",
        description: "Recuperación profunda, keratinas, cirugía capilar y botox.",
        link: "/servicios/peluqueria/tratamientos-capilares-chia.html",
        image: "/images/peluqueria/foto_5_peluqueria.webp",
        variant: "standard"
    }
]);
