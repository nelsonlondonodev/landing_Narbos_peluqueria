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
        image: "images/peluqueria/foto_6_peluqueria.webp",
        animationDelay: "0s"
    },
    {
        title: "Uñas",
        i18nTitle: "service.nails.title",
        description: "Manicure y pedicure spa, esmaltado semipermanente, uñas en gel y acrílicas con diseños exclusivos.",
        i18nDesc: "service.nails.desc",
        icon: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/>',
        link: "/servicios/unas-spa/index.html",
        image: "images/unas-manicure-pedicure/foto_unas_1.webp",
        animationDelay: "0.2s"
    },
    {
        title: "Estética",
        i18nTitle: "service.spa.title",
        description: "Faciales profundos, masajes relajantes, drenaje linfático y tratamientos corporales de bienestar.",
        i18nDesc: "service.spa.desc",
        icon: '<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15"/>',
        link: "/servicios/estetica/index.html",
        image: "images/spa-y-estetica/foto_estetica_1.webp",
        animationDelay: "0.4s"
    },
    {
        title: "Barbería",
        i18nTitle: "service.barber.title",
        description: "Cortes clásicos y modernos, arreglo de barba, ritual de toalla caliente y cuidado masculino.",
        i18nDesc: "service.barber.desc",
        icon: '<path d="M7 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/><path d="M9 3v18"/><path d="M15 3v18"/>',
        link: "/servicios/barberia/index.html",
        image: "images/peluqueria/foto_3_peluqueria.webp",
        animationDelay: "0.6s"
    }
]);
