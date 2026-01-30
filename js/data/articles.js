/**
 * @typedef {Object} Article
 * @property {string} id - Identificador único del artículo.
 * @property {string} date - Fecha legible.
 * @property {string} isoDate - Fecha en formato ISO (YYYY-MM-DD).
 * @property {string} category - Categoría visible.
 * @property {string} title - Título del artículo.
 * @property {string} description - Descripción breve.
 * @property {string} image - Ruta de la imagen destacada.
 * @property {string} alt - Texto alternativo de la imagen.
 * @property {string} link - URL del artículo.
 * @property {boolean} [featured] - Si el artículo debe destacarse.
 */

/**
 * Lista de artículos del blog.
 * Fuente de verdad para el índice del blog y SSG.
 * @type {Article[]}
 */
const articles = [
    {
        id: 'choque-termico-cabello-viajes-tierra-caliente',
        date: '30 de enero de 2026',
        isoDate: '2026-01-30',
        category: 'Cuidado capilar',
        title: 'Choque térmico: protege tu cabello en tus viajes | Narbo\'s',
        description: 'Aprende a proteger tu cabello del choque térmico al viajar de la Sabana a Tierra Caliente. Rutina experta para evitar el daño por sol y cloro.',
        image: 'articles/images/choque-termico-cabello.webp',
        alt: 'Protección capilar para viajes entre climas de la Sabana y Tierra Caliente',
        link: '/blog/articles/choque-termico-cabello-viajes-tierra-caliente.html',
        featured: true
    },
    {
        id: 'tendencias-cabello-2026',
        date: '26 de diciembre de 2025',
        isoDate: '2025-12-26',
        category: 'Tendencias',
        title: 'Tendencias de cabello 2026 en Chía: cortes, color y estilo',
        description: 'Descubre las tendencias de cabello 2026: Lujo silencioso, Rich Hair y el regreso del volumen. ¡Agenda tu cita en Narbo\'s Salón Spa y adelántate al estilo!',
        image: 'articles/images/balayage-honey-glow-tendencia-2026-chia-narbos.webp',
        alt: 'Tendencias de cabello 2026: Cortes, color y estilo en Narbo\'s Salón Spa',
        link: '/blog/articles/tendencias-cabello-2026.html'
    },
    {
        id: 'tendencias-diciembre-2025',
        date: '10 Diciembre 2025',
        isoDate: '2025-12-10',
        category: 'Belleza y tendencias',
        title: 'Brilla esta Navidad: tendencias de belleza para cerrar el año en Chía',
        description: 'Descubre las últimas tendencias en balayage, uñas y spa para lucir espectacular en las celebraciones de fin de año en Narbo\'s Salón Spa.',
        image: 'articles/images/foto-collage-narbos-salon-spa.webp',
        alt: 'Tendencias de belleza para fin de año en Chía',
        link: '/blog/articles/tendencias-diciembre-2025.html',
        featured: true
    },
    {
        id: 'cuidado-del-balayage',
        date: '29 de Noviembre, 2025',
        isoDate: '2025-11-29',
        category: 'Cuidado capilar',
        title: 'Guía definitiva para el cuidado del balayage: mantén tu color radiante ✨',
        description: 'Tu balayage es una inversión en tu estilo. Aprende a protegerlo con los productos y rutinas correctas para que luzca espectacular por más tiempo en el clima único de Chía.',
        image: 'articles/images/imagen-articulo-balayage.webp',
        alt: 'Resultados profesionales de balayage en Narbo\'s Salón Spa',
        link: '/blog/articles/cuidado-del-balayage.html'
    },
    {
        id: 'salon-belleza-chia-cajica',
        date: '11 de Noviembre, 2025',
        isoDate: '2025-11-11',
        category: 'Belleza y bienestar',
        title: 'Narbo’s Salón Spa: tu epicentro de belleza en Chía, a un paso de Cajicá 🌟',
        description: 'Descubre por qué Narbo\'s es la mejor opción para tus necesidades de belleza en la Sabana de Bogotá. Ubicación estratégica, parqueadero gratis y todos los servicios en un solo lugar.',
        image: '/images/blog/foto_fachada.webp',
        alt: 'Salón de belleza y spa en Chía, cerca de Cajicá',
        link: '/blog/articles/salon-de-belleza-y-spa-en-chia-cerca-de-cajica.html'
    },
    {
        id: 'tratamientos-capilares-clima-chia',
        date: '20 de Octubre, 2025',
        isoDate: '2025-10-20',
        category: 'Cuidado capilar',
        title: 'Los 5 tratamientos capilares imprescindibles para el clima de Chía',
        description: 'Vivir en la Sabana de Bogotá tiene su encanto, pero el clima puede ser un desafío para tu cabello. Descubre los tratamientos esenciales que ofrecemos en Narbo\'s para mantenerlo radiante.',
        image: '/blog/articles/images/image_blog_1.webp',
        alt: 'Tratamientos capilares para el clima de Chía',
        link: '/blog/articles/tratamientos-capilares-clima-chia.html'
    }
];

export default Object.freeze(articles);
