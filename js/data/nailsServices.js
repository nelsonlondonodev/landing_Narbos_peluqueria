import { masterPrices } from './masterPrices.js';

export const nailsServices = [
    {
        id: 1,
        title: 'Manicura Tradicional',
        price: `Desde ${masterPrices.nails.manicura.tradicional}`,
        duration: '45 min',
        summary: 'Limpieza, cuidado de cutículas y esmaltado clásico para el día a día.',
        description: 'Incluye limado y esmaltado con productos de alta calidad.',
        image: '../../images/pages/unas/manicura-perfecta-tono-vino-elegante-narbos-salon-spa-chia.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 2,
        title: 'Manicura Semipermanente',
        price: `Desde ${masterPrices.nails.manicura.semipermanente}`,
        duration: '60 min',
        summary: 'Color vibrante y brillo espejo garantizado por hasta 21 días.',
        description: 'Manicura en seco (rusa combinada) con Organic Nails y Masglo Gel Evolution, curada en lámpara LED.',
        image: '../../images/pages/unas/manicure-ruso-detalle-perfecto-narbos.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 3,
        title: 'Pedicura Tradicional',
        price: masterPrices.nails.pedicura.tradicional,
        duration: '60 min',
        summary: 'Cuidado completo para pies: limpieza, exfoliación y esmaltado.',
        description: 'Incluye baño relajante, remoción de durezas e hidratación básica.',
        image: '../../images/pages/unas/servicio-pedicura-spa-profesional-chia-card.webp',
        width: 800,
        height: 975,
        alt: 'Pedicura profesional spa en Narbo\'s Chía',
        link: 'manicure-pedicure'
    },
     {
        id: 4,
        title: 'Pedicura Semipermanente',
        price: masterPrices.nails.pedicura.semipermanente,
        duration: '75 min',
        summary: 'Durabilidad extrema y brillo perfecto para tus pies.',
        description: 'El cuidado de la pedicura spa, sin esperar a que se sequen las uñas.',
        image: '../../images/pages/unas/pedicure-spa-relax-experiencia-chia.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 5,
        title: 'Uñas Acrílicas / Polygel',
        price: `Desde ${masterPrices.nails.extensiones.poligel}`,
        duration: '120 min',
        summary: 'Extensiones esculpidas para longitud y resistencia superior.',
        description: 'Formas Coffin, Stiletto o Almendra. Incluye manicura completa y esmaltado semipermanente.',
        image: '../../images/pages/unas/unas-acrilicas-tendencia-2026-chia.webp',
        link: 'unas-acrilicas-gel'
    },
    {
        id: 6,
        title: 'Uñas Press On',
        price: masterPrices.nails.extensiones.pressOn,
        duration: '90 min',
        summary: 'Sistema rápido de extensión con acabado natural y aplicación semipermanente.',
        description: 'Uñas largas al instante, con tips completos y sistema soft gel.',
        image: '../../images/pages/unas/diseno-unas-elegantes-chia-narbos-spa.webp',
        link: 'unas-acrilicas-gel'
    },
    {
        id: 7,
        title: 'Spa de Manos o Pies',
        price: `Adicional desde ${masterPrices.nails.manicura.spa}`,
        duration: '+20 min',
        summary: 'Exfoliación profunda, mascarilla e hidratación intensiva.',
        description: 'Se añade a tu servicio, con sales minerales y masaje extendido.',
        image: '../../images/pages/unas/manicure-spa.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 8,
        title: 'Diseños (Nail Art)',
        price: 'Desde $5.000',
        duration: '15+ min',
        summary: 'Personalización total: tendencias, mano alzada y decoración.',
        description: 'Desde líneas minimalistas y francesas modernas hasta efectos especiales.',
        image: '../../images/pages/unas/diseno-unas-arte-mano-alzada-chia.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 9,
        title: 'Manicura Secado Rápido',
        price: masterPrices.nails.manicura.secadoRapido,
        duration: '45 min',
        summary: 'Ideal si tienes prisa: limpieza perfecta y secado express.',
        description: 'Manicura completa con esmalte de fórmula avanzada que seca en minutos.',
        image: '../../images/pages/unas/manicure-diseno-premium-narbos-salon-spa-chia-cundinamarca-belleza-integral.webp',
        link: 'manicure-pedicure'
    },
    {
        id: 10,
        title: 'Pedicura Secado Rápido',
        price: masterPrices.nails.pedicura.secadoRapido,
        duration: '60 min',
        summary: 'Pies perfectos sin tiempos de espera largos.',
        description: 'El mismo cuidado spa, con secado acelerado para continuar tu día.',
        image: '../../images/pages/unas/esmaltado-semi.webp',
        link: 'manicure-pedicure'
    }
];

/**
 * Tarjetas de una página de uñas. El hub resume cada servicio y lleva a su subpágina;
 * las subpáginas lo cuentan entero y se agenda desde ahí.
 * @param {string} pagina
 */
export function nailsCardsFor(pagina) {
    if (pagina === 'unas-spa') {
        return nailsServices.map(({ alt, summary, link, ...servicio }) => ({
            ...servicio,
            imageAlt: alt,
            description: summary,
            link: `servicios/unas-spa/${link}`
        }));
    }

    return nailsServices
        .filter(servicio => servicio.link === pagina)
        .map(({ alt, summary, description, link, ...servicio }) => ({
            ...servicio,
            imageAlt: alt,
            description: `<strong>${summary}</strong> ${description}`,
            reserva: true
        }));
}
