/**
 * @typedef {Object} TreatmentStyle
 * @property {string} title - Título del tratamiento.
 * @property {string} description - Descripción del servicio.
 * @property {string} link - URL de la imagen grande (lightbox).
 * @property {string} image - URL de la imagen miniatura (card).
 * @property {'standard'|'overlay'} [variant] - Estilo de visualización.
 */

/**
 * Catálogo de tratamientos capilares y recuperación.
 * @type {TreatmentStyle[]}
 */
export const treatmentStyles = Object.freeze([
    {
        title: "Keratina & Alisados",
        description: "Alisado progresivo que elimina el frizz, reduce volumen y aporta brillo espejo.",
        link: "../../images/peluqueria/foto_5_peluqueria.webp",
        image: "../../images/peluqueria/foto_5_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Botox Capilar",
        description: "Rejuvenecimiento profundo para cabellos desgastados. Rellena la fibra y devuelve la suavidad.",
        link: "../../images/peluqueria/foto_7_peluqueria.webp", 
        image: "../../images/peluqueria/foto_7_peluqueria.webp",
        variant: "standard"
    },
    {
        title: "Hidratación Profunda",
        description: "Cocktail de nutrientes para cabellos secos y sin vida. Recupera la elasticidad natural.",
        link: "../../images/peluqueria/foto_3_peluqueria.webp",
        image: "../../images/peluqueria/foto_3_peluqueria.webp",
        variant: "standard"
    }
]);
