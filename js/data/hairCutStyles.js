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
        link: "../../images/pages/peluqueria/corte_bob_chia.jpeg", // Enlace a la imagen grande
        image: "../../images/pages/peluqueria/corte_bob_chia.jpeg",
        variant: "standard"
    },
    {
        title: "Capas y Movimiento",
        description: "Textura y ligereza. Perfecto para melenas largas que buscan dinamismo sin perder longitud.",
        link: "../../images/pages/peluqueria/corte_capas_chia.jpeg",
        image: "../../images/pages/peluqueria/corte_capas_chia.jpeg",
        variant: "standard"
    },
    {
        title: "Corte Pixie & Cortos",
        description: "Audacia y sofisticación. Resalta tus facciones y cuello con un estilo moderno y fácil de llevar.",
        link: "../../images/pages/peluqueria/corte-de-cabello-color-en-chia.webp",
        image: "../../images/pages/peluqueria/corte-de-cabello-color-en-chia.webp",
        variant: "standard"
    }
]);
