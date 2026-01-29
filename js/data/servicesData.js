/**
 * @typedef {Object} MainService
 * @property {string} title - Título del servicio.
 * @property {string} i18nTitle - Clave i18n para el título.
 * @property {string} description - Descripción corta.
 * @property {string} i18nDesc - Clave i18n para la descripción.
 * @property {string} icon - SVG string del icono.
 * @property {string} link - URL destino.
 * @property {string} image - Ruta de imagen (placeholder).
 * @property {string} animationDelay - Retardo de animación CSS.
 */

/**
 * Servicios principales mostrados en la página de Inicio.
 * @type {MainService[]}
 */
export const servicesData = Object.freeze([
    {
        title: "Peluquería",
        i18nTitle: "service.hair.title",
        description: "Expertos en color, balayage, cortes, keratinas y tratamientos capilares con las mejores marcas profesionales.",
        i18nDesc: "service.hair.desc",
        icon: '<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>',
        link: "/servicios/peluqueria/index.html",
        image: "images/pages/peluqueria/balayage_rubio_perfecto_despueschia-narbos.webp",
        animationDelay: "0s"
    },
    {
        title: "Uñas",
        i18nTitle: "service.nails.title",
        description: "Manicure y pedicure spa, esmaltado semipermanente, uñas en gel y acrílicas con diseños exclusivos.",
        i18nDesc: "service.nails.desc",
        icon: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/>',
        link: "/servicios/unas-spa/index.html",
        image: "images/pages/unas/manicure-spa.webp",
        animationDelay: "0.2s"
    },
    {
        title: "Estética",
        i18nTitle: "service.spa.title",
        description: "Faciales profundos, masajes relajantes, drenaje linfático y tratamientos corporales de bienestar.",
        i18nDesc: "service.spa.desc",
        icon: '<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15"/>',
        link: "/servicios/estetica/index.html",
        image: "images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia.%20copy%20Large.webp",
        animationDelay: "0.4s"
    },
    {
        title: "Barbería",
        i18nTitle: "service.barber.title",
        description: "Cortes clásicos y modernos, arreglo de barba, ritual de toalla caliente y cuidado masculino.",
        i18nDesc: "service.barber.desc",
        icon: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M7 8l10 5M7 13l10 5M7 18l6 3M11 3l6 3"/>',
        link: "/servicios/barberia/index.html",
        image: "images/pages/barberia/barber-hero.webp",
        animationDelay: "0.6s"
    }
]);
