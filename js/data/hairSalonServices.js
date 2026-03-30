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
        title: "Corte dama",
        description: "Diseños personalizados, puntas perfectas y cambios de look completos.",
        link: "/servicios/peluqueria/cortes-de-pelo",
        image: "/images/pages/peluqueria/corte-cabello-dama-salon-belleza-chia-narbos.webp",
        variant: "standard"
    },
    {
        title: "Balayage y mechas",
        description: "Iluminaciones perfectas, rubios soñados y técnicas de degradado.",
        link: "/servicios/peluqueria/balayage-mechas",
        image: "/images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos.webp",
        variant: "standard"
    },
    {
        title: "Color y tinturas",
        description: "Tintes completos, cubrimiento de canas y retoque de raíz profesional.",
        link: "/servicios/peluqueria/color-tinturas-cabello",
        image: "/images/pages/peluqueria/color-tratamiento.webp",
        variant: "standard"
    },
    {
        title: "Tratamientos",
        description: "Recuperación profunda, keratinas, cirugía capilar y botox.",
        link: "/servicios/peluqueria/tratamientos-capilares",
        image: "/images/pages/peluqueria/lavado-cabello-spa-capilar-narbos-salon-chia.webp",
        variant: "standard"
    }
]);
