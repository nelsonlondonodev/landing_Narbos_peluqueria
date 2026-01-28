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
        link: "../../images/pages/peluqueria/balayage_rubio_perfecto_despueschia-narbos.jpg",
        image: "../../images/pages/peluqueria/balayage_rubio_perfecto_despueschia-narbos.jpg",
        variant: "standard",
        // Array de imágenes extra para el carrusel (Antes/Después)
        galleryImages: [
            {
                src: "../../images/pages/peluqueria/correccion_color_antes_despues_chia.JPG",
                title: "Antes: Corrección de Color y Diagnóstico"
            }
        ]
    },
    {
        title: "Babylights & Mechas",
        description: "Reflejos finos y sutiles que aportan brillo y dimensión a tu cabello de manera delicada.",
        link: "../../images/pages/peluqueria/mechas-balayage-detalle.webp",
        image: "../../images/pages/peluqueria/mechas-balayage-detalle.webp",
        variant: "standard",
        galleryImages: [
            {
                src: "../../images/pages/peluqueria/balayage-rubio-iluminado-corte-capas-narbos-salon-spa-chia.JPG",
                title: "Resultado: Iluminación Natural"
            }
        ]
    },
    {
        title: "Corrección de Color",
        description: "Expertos en arreglar tonos indeseados y devolver la salud y el color perfecto a tu melena.",
        link: "../../images/pages/peluqueria/antes-y-despues-correccion.jpg",
        image: "../../images/pages/peluqueria/antes-y-despues-correccion.jpg",
        imageAlt: "Resultado final en Narbo’s Chía: Corrección de color exitosa",
        variant: "standard",
        galleryImages: [
            {
                src: "../../images/pages/peluqueria/antes-correccion.jpg",
                title: "Antes: Cabello Procesado y Dañado en Chía"
            }
        ]
    }
]);
