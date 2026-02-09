export const hairPageServices = Object.freeze([
    /* -------------------------------------------------------------------------- */
    /*                                HUB PRINCIPAL                               */
    /* -------------------------------------------------------------------------- */
    {
        id: 1,
        category: 'hub',
        title: "Corte y Cepillado",
        description: "Diseños personalizados, puntas perfectas y cambios de look completos.",
        link: "../../servicios/peluqueria/cortes-de-pelo.html",
        image: "../../images/pages/peluqueria/corte-de-cabello-color-en-chia.webp",
        price: 'Desde $35.000',
        duration: '45 min',
        variant: "standard"
    },
    {
        id: 2,
        category: 'hub',
        title: "Balayage y Mechas",
        description: "Iluminaciones perfectas, rubios soñados y técnicas de degradado.",
        link: "../../servicios/peluqueria/balayage-mechas.html",
        image: "../../images/pages/peluqueria/mechas-balayage-detalle.webp",
        price: 'Desde $320.000',
        duration: '3 - 5 horas',
        variant: "standard"
    },
    {
        id: 3,
        category: 'hub',
        title: "Color y Tinturas",
        description: "Tintes completos, cubrimiento de canas y retoque de raíz profesional.",
        link: "../../servicios/peluqueria/color-tinturas-cabello.html",
        image: "../../images/pages/peluqueria/color-tratamiento.webp",
        price: 'Desde $120.000',
        duration: '2 horas',
        variant: "standard"
    },
    {
        id: 4,
        category: 'hub',
        title: "Tratamientos Capilares",
        description: "Recuperación profunda, keratinas, cirugía capilar y botox.",
        link: "../../servicios/peluqueria/tratamientos-capilares.html",
        image: "../../images/pages/peluqueria/lavado-spa-capilar.webp", // Updated image path if exists, fallback to placeholder logic in rendering if needed
        price: 'Desde $120.000',
        duration: '1 - 3 horas',
        variant: "standard"
    },

    /* -------------------------------------------------------------------------- */
    /*                             CORTES DE PELO                                 */
    /* -------------------------------------------------------------------------- */
    {
        id: 10,
        category: 'cortes',
        title: "Corte Dama Estilizado",
        description: "**El corte perfecto para ti.** Incluye asesoría de imagen, lavado spa y cepillado básico. Realizamos cortes Bob, capas, rectos y en V.",
        image: "../../images/pages/peluqueria/corte_bob_chia.webp",
        price: '$35.000',
        duration: '45 min',
        modal: true
    },
    {
        id: 11,
        category: 'cortes',
        title: "Corte Bordado (Split Ender)",
        description: "**Elimina la horquilla sin perder largo.** Esta técnica especializada corta solo las puntas abiertas que sobresalen, dejando tu cabello suave y saludable.",
        image: "../../images/pages/peluqueria/corte_capas_chia.webp",
        price: '$60.000',
        duration: '60 min',
        modal: true
    },
    {
        id: 12,
        category: 'cortes',
        title: "Cepillado Profesional",
        description: "**Luce una melena de impacto.** Incluye lavado y estilizado con secador y plancha/pinzas para ondas. Perfecto para eventos o tu día a día.",
        image: "../../images/pages/peluqueria/corte_pixie_mujer_chia.webp",
        price: 'Desde $35.000',
        duration: '45 min',
        modal: true
    },

    /* -------------------------------------------------------------------------- */
    /*                            BALAYAGE Y COLOR                                */
    /* -------------------------------------------------------------------------- */
    {
        id: 20,
        category: 'color', // Used for both color and balayage pages if unified, or separate
        title: "Balayage",
        description: "**Degradado natural y luminoso.** Técnica a mano alzada para crear un efecto de barrido de color. Incluye decoloración, matizante y tratamiento post-color.",
        image: "../../images/pages/peluqueria/mechas_balayage_chia.webp",
        price: 'Desde $450.000',
        duration: '4 - 6 horas',
        modal: true
    },
    {
        id: 21,
        category: 'color',
        title: "Babylights / Iluminaciones",
        description: "**Destellos sutiles de luz.** Mechas muy finas que imitan el brillo natural del sol en el cabello. Ideales para dar dimensión sin cambios drásticos.",
        image: "../../images/pages/peluqueria/rubios_cenizos_chia.webp",
        price: 'Desde $320.000',
        duration: '3 - 5 horas',
        modal: true
    },
    {
        id: 22,
        category: 'color',
        title: "Tinte Completo",
        description: "**Color uniforme y vibrante.** Aplicación de tinte global de raíz a puntas. Usamos marcas premium como Wella y L'Oréal para cuidar tu fibra.",
        image: "../../images/pages/peluqueria/tinte_rojo_cobrizo_chia.webp",
        price: 'Desde $200.000',
        duration: '2 horas',
        modal: true
    },
    {
        id: 23,
        category: 'color',
        title: "Retoque de Raíz",
        description: "**Mantén tu color perfecto.** Aplicación de tinte solo en el crecimiento (máximo 3cm). Incluye lavado y secado.",
        image: "../../images/pages/peluqueria/correccion_color_chia.webp",
        price: 'Desde $120.000',
        duration: '90 min',
        modal: true
    },

    /* -------------------------------------------------------------------------- */
    /*                              TRATAMIENTOS                                  */
    /* -------------------------------------------------------------------------- */
    {
        id: 30,
        category: 'tratamientos',
        title: "Alisado Progresivo",
        description: "**Liso natural y sin frizz.** Tratamiento que alisa la onda, reduce el volumen y aporta brillo extremo. Duración de 3 a 5 meses.",
        image: "../../images/pages/peluqueria/lavado-spa-capilar.webp",
        price: 'Desde $350.000',
        duration: '3 - 4 horas',
        modal: true
    },
    {
        id: 31,
        category: 'tratamientos',
        title: "Repolarización Capilar",
        description: "**Coctel de nutrientes.** Tratamiento profundo con aparatología (gorro térmico/enfriador) para sellar vitaminas y keratina en la fibra capilar.",
        image: "../../images/pages/peluqueria/lavado-spa-capilar.webp", // Placeholder reused
        price: '$120.000',
        duration: '90 min',
        modal: true
    },
    {
        id: 32,
        category: 'tratamientos',
        title: "Botox Capilar",
        description: "**Rejuvenecimiento instantáneo.** Rellena la fibra capilar dañada, eliminando el frizz y aportando cuerpo y suavidad sin alisar completamente.",
        image: "../../images/pages/peluqueria/lavado-spa-capilar.webp", // Placeholder reused
        price: 'Desde $180.000',
        duration: '2 horas',
        modal: true
    }
]);
