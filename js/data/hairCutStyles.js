/**
 * @typedef {Object} HairCutStyle
 * @property {string} title - Título del corte.
 * @property {string} description - Descripción del estilo.
 * @property {string} link - URL de la imagen grande para el lightbox.
 * @property {string} image - URL de la imagen en miniatura (card).
 * @property {'standard'|'overlay'} [variant] - Variante de visualización.
 */

/**
 * Catálogo de estilos de corte para la página de Cortes.
 * @type {HairCutStyle[]}
 */
export const hairCutStyles = Object.freeze([
    {
        title: "Corte Bob & Long Bob",
        description: "Versatilidad y elegancia. Ideal para dar volumen y enmarcar el rostro con un estilo atemporal.",
        link: "../../images/peluqueria/foto_3_peluqueria.webp", // Enlace a la imagen grande
        image: "../../images/peluqueria/foto_3_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Capas y Movimiento",
        description: "Textura y ligereza. Perfecto para melenas largas que buscan dinamismo sin perder longitud.",
        link: "../../images/peluqueria/foto_7_peluqueria.webp",
        image: "../../images/peluqueria/foto_7_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Corte Pixie & Cortos",
        description: "Audacia y sofisticación. Resalta tus facciones y cuello con un estilo moderno y fácil de llevar.",
        link: "../../images/peluqueria/foto_6_peluqueria.webp",
        image: "../../images/peluqueria/foto_6_peluqueria.webp",
        variant: "standard"
    }
]);
