import { masterPrices } from './masterPrices.js';

export const nailsServices = [
    {
        id: 1,
        title: 'Manicura Tradicional',
        price: `Desde ${masterPrices.nails.manicura.tradicional}`,
        duration: '45 min',
        summary: 'Limpieza, cuidado de cutículas y esmaltado clásico para el día a día.',
        description: 'Nuestro servicio de manicura tradicional ofrece un cuidado esencial para tus manos. Incluye limpieza detallada, limado, tratamiento de cutículas y esmaltado con productos de alta calidad para un acabado pulcro y duradero.',
        image: '../../images/pages/unas/manicura-perfecta-tono-vino-elegante-narbos-salon-spa-chia.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 2,
        title: 'Manicura Semipermanente',
        price: `Desde ${masterPrices.nails.manicura.semipermanente}`,
        duration: '60 min',
        summary: 'Color vibrante y brillo espejo garantizado por hasta 21 días.',
        description: 'La solución perfecta para manos impecables por semanas. Usamos marcas líderes como Organic Nails y Masglo Gel Evolution. Incluye manicura en seco (rusa combinada), base protectora, color intenso y top coat de alto brillo curado en lámpara LED.',
        image: '../../images/pages/unas/manicure-ruso-detalle-perfecto-narbos.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 3,
        title: 'Pedicura Tradicional',
        price: masterPrices.nails.pedicura.tradicional,
        duration: '60 min',
        summary: 'Cuidado completo para pies: limpieza, exfoliación y esmaltado.',
        description: 'Relaja tus pies con nuestra pedicura tradicional. Incluye baño relajante, remoción de durezas, cuidado de uñas y cutículas, hidratación básica y esmaltado perfecto.',
        image: '../../images/pages/unas/pedicure-spa.webp',
        link: 'manicure-pedicure.html'
    },
     {
        id: 4,
        title: 'Pedicura Semipermanente',
        price: masterPrices.nails.pedicura.semipermanente,
        duration: '75 min',
        summary: 'Durabilidad extrema y brillo perfecto para tus pies.',
        description: 'Todo el cuidado de nuestra pedicura spa combinado con la durabilidad del esmaltado semipermanente. Olvídate de esperar a que se sequen las uñas y disfruta de pies perfectos inmediatamente.',
        image: '../../images/pages/unas/pedicure-spa-relax-experiencia-chia.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 5,
        title: 'Uñas Acrílicas / Polygel',
        price: `Desde ${masterPrices.nails.extensiones.poligel}`,
        duration: '120 min',
        summary: 'Extensiones esculpidas para longitud y resistencia superior.',
        description: 'Transforma tus manos con uñas esculpidas en Acrílico o Polygel. Creamos estructuras perfectas (Coffin, Stiletto, Almendra) con materiales de última generación. Incluye manicura completa y esmaltado semipermanente.',
        image: '../../images/pages/unas/unas-acrilicas-tendencia-2026-chia.webp',
        link: 'unas-acrilicas-gel.html'
    },
    {
        id: 6,
        title: 'Uñas Press On',
        price: masterPrices.nails.extensiones.pressOn,
        duration: '90 min',
        summary: 'Sistema rápido de extensión con acabado natural y aplicación semipermanente.',
        description: 'La alternativa ideal para lucir uñas largas al instante. Aplicación profesional de tips completos con sistema soft gel y acabado semipermanente incluido.',
        image: '../../images/pages/unas/diseno-unas-elegantes-chia-narbos-spa.webp',
        link: 'unas-acrilicas-gel.html'
    },
    {
        id: 7,
        title: 'Spa de Manos o Pies',
        price: `Adicional desde ${masterPrices.nails.manicura.spa}`,
        duration: '+20 min',
        summary: 'Exfoliación profunda, mascarilla e hidratación intensiva.',
        description: 'Eleva tu servicio con nuestro ritual spa. Añade exfoliación con sales minerales, mascarilla nutritiva y masaje extendido para una relajación total.',
        image: '../../images/pages/unas/manicure-spa.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 8,
        title: 'Diseños (Nail Art)',
        price: 'Desde $5.000',
        duration: '15+ min',
        summary: 'Personalización total: tendencias, mano alzada y decoración.',
        description: 'Personaliza tu manicura con Nail Art. Desde líneas minimalistas y francesas modernas hasta diseños a mano alzada y efectos especiales.',
        image: '../../images/pages/unas/diseno-unas-arte-mano-alzada-chia.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 9,
        title: 'Manicura Secado Rápido',
        price: masterPrices.nails.manicura.secadoRapido,
        duration: '45 min',
        summary: 'Ideal si tienes prisa: limpieza perfecta y secado express.',
        description: 'Disfruta de una manicura completa con esmalte de fórmula avanzada que seca en minutos. Perfecto para quienes tienen una agenda apretada pero no renuncian a la calidad.',
        image: '../../images/pages/unas/manicure-diseno-premium-narbos-salon-spa-chia-cundinamarca-belleza-integral.webp',
        link: 'manicure-pedicure.html'
    },
    {
        id: 10,
        title: 'Pedicura Secado Rápido',
        price: masterPrices.nails.pedicura.secadoRapido,
        duration: '60 min',
        summary: 'Pies perfectos sin tiempos de espera largos.',
        description: 'El mismo cuidado spa para tus pies con la ventaja del secado acelerado. Sal del salón lista para continuar tu día sin preocuparte por arruinar tu esmaltado.',
        image: '../../images/pages/unas/esmaltado-semi.webp',
        link: 'manicure-pedicure.html'
    }
];
