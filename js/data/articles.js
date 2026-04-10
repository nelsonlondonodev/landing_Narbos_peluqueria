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
        id: 'guia-cuidado-capilar-sabana-viento-casco-frio',
        date: '10 de abril de 2026',
        isoDate: '2026-04-10',
        category: 'Cuidado Capilar',
        title: 'Viento, casco y frío: el reto del cuidado capilar en la Sabana',
        description: 'Vivir o desplazarse por la Sabana de Bogotá implica enfrentar desafíos climáticos únicos. Guía técnica de supervivencia capilar para el viento y el frío.',
        image: '/images/pages/peluqueria/narbos-salon-spa-chia-peinado-tendencia-trenzas-laterales-ondas-sueltas-large.webp',
        alt: 'Cuidado capilar y peinados resistentes al viento en la Sabana de Bogotá',
        link: '/blog/articles/guia-cuidado-capilar-sabana-viento-casco-frio.html',
        featured: true
    },
    {
        id: 'cabello-sabana-rubios-caida-estacional',
        date: '30 de marzo de 2026',
        isoDate: '2026-03-30',
        category: 'Cuidado capilar',
        title: 'Cabello en la Sabana: rubios y caída estacional',
        description: "¿Por qué el rubio se oxida en Chía? ¿Es normal la caída del cabello en Bogotá? Descubre la realidad del cuidado capilar en la altura con Narbo's Salón.",
        image: '/images/pages/peluqueria/corte-de-cabello-color-en-chia.webp',
        alt: 'Tratamiento y prevención de oxidación para cabellos rubios o tinturados en el clima de la Sabana de Bogotá',
        link: '/blog/articles/cabello-sabana-rubios-caida-estacional.html',
        featured: true
    },
    {
        id: 'mitos-capilares-keratina-champu-sin-sal-agua-sabana',
        date: '18 de marzo de 2026',
        isoDate: '2026-03-18',
        category: 'Cuidado capilar',
        title: 'Mitos: keratinas, champú sin sal y agua de la Sabana',
        description: 'Análisis objetivo sobre alisados, champú sin sal y el impacto del agua dura de Chía en tu cabello. Información técnica por expertos de Narbo\'s Salón Spa.',
        image: '/images/pages/peluqueria/lavado-cabello-spa-capilar-narbos-salon-chia.webp',
        alt: 'Lavado profesional y spa capilar en Narbo\'s Salón Spa Chía, ideal para tratar el impacto del agua dura y minerales de la Sabana',
        link: '/blog/articles/mitos-capilares-keratina-champu-sin-sal-agua-sabana.html',
        featured: true
    },
    {
        id: 'balayage-correccion-color-chia',
        date: '10 de marzo de 2026',
        isoDate: '2026-03-10',
        category: 'Balayage y Color',
        title: 'Balayage y Corrección de Color en Chía: Transformaciones Reales',
        description: 'Descubre increíbles antes y después de Balayage y corrección de color en Chía. Resultados reales por expertos en Narbo\'s Salón Spa. ¡Agenda tu diagnóstico!',
        image: '/blog/articles/images/balayage-correccion-narbos.webp',
        alt: 'Transformación real de balayage y corrección de color en las instalaciones de Narbo\'s Salón Spa Chía',
        link: '/blog/articles/balayage-correccion-color-chia.html',
        featured: true
    },
    {
        id: 'guia-novias-belleza-perfecta-chia',
        date: '28 de febrero de 2026',
        isoDate: '2026-02-28',
        category: 'Novias y Eventos',
        title: 'Maquillaje en Chía para Novias: Cronograma de Belleza',
        description: '¿Te casas? Descubre el cronograma definitivo de belleza para novias. El mejor maquillaje en Chía, spa y peinados tendencia en Narbo\'s Salón Spa.',
        image: '/blog/articles/images/maquillaje-novias-cronograma-belleza-narbos.webp',
        alt: 'maquillaje-de-novia-profesional-en-chia-narbon-salon',
        link: '/blog/articles/guia-novias-belleza-perfecta-chia.html'
    },
    {
        id: 'cortar-cabello-crecimiento-rapido-mitos-chia',
        date: '10 de febrero de 2026',
        isoDate: '2026-02-10',
        category: 'Cuidado Capilar',
        title: '¿Cortar el cabello hace que crezca más rápido? La verdad detrás de las tijeras en Chía',
        description: 'Descubre si cortar el cabello realmente acelera su crecimiento. Mitos, realidades y consejos expertos para cuidar tu melena en el clima de Chía.',
        image: '/images/pages/peluqueria/cortes-de-pelo-profesionales-chia.webp',
        alt: 'Diseño de corte profesional para dama realizado en Narbo\'s Salón Spa Chía',
        link: '/blog/articles/cortar-cabello-crecimiento-rapido-mitos-chia.html'
    },
    {
        id: 'choque-termico-cabello-viajes-tierra-caliente',
        date: '30 de enero de 2026',
        isoDate: '2026-01-30',
        category: 'Cuidado capilar',
        title: 'Choque térmico: protege tu cabello en tus viajes | Narbo\'s',
        description: 'Protege tu cabello del choque térmico al viajar con consejos de Narbo\'s Salón Spa. Evita el daño por sol y cloro y mantén tu brillo ideal.',
        image: '/blog/articles/images/choque-termico-moroccanoil.webp',
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
        image: '/blog/articles/images/balayage-honey-glow-tendencia-2026-chia-narbos.webp',
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
        image: '/blog/articles/images/foto-collage-narbos-salon-spa.webp',
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
        image: '/blog/articles/images/imagen-articulo-balayage.webp',
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
    },
    {
        id: 'guia-relajacion-masajes-spa-chia-cajica',
        date: '18 de febrero de 2026',
        isoDate: '2026-02-18',
        category: 'Bienestar y spa',
        title: 'Guía de relajación: los mejores masajes y servicios de spa en Chía y Cajicá',
        description: 'Relájate con los mejores masajes y spa en Chía y Cajicá. Narbo\'s Salon: bienestar experto y relajación total. ¡Agenda tu cita hoy!',
        image: '/images/pages/estetica/masaje-relajante-piedras-calientes-spa-chia.webp',
        alt: 'Masaje relajante con piedras calientes en Narbo\'s Salon Spa Chía',
        link: '/blog/articles/guia-relajacion-masajes-spa-chia-cajica.html'
    }
];

export default Object.freeze(articles);
