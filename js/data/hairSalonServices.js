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
        title: "Cortes y estilo",
        description: "Diseños personalizados para dama y asesoría de imagen.",
        link: "/servicios/peluqueria/cortes-de-pelo-en-chia.html",
        image: "/images/peluqueria/foto_6_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Barbería",
        description: "Cortes masculinos modernos, barbas y ritual de toalla.",
        link: "/servicios/barberia/barberia-cortes-hombre.html",
        image: "/images/peluqueria/foto_8_peluqueria.webp", // Provisional (es de pestañas pero sirve por tono oscuro hasta tener foto real) o usamos foto_3
        variant: "standard"
    },
    {
        title: "Color y balayage",
        description: "Expertos en rubios, corrección de color y técnicas avanzadas.",
        link: "/servicios/peluqueria/balayage-mechas-chia.html",
        image: "/images/peluqueria/foto_4_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Salud capilar",
        description: "Recuperación profunda, keratinas y botox capilar.",
        link: "/servicios/peluqueria/tratamientos-capilares-chia.html",
        image: "/images/peluqueria/foto_5_peluqueria.webp",
        variant: "standard"
    }
]);
