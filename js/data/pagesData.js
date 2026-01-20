/**
 * @typedef {Object} HeroData
 * @property {string} title - Título H1 de la página.
 * @property {string} subtitle - Subtítulo descriptivo.
 * @property {string} imageSrc - Ruta de la imagen de fondo.
 * @property {string} imageAlt - Texto alternativo de la imagen.
 */

/**
 * @typedef {Object.<string, {hero: HeroData}>} PagesConfig
 */

/**
 * Configuración de contenido específico por página.
 * Utilizado por SSG (Node.js) y scripts del cliente.
 * @type {PagesConfig}
 */
export const pagesData = Object.freeze({
    'peluqueria': {
        hero: {
            title: "Peluquería en Chía: Expertos en estilo, color y bienestar",
            subtitle: "Expertos en realzar tu belleza con técnicas de vanguardia y productos de clase mundial.",
            imageSrc: "../../images/pages/peluqueria/estilismo-barba.webp",
            imageAlt: "Servicio de Peluquería profesional en Narbo's"
        }
    },
    barberia: {
         hero: {
            title: "Barbería exclusiva en Chía",
            subtitle: "El espacio que mereces para cuidar tu imagen.",
            imageSrc: "../../images/pages/barberia/barber-hero.jpg",
            imageAlt: "Servicios de barbería profesional en Chía"
        }
    },
    nosotros: {
        hero: {
           title: "Nuestra Historia",
           subtitle: "Pasión por la belleza y el bienestar desde 2013.",
           imageSrc: "", // En nosotros.html el hero actual es solo color de fondo con SVG, no tiene imagen. Se puede ajustar HeroSection.js para manejar esto o asignar una imagen nueva. Por ahora simularemos el comportamiento actual o se usará placeholder.
           // Nota: El Hero actual de nosotros.html NO tiene imagen de fondo, es un bg-brand-green sólido con un SVG.
           // El componente HeroSection.js probablemente espera una imagen.
           // Si asigno una imagen, cambiará el diseño. Si el usuario quiere el diseño actual (solo texto + color + svg), el componente HeroSection estándar QUIZÁS no sea 100% compatible sin modificarlo.
           // Sin embargo, el usuario pidió "traer el componente HeroSection".
           // Voy a definirlo aquí, pero tendré que ver cómo HeroSection maneja la falta de imagen o si debo añadir una.
           // Dado que el usuario dijo "traer los componentes", asumiré que quiere un Hero estándar con imagen, o adaptaré el Hero.
           // Voy a usar una imagen de placeholder coherente o vacía si el componente lo permite. 
           // Revisando el html actual, usa un bg color.
           // Asignaré null a imageSrc y validaré en el componente o usaré una imagen de equipo.
           imageSrc: "images/team/Team_1.webp", // Usaré la imagen del equipo como fondo temporalmente para probar el componente, o una textura.
           imageAlt: "Equipo de Narbo's Salon"
       }
   }
});
