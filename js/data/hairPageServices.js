import { masterPrices } from './masterPrices.js';

/**
 * @template T
 * @param {string} category
 * @param {ReadonlyArray<T>} servicios
 */
const enCategoria = (category, servicios) => servicios.map(servicio => ({ ...servicio, category }));

export const hairPageServices = Object.freeze([
    /* -------------------------------------------------------------------------- */
    /*                                HUB PRINCIPAL                               */
    /* -------------------------------------------------------------------------- */
    {
        id: 1,
        category: 'hub',
        title: "Corte para Dama",
        description: "Diseños personalizados, puntas perfectas y cambios de look completos.",
        link: "servicios/peluqueria/cortes-de-pelo",
        image: "images/pages/peluqueria/corte-cabello-dama-salon-belleza-chia-narbos.webp",
        price: 'Desde $35.000',
        duration: '45 min',
        variant: "standard"
    },
    {
        id: 2,
        category: 'hub',
        title: "Cepillados",
        description: "Luce una melena de impacto. Incluye lavado y estilizado profesional.",
        link: "servicios/peluqueria/cortes-de-pelo",
        image: "images/pages/peluqueria/corte-de-cabello-color-en-chia.webp", 
        price: 'Desde $35.000',
        duration: '45 min',
        variant: "standard"
    },
    {
        id: 3,
        category: 'hub',
        title: "Aplicación de Tintes",
        description: "Color uniforme y vibrante. Cubrimiento de canas y cambio total de color.",
        link: "servicios/peluqueria/color-tinturas-cabello",
        image: "images/pages/peluqueria/cubrimiento-de-canas-natural.webp",
        price: 'Desde $200.000',
        duration: '2 horas',
        variant: "standard"
    },
    {
        id: 4,
        category: 'hub',
        title: "Balayage",
        description: "Degradado natural y luminoso. La técnica experta para rubios soñados.",
        link: "servicios/peluqueria/balayage-mechas",
        image: "images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos.webp",
        price: 'Desde $450.000',
        duration: '4 - 6 horas',
        variant: "standard"
    },
    {
        id: 5,
        category: 'hub',
        title: "Iluminación",
        description: "Destellos sutiles de luz (Babylights) para dar dimensión sin cambios drásticos.",
        link: "servicios/peluqueria/balayage-mechas",
        image: "images/pages/peluqueria/imagen-balayage_chia.webp",
        price: 'Desde $320.000',
        duration: '3 - 5 horas',
        variant: "standard"
    },
        {
        id: 6,
        category: 'hub',
        title: "Alisados Permanentes Progresivos",
        description: "Liso natural, reducción de volumen y brillo extremo sin frizz.",
        link: "servicios/peluqueria/tratamientos-capilares",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp",
        price: `Desde ${masterPrices.hair.tratamientos.alisadoProgresivo}`,
        duration: '3 - 4 horas',
        variant: "standard"
    },
    {
        id: 7,
        category: 'hub',
        title: "Shampoo",
        description: "Limpieza profunda y revitalizante con productos profesionales. Incluye masaje capilar relajante.",
        link: "servicios/peluqueria/tratamientos-capilares",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp",
        price: 'Desde $10.000',
        duration: '20 min',
        variant: "standard"
    },

    /* -------------------------------------------------------------------------- */
    /*                             CORTES DE PELO                                 */
    /* -------------------------------------------------------------------------- */
    {
        id: 10,
        category: 'cortes',
        title: "Corte para Dama",
        description: "<strong>El corte perfecto para ti.</strong> Incluye asesoría de imagen, lavado spa y cepillado básico. Realizamos cortes Bob, capas, rectos y en V.",
        image: "images/pages/peluqueria/corte-cabello-dama-salon-belleza-chia-narbos.webp",
        price: 'Desde $35.000',
        duration: '45 min',
        modal: true
    },

    {
        id: 12,
        category: 'cortes',
        title: "Cepillados",
        description: "<strong>Luce una melena de impacto.</strong> Incluye lavado y estilizado con secador y plancha/pinzas para ondas. Perfecto para eventos o tu día a día.",
        image: "images/pages/peluqueria/corte-de-cabello-color-en-chia.webp",
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
        description: "<strong>Degradado natural y luminoso.</strong> Técnica a mano alzada para crear un efecto de barrido de color. Incluye decoloración, matizante y tratamiento post-color.",
        image: "images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos.webp",
        price: 'Desde $450.000',
        duration: '4 - 6 horas',
        modal: true
    },
    {
        id: 21,
        category: 'color',
        title: "Babylights / Iluminaciones",
        description: "<strong>Destellos sutiles de luz.</strong> Mechas muy finas que imitan el brillo natural del sol en el cabello. Ideales para dar dimensión sin cambios drásticos.",
        image: "images/pages/peluqueria/imagen-balayage_chia.webp",
        price: 'Desde $320.000',
        duration: '3 - 5 horas',
        modal: true
    },
    {
        id: 22,
        category: 'color',
        title: "Aplicación de tintes",
        description: "<strong>Color uniforme y vibrante.</strong> Aplicación de tinte global de raíz a puntas. Usamos marcas premium como Wella y L'Oréal para cuidar tu fibra.",
        image: "images/pages/peluqueria/cubrimiento-de-canas-natural.webp",
        price: 'Desde $200.000',
        duration: '2 horas',
        modal: true
    },
    {
        id: 23,
        category: 'color',
        title: "Retoque de Raíz",
        description: "<strong>Mantén tu color perfecto.</strong> Aplicación de tinte solo en el crecimiento (máximo 3cm). Incluye lavado y secado.",
        image: "images/pages/peluqueria/retoque-de-raiz-tinte.webp",
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
        description: "<strong>Liso natural y sin frizz.</strong> Tratamiento que alisa la onda, reduce el volumen y aporta brillo extremo. Duración de 3 a 5 meses.",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp",
        price: `Desde ${masterPrices.hair.tratamientos.alisadoProgresivo}`,
        duration: '3 - 4 horas',
        modal: true
    },
    {
        id: 31,
        category: 'tratamientos',
        title: "Repolarización Capilar",
        description: "<strong>Coctel de nutrientes.</strong> Tratamiento profundo con aparatología (gorro térmico/enfriador) para sellar vitaminas y keratina en la fibra capilar.",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp", // Placeholder reused
        price: '$120.000',
        // Sin confirmar por la propietaria (pregunta enviada el 2026-09-27): se ve en la
        // tarjeta como hasta ahora, pero el SSG no lo publica en el JSON-LD.
        precioSinConfirmar: true,
        duration: '90 min',
        modal: true
    },
    {
        id: 32,
        category: 'tratamientos',
        title: "Botox Capilar",
        description: "<strong>Rejuvenecimiento instantáneo.</strong> Rellena la fibra capilar dañada, eliminando el frizz y aportando cuerpo y suavidad sin alisar completamente.",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp", // Placeholder reused
        price: `Desde ${masterPrices.hair.tratamientos.botoxCapilar}`,
        duration: '2 horas',
        modal: true
    },
    {
        id: 33,
        category: 'tratamientos',
        title: "Shampoo",
        description: "<strong>Limpieza revitalizante.</strong> Lavado profundo con masaje capilar y productos profesionales. Ideal para refrescar tu cuero cabelludo.",
        image: "images/pages/peluqueria/lavado-spa-capilar.webp",
        price: 'Desde $10.000',
        duration: '20 min',
        modal: true
    },

    /* -------------------------------------------------------------------------- */
    /*                                 EXTENSIONES                                */
    /* -------------------------------------------------------------------------- */
    {
        id: 34,
        category: 'extensiones',
        title: "Extensiones Punto a Punto",
        description: "<strong>Cabello natural, mechón a mechón.</strong> Se colocan por puntos para sumar largo y volumen donde lo necesitas.",
        image: "images/pages/peluqueria/extensiones-cabello-natural-chia-narbos-mobile.webp",
        price: `Desde ${masterPrices.hair.extensiones.porPunto} por punto`,
        duration: '2 a 4 horas',
        modal: true
    },
    {
        id: 35,
        category: 'extensiones',
        title: "Extensiones de Adhesivo",
        description: "<strong>Cabello natural en cinta.</strong> Bandas adhesivas que se colocan por pares para ganar largo y volumen.",
        // Foto real de la técnica, recortada en 4:3 sobre la cinta: la tarjeta es
        // apaisada y la foto de la galería, vertical, se quedaría en una franja.
        image: "images/pages/peluqueria/extensiones-adhesivas-cabello-natural-colocacion-chia-tarjeta.webp",
        imageAlt: "Colocación de extensiones adhesivas de cabello natural en Narbo's Salón Spa Chía",
        price: `Desde ${masterPrices.hair.extensiones.adhesivoPar} el par`,
        duration: '2 a 4 horas',
        modal: true
    },
    {
        id: 36,
        category: 'extensiones',
        title: "Cortina Invisible",
        description: "<strong>Cabello natural en cortina.</strong> El precio depende de tu cabello y del resultado que buscas, así que se define en la valoración.",
        image: "images/pages/peluqueria/extensiones-cabello-natural-chia-narbos-mobile.webp",
        price: 'Según valoración',
        // No es un precio sin confirmar sino que no tiene precio público; la marca
        // sirve igual: el SSG no publica una `price` que no existe.
        precioSinConfirmar: true,
        duration: '2 a 4 horas',
        modal: true
    },
    {
        id: 37,
        category: 'extensiones',
        title: "Mantenimiento de Extensiones",
        description: "<strong>Reacomodo cada 2 o 3 meses.</strong> De él depende cuánto te duran las extensiones. Si te las pusimos aquí, el retiro no tiene costo.",
        image: "images/pages/peluqueria/extensiones-cabello-natural-chia-narbos-mobile.webp",
        price: `Desde ${masterPrices.hair.extensiones.mantenimientoPunto} por punto`,
        duration: 'Según la cantidad de puntos',
        modal: true
    },

    /* -------------------------------------------------------------------------- */
    /*                           CARTA DE TRATAMIENTOS                            */
    /* -------------------------------------------------------------------------- */
    // Sin foto propia: salen en la lista de `CartaServicios`, no en el grid de tarjetas.
    ...enCategoria('tratamientos-basicos', [
        {
            title: "L'Oréal Vitamino Color",
            description: "Cabello teñido o con color: protege el color, aporta brillo y suaviza la fibra capilar.",
            price: masterPrices.hair.tratamientos.vitaminoColor
        },
        {
            title: "L'Oréal Absolut Repair",
            description: "Cabello dañado o quebradizo: repara la fibra capilar, da elasticidad y mejora la suavidad.",
            price: masterPrices.hair.tratamientos.absolutRepair
        },
        {
            title: "L'Oréal Metal Detox",
            description: "Cabello con residuos de metal: desintoxica la fibra capilar, protege el color y aporta brillo.",
            price: masterPrices.hair.tratamientos.metalDetox
        },
        {
            title: "Authentic Beauty Concept",
            description: "Todo tipo de cabello: hidrata, suaviza y mejora la manejabilidad, con brillo y ligereza.",
            price: masterPrices.hair.tratamientos.authenticBeauty
        },
        {
            title: "Tratamiento Nutritivo más Ampolleta",
            description: "Cabello seco, opaco o sin vida: nutre en profundidad y devuelve la vitalidad y el brillo.",
            price: `Desde ${masterPrices.hair.tratamientos.nutritivoAmpolleta}`
        }
    ]),
    ...enCategoria('tratamientos-intensivos', [
        {
            title: "Quinoa 911",
            description: "Cabello frágil, dañado o sin brillo: repara, fortalece y mejora la elasticidad.",
            price: masterPrices.hair.tratamientos.quinoa911
        },
        {
            title: "69 Pro-Active",
            description: "Cabello con caída o debilitado: fortalece la raíz, estimula el crecimiento y reduce la caída.",
            price: masterPrices.hair.tratamientos.proActive69
        },
        {
            title: "Risame (Curls)",
            description: "Cabello ondulado, rizado o afro: define, hidrata, da plasticidad y controla el frizz.",
            price: masterPrices.hair.tratamientos.risame
        },
        {
            title: "Fusión Wella",
            description: "Cabello dañado o sin fuerza: repara la fibra capilar, protege contra la rotura y devuelve la suavidad.",
            price: masterPrices.hair.tratamientos.fusionWella
        },
        {
            title: "Exfoliación + Nutrición",
            description: "Cuero cabelludo con impurezas o cabello opaco: limpia en profundidad, estimula la oxigenación y nutre la fibra capilar.",
            price: masterPrices.hair.tratamientos.exfoliacionNutricion
        },
        {
            title: "Fibre Clinix",
            description: "Cabello muy dañado o químicamente tratado: reconstruye la fibra capilar, restaura la elasticidad y la protege de daños futuros.",
            price: masterPrices.hair.tratamientos.fibreClinix
        },
        {
            title: "Tratamiento Narbo's (Protein + Lipids)",
            description: "Cabello muy dañado, debilitado o con procesos químicos: reconstruye y fortalece con proteínas y lípidos.",
            price: masterPrices.hair.tratamientos.proteinLipids
        },
        {
            title: "Células Madres (Stem Cell)",
            description: "Cabello dañado, envejecido o sin vida: regenera la fibra capilar y devuelve densidad, fuerza y brillo.",
            price: masterPrices.hair.tratamientos.celulasMadres
        }
    ])
]);

/**
 * Registro único de las subpáginas de peluquería, por su clave (el nombre del
 * archivo sin `.html`, que es también su clave en `pagesData`). Una página nueva
 * es una fila aquí.
 * - `categorias`: tarjetas que muestra. Las pinta el SSG en el build, y
 *   `hair-page.js` en cliente cuando el HTML llega sin ellas.
 * - `carta`: lista de precios sin foto, por grupos, debajo de las tarjetas.
 */
const SUBPAGINAS = {
    'cortes-de-pelo': { categorias: ['cortes'] },
    'balayage-mechas': { categorias: ['color', 'balayage'] },
    'color-tinturas-cabello': { categorias: ['color', 'balayage'] },
    'tratamientos-capilares': {
        categorias: ['tratamientos'],
        carta: {
            heading: 'Carta de Tratamientos Capilares',
            intro: 'Elegimos contigo el tratamiento según lo que tu cabello necesita.',
            groups: [
                {
                    category: 'tratamientos-basicos',
                    title: 'Básicos y Express',
                    intro: 'Para revitalizar, nutrir y devolverle el brillo natural a tu cabello.'
                },
                {
                    category: 'tratamientos-intensivos',
                    title: 'Intensivos',
                    intro: 'Incluyen diagnóstico previo con capilógrafo y aparatología como la Micro Mist, sin costo adicional.'
                }
            ]
        }
    },
    'extensiones-cabello': { categorias: ['extensiones'] }
};

export const HAIR_SUBPAGES = Object.keys(SUBPAGINAS);

/**
 * Categorías de una subpágina, tarjetas y carta. Sin subpágina, las del hub.
 * @param {string} pagina
 * @returns {string[]}
 */
function categoriasDe(pagina) {
    const { categorias = ['hub'], carta } = SUBPAGINAS[pagina] ?? {};
    return [...categorias, ...(carta?.groups ?? []).map(grupo => grupo.category)];
}

/**
 * Clave de la subpágina a la que pertenece una ruta, o `null` si es el hub.
 * @param {string} ruta
 */
export function hairSubpageFor(ruta) {
    return HAIR_SUBPAGES.find(pagina => ruta.includes(pagina)) ?? null;
}

/**
 * Primera subpágina que pinta una categoría. Los servicios de las subpáginas no traen
 * `link` porque ya están en su página; quien los enlaza desde fuera (el buscador) lo
 * saca de aquí. `color` lo pintan Balayage y Color, y gana la primera.
 * @param {string} category
 * @returns {string|null}
 */
export function hairSubpageForCategory(category) {
    return HAIR_SUBPAGES.find(pagina => categoriasDe(pagina).includes(category)) ?? null;
}

export function hairServicesFor(pagina) {
    const categorias = SUBPAGINAS[pagina]?.categorias || ['hub'];
    return hairPageServices.filter(s => categorias.includes(s.category));
}

/**
 * Carta de precios de una subpágina con sus servicios, o `null` si no tiene.
 * @param {string} pagina
 */
export function hairCartaFor(pagina) {
    const carta = SUBPAGINAS[pagina]?.carta;
    if (!carta) return null;
    return {
        ...carta,
        groups: carta.groups.map(grupo => ({
            ...grupo,
            items: hairPageServices.filter(s => s.category === grupo.category)
        }))
    };
}

/**
 * Todo lo que una página ofrece, tarjetas y carta: es lo que declara su JSON-LD.
 * @param {string} pagina
 */
export function hairOffersFor(pagina) {
    const categorias = categoriasDe(pagina);
    return hairPageServices.filter(s => categorias.includes(s.category));
}
