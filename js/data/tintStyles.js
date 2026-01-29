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
        link: "../../images/pages/peluqueria/tinte-completo-rubio-dorado.jpg",
        image: "../../images/pages/peluqueria/tinte-completo-rubio-dorado.jpg",
        variant: "standard"
    },
    {
        title: "Retoque de Raíz",
        description: "Mantén tu color perfecto retocando el crecimiento en la zona de la raíz.",
        link: "../../images/pages/peluqueria/retoque-de-raiz-tinte.jpg", 
        image: "../../images/pages/peluqueria/retoque-de-raiz-tinte.jpg",
        variant: "standard"
    },
    {
        title: "Cubrimiento de Canas",
        description: "Fórmulas especiales para garantizar un cubrimiento 100% de canas con un acabado natural.",
        link: "../../images/pages/peluqueria/cubrimiento-de-canas-natural.jpg", 
        image: "../../images/pages/peluqueria/cubrimiento-de-canas-natural.jpg",
        variant: "standard"
    }
]);
