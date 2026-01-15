/**
 * @typedef {Object} TintStyle
 * @property {string} title - Título del servicio de tinte.
 * @property {string} description - Descripción del servicio.
 * @property {string} link - URL de la imagen grande (lightbox).
 * @property {string} image - URL de la imagen miniatura (card).
 * @property {'standard'|'overlay'} [variant] - Estilo de visualización.
 */

/**
 * Catálogo de tinturas y coloración completa.
 * @type {TintStyle[]}
 */
export const tintStyles = Object.freeze([
    {
        title: "Tinte Completo",
        description: "Cobertura total de raíz a puntas con productos que cuidan la fibra capilar y aportan brillo intenso.",
        link: "../../images/peluqueria/foto_4_peluqueria.webp",
        image: "../../images/peluqueria/foto_4_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Retoque de Raíz",
        description: "Mantén tu color perfecto retocando el crecimiento en la zona de la raíz.",
        link: "../../images/peluqueria/foto_4_peluqueria.webp", // Podríamos usar otra si hubiera una específica de raíz
        image: "../../images/peluqueria/foto_4_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Cubrimiento de Canas",
        description: "Fórmulas especiales para garantizar un cubrimiento 100% de canas con un acabado natural.",
        link: "../../images/peluqueria/foto_7_peluqueria.webp", 
        image: "../../images/peluqueria/foto_7_peluqueria.webp",
        variant: "standard"
    }
]);
