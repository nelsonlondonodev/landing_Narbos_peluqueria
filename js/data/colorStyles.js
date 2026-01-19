/**
 * @typedef {Object} ColorStyle
 * @property {string} title - Título de la técnica de color.
 * @property {string} description - Descripción del efecto.
 * @property {string} link - URL de la imagen grande (lightbox).
 * @property {string} image - URL de la imagen miniatura (card).
 * @property {'standard'|'overlay'} [variant] - Estilo de visualización.
 */

/**
 * Catálogo de técnicas de color y balayage.
 * @type {ColorStyle[]}
 */
export const colorStyles = Object.freeze([
    {
        title: "Balayage",
        description: "Degradado natural y luminoso. La técnica estrella para iluminar tu rostro con un efecto 'besado por el sol'.",
        link: "../../images/pages/peluqueria/mechas-balayage-detalle.webp",
        image: "../../images/pages/peluqueria/mechas-balayage-detalle.webp",
        variant: "standard"
    },
    {
        title: "Babylights & Mechas",
        description: "Reflejos finos y sutiles que aportan brillo y dimensión a tu cabello de manera delicada.",
        link: "../../images/pages/peluqueria/facial-limpieza.webp", // Provisional o usar una específica si la hay
        image: "../../images/pages/peluqueria/facial-limpieza.webp",
        variant: "standard"
    },
    {
        title: "Corrección de Color",
        description: "Expertos en arreglar tonos indeseados y devolver la salud y el color perfecto a tu melena.",
        link: "../../images/pages/peluqueria/color-tratamiento.webp",
        image: "../../images/pages/peluqueria/color-tratamiento.webp",
        variant: "standard"
    }
]);
