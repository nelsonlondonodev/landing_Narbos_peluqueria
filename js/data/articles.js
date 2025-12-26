/**
 * Lista de artículos del blog
 * Este archivo es la ÚNICA fuente de verdad para el índice del blog.
 */
const articles = [
    {
        id: 'tendencias-cabello-2026',
        date: '26 de diciembre de 2025',
        isoDate: '2025-12-26',
        category: 'Tendencias',
        title: '¡Adelántate al futuro! Las tendencias de cabello 2026 que transformarán tu look en Narbo\'s Salón Spa',
        description: 'Prepárate para el 2026 con las tendencias más innovadoras en cortes y coloración. Lujo silencioso y salud capilar absoluta.',
        image: 'articles/images/image_blog_1.webp', // Placeholder
        alt: '¡Adelántate al futuro! Las tendencias de cabello 2026 que transformarán tu look en Narbo\'s Salón Spa',
        link: '/blog/articles/tendencias-cabello-2026.html'
    },
    {
        id: 'tendencias-diciembre-2025',
        date: '10 Diciembre 2025',
        isoDate: '2025-12-10',
        category: 'Belleza y Tendencias',
        title: 'Brilla esta Navidad: Tendencias de Belleza para cerrar el año en Chía',
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
        category: 'Cuidado Capilar',
        categoryKey: 'article3_CardCategory',
        title: 'Guía Definitiva para el Cuidado del Balayage: Mantén tu Color Radiante ✨',
        titleKey: 'article3_CardTitle',
        description: 'Tu balayage es una inversión en tu estilo. Aprende a protegerlo con los productos y rutinas correctas para que luzca espectacular por más tiempo en el clima único de Chía.',
        descriptionKey: 'article3_CardDesc',
        image: 'articles/images/imagen-articulo-balayage.webp',
        alt: 'Resultados profesionales de balayage en Narbo\'s Salón Spa',
        link: '/blog/articles/cuidado-del-balayage.html'
    },
    {
        id: 'salon-belleza-chia-cajica',
        date: '11 de Noviembre, 2025',
        isoDate: '2025-11-11',
        category: 'Belleza y Bienestar',
        categoryKey: 'article2_CardCategory',
        title: 'Narbo’s Salón Spa: Tu Epicentro de Belleza en Chía, a un Paso de Cajicá 🌟',
        titleKey: 'article2_CardTitle',
        description: 'Descubre por qué Narbo\'s es la mejor opción para tus necesidades de belleza en la Sabana de Bogotá. Ubicación estratégica, parqueadero gratis y todos los servicios en un solo lugar.',
        descriptionKey: 'article2_CardDesc',
        image: '/images/blog/foto_fachada.webp',
        alt: 'Salón de belleza y spa en Chía, cerca de Cajicá',
        link: '/blog/articles/salon-de-belleza-y-spa-en-chia-cerca-de-cajica.html'
    },
    {
        id: 'tratamientos-capilares-clima-chia',
        date: '20 de Octubre, 2025',
        isoDate: '2025-10-20',
        category: 'Cuidado Capilar',
        categoryKey: 'article1Category',
        title: 'Los 5 Tratamientos Capilares Imprescindibles para el Clima de Chía',
        titleKey: 'article1Title',
        description: 'Vivir en la Sabana de Bogotá tiene su encanto, pero el clima puede ser un desafío para tu cabello. Descubre los tratamientos esenciales que ofrecemos en Narbo\'s para mantenerlo radiante.',
        descriptionKey: 'article1Desc',
        image: '/blog/articles/images/image_blog_1.webp',
        alt: 'Tratamientos capilares para el clima de Chía',
        link: '/blog/articles/tratamientos-capilares-clima-chia.html'
    }
];

module.exports = articles;
