import { masterPrices } from './masterPrices.js';

export const estheticsServices = [
    /* -------------------------------------------------------------------------- */
    /*                                FACIAL                                      */
    /* -------------------------------------------------------------------------- */
    {
        title: 'Limpieza Facial Básica',
        description: 'Protocolo esencial para eliminar impurezas y restaurar el equilibrio de tu piel.',
        image: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
        link: 'servicios/estetica/spa-facial-integral.html',
        price: masterPrices.esthetics.facial.basico,
        variant: 'standard'
    },
    {
        title: 'Microdermoabrasión',
        description: 'Exfoliación profunda que renueva la textura de la piel y atenúa manchas.',
        image: '../../images/pages/estetica/microdermoabrasion-hidrofacial-equipos-chia.webp',
        link: 'servicios/estetica/spa-facial-integral.html',
        price: masterPrices.esthetics.facial.microdermoabrasion,
        variant: 'standard'
    },
    {
        title: 'Hidrofacial',
        description: 'Limpieza, hidratación y renovación profunda con tecnología avanzada.',
        image: '../../images/pages/estetica/microdermoabrasion-hidrofacial-equipos-chia.webp',
        link: 'servicios/estetica/spa-facial-integral.html',
        price: masterPrices.esthetics.facial.hidroFacial,
        variant: 'standard'
    },
    {
        title: 'Tratamientos Despigmentantes',
        description: 'Protocolos especializados para unificar el tono de la piel y reducir manchas.',
        image: '../../images/pages/estetica/tratamiento-despigmentante-mascarilla-facial.webp',
        link: 'servicios/estetica/spa-facial-integral.html',
        price: `Sesión ${masterPrices.esthetics.facial.despigmentantes}`,
        variant: 'standard'
    },

    /* -------------------------------------------------------------------------- */
    /*                                CORPORAL                                    */
    /* -------------------------------------------------------------------------- */
    {
        title: 'Masaje Relajante',
        description: '1 hora de relajación total para desconectar cuerpo y mente.',
        image: '../../images/pages/estetica/masaje-relajante-piedras-calientes-spa-chia.webp',
        link: 'servicios/estetica/masajes-relajantes.html',
        price: masterPrices.esthetics.corporal.masajeRelajante,
        variant: 'standard'
    },
    {
        title: 'Masaje Descontracturante (Espalda)',
        description: 'Alivio focalizado para tensiones musculares en la zona dorsal y lumbar (35 min).',
        image: '../../images/pages/estetica/masaje-relajante-piedras-calientes-espalda-chia.webp', 
        link: 'servicios/estetica/masajes-relajantes.html',
        price: masterPrices.esthetics.corporal.masajeDescontracturanteEspalda,
        variant: 'standard'
    },
    {
        title: 'Masaje Descontracturante (Cuerpo)',
        description: 'Terapia profunda de cuerpo completo para liberar el estrés muscular acumulado.',
        image: '../../images/pages/estetica/masaje-descontracturante-cuerpo-chia.webp',
        link: 'servicios/estetica/masajes-relajantes.html',
        price: masterPrices.esthetics.corporal.masajeDescontracturanteCuerpo,
        variant: 'standard'
    },
    {
        title: 'Drenaje Linfático',
        description: 'Técnica suave que estimula la eliminación de toxinas y reduce la retención de líquidos.',
        image: '../../images/pages/estetica/masaje-relajante-piedras-calientes-spa-chia.webp',
        link: 'servicios/estetica/masajes-relajantes.html',
        price: masterPrices.esthetics.corporal.drenajeLinfatico,
        variant: 'standard'
    },
    {
        title: 'Moldeamiento Corporal',
        description: 'Tratamientos reductores y reafirmantes para definir tu silueta.',
        image: '../../images/pages/estetica/radiofrecuencia-reduccion-corporal-chia.webp',
        link: 'servicios/estetica/masajes-relajantes.html',
        price: `Sesión ${masterPrices.esthetics.corporal.moldeamiento}`,
        variant: 'standard'
    },

    /* -------------------------------------------------------------------------- */
    /*                                DEPILACIÓN                                  */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                DEPILACIÓN (CERA E HILO)                    */
    /* -------------------------------------------------------------------------- */
    // FACIAL (Cejas y Bigote)
    {
        title: 'Depilación Cejas y Bigote (Cera)',
        description: 'Diseño y limpieza rápida con cera suave para el rostro.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/cejas-y-pestanas.html',
        price: masterPrices.esthetics.depilacion.cera.cejasBigote,
        variant: 'logo'
    },
    {
        title: 'Depilación con Hilo (Cejas y Bigote)',
        description: 'Técnica milenaria para una definición precisa y duradera.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/cejas-y-pestanas.html',
        price: masterPrices.esthetics.depilacion.hilo.cejasBigote,
        variant: 'logo'
    },

    // CORPORAL (Axilas, Piernas, Bikini)
    {
        title: 'Depilación Axilas (Cera)',
        description: 'Piel suave y libre de vello en una zona delicada.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/depilacion-corporal.html',
        price: masterPrices.esthetics.depilacion.cera.axilas,
        variant: 'logo'
    },
    {
        title: 'Depilación Pierna Completa (Cera)',
        description: 'Suavidad total desde los muslos hasta los tobillos.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/depilacion-corporal.html',
        price: masterPrices.esthetics.depilacion.cera.piernaCompleta,
        variant: 'logo'
    },
    {
        title: 'Depilación Media Pierna (Cera)',
        description: 'Depilación efectiva de rodillas hacia abajo.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/depilacion-corporal.html',
        price: masterPrices.esthetics.depilacion.cera.mediaPierna,
        variant: 'logo'
    },
    {
        title: 'Depilación Bikini Parcial (Cera)',
        description: 'Limpieza de la zona del bikini para tu comodidad.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/depilacion-corporal.html',
        price: masterPrices.esthetics.depilacion.cera.bikiniParcial,
        variant: 'logo'
    },
    {
        title: 'Depilación Bikini Completo (Cera)',
        description: 'Depilación integral de la zona íntima con máxima higiene.',
        image: '../../images/brand/logo_narbos.webp',
        link: 'servicios/estetica/depilacion-corporal.html',
        price: masterPrices.esthetics.depilacion.cera.bikiniCompleto,
        variant: 'logo'
    }
];
