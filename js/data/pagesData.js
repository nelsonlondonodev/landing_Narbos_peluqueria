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
            title: "Peluquería en Chía: expertos en estilo, color y bienestar",
            subtitle: "Expertos en realzar tu belleza con técnicas de vanguardia y productos de clase mundial.",
            imageSrc: "../../images/pages/peluqueria/hair-hero.webp",
            imageAlt: "Servicio de peluquería profesional en Narbo's"
        },
        gallery: [
            {
                type: 'video',
                layout: 'featured-video', // 9:16 vertical on mobile, 2x2 on desktop
                src: 'video/video_instagram_1.mp4',
                poster: '../../images/pages/peluqueria/hair-hero.webp',
                title: "Experiencia Narbo's",
                subtitle: "Vive el cambio",
                alt: "Video de experiencia en Narbo's Salon"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/color-tratamiento.webp',
                title: "Color profundo",
                alt: "Balayage y tintes de color profundo"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/mechas-balayage-detalle.webp',
                title: "Iluminaciones",
                alt: "Detalle de mechas balayage"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/balayage-rubio-iluminado-corte-capas-narbos-salon-spa-chia.webp',
                title: "Rubios",
                alt: "Balayage rubio iluminado"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/estilismo-barba.webp',
                title: "Cortes",
                alt: "Cortes de diseño y estilismo"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/peluqueria/narbos-salon-spa-chia-peinado-tendencia-trenzas-laterales-ondas-sueltas Large.webp',
                title: "Peinados",
                alt: "Peinados de tendencia y ondas sueltas"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Spa Capilar",
                alt: "Lavado y spa capilar relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/imagen-balayage_chia.webp',
                title: "Babylights",
                alt: "Técnica de babylights en cabello"
            },
            {
                type: 'image',
                layout: 'square', // Originalmente era un bloque de cierre, lo dejaremos square o vertical según ajuste. En el HTML era col-span-2 md:col-span-1. Haremos square para mobile y desktop consistente.
                src: '../../images/pages/peluqueria/lavado-spa-capilar.webp', // Nota: imagen repetida en origin, verificar si usar otra.
                title: "Tratamientos",
                alt: "Tratamientos capilares profundos"
            }
        ]
    },
    barberia: {
         hero: {
            title: "Barbería exclusiva en Chía",
            subtitle: "El espacio que mereces para cuidar tu imagen.",
            imageSrc: "images/pages/barberia/barber-hero.webp",
            imageAlt: "Servicios de barbería profesional en Chía"
        },
        gallery: [
            {
                type: 'logo-card',
                layout: 'featured-video',
                src: '../../images/brand/logo_narbos.webp',
                title: "Experiencia Narbo's",
                subtitle: "Vive el cambio",
                alt: "Marca Narbos Barbería"
            },
            {
                type: 'logo-card',
                layout: 'vertical',
                src: '../../images/brand/logo_narbos.webp',
                title: "Calidad Premium",
                alt: "Marca Narbos Salon"
            },
            {
                type: 'logo-card',
                layout: 'square',
                src: '../../images/brand/logo_narbos.webp',
                title: "Estilo",
                alt: "Logotipo Narbos"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/barberia/barber-hero.webp',
                title: "Barbería Clásica",
                alt: "Ambiente de barbería tradicional"
            },
            {
                type: 'logo-card',
                layout: 'square',
                src: '../../images/brand/logo_narbos.webp',
                title: "Confianza",
                alt: "Logo Narbos"
            },
            {
                type: 'logo-card',
                layout: 'horizontal',
                src: '../../images/brand/logo_narbos.webp',
                title: "Profesionalismo",
                alt: "Logo marca"
            },
            {
                type: 'logo-card',
                layout: 'square',
                src: '../../images/brand/logo_narbos.webp',
                title: "Bienestar",
                alt: "Logo Spa"
            },
            {
                type: 'logo-card',
                layout: 'square',
                src: '../../images/brand/logo_narbos.webp',
                alt: "Logo"
            },
            {
                type: 'logo-card',
                layout: 'vertical',
                src: '../../images/brand/logo_narbos.webp',
                title: "Innovación",
                alt: "Logo vertical"
            }
        ]
    },
    nosotros: {
        hero: {
           title: "Nuestra historia",
           subtitle: "Pasión por la belleza y el bienestar desde 2013.",
           imageSrc: "images/brand/logo_narbos.webp",
           imageAlt: "Equipo de Narbo's Salon",
           variant: 'logo'
       }
   },
   contacto: {
        hero: {
            title: "Contáctanos",
            subtitle: "Estamos listos para transformar tu día. Visítanos en nuestra nueva sede.",
            imageSrc: "images/blog/foto_fachada.webp",
            imageAlt: "Recepción de Narbos Salon en Chia"
        }
   },
    'cortes-de-pelo': {
        hero: {
            title: "Cortes de pelo en Chía: Estilo y Tendencia",
            subtitle: "Diseños personalizados realizados por expertos para realzar tu estilo único.",
            imageSrc: "../../images/pages/peluqueria/cortes-de-pelo-profesionales-chia.webp",
            imageAlt: "Corte de pelo profesional realizado en Narbo's Salon Spa"
        },
        gallery: [
            {
                type: 'video',
                layout: 'featured-video',
                src: 'video/video_instagram_1.mp4',
                poster: '../../images/pages/peluqueria/corte-de-cabello-color-en-chia.webp',
                title: "Experiencia Narbo's",
                subtitle: "Vive el cambio",
                alt: "Video de experiencia en Narbo's Salon"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/corte_pixie_mujer_chia.webp',
                title: "Corte Pixie",
                alt: "Corte Pixie y Pelo Corto"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/mechas-balayage-detalle.webp',
                title: "Iluminaciones",
                alt: "Detalle Balayage"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/corte_bob_chia.webp',
                title: "Corte Bob",
                alt: "Corte Bob en Chía"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/peluqueria/corte_capas_chia.webp',
                title: "Corte en Capas",
                alt: "Corte en Capas y Movimiento"
            }
        ]
    },
    'balayage-mechas': {
        gallery: [
             // Caso Estrella: Corrección Rubio Extremo
             {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/tratamiento-hidratacion-chia-despues.webp',
                title: "Hidratación Profunda",
                subtitle: "Tratamiento Reparador",
                alt: "Resultado final: Cabello hidratado y saludable.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/tratamiento-hidratacion-chia-antes.webp',
                        alt: 'Antes: Cabello deshidratado y sin vida.'
                    }
                ]
            },
             {
                type: 'image',
                layout: 'vertical', 
                src: '../../images/pages/peluqueria/casos_exito/correccion-rubio-extremo-cabello-danado-despues.webp',
                title: "Corrección Total",
                subtitle: "De maltratado a rubio perfecto",
                alt: "Resultado final: Corrección de color exitosa y diseño de balayage rubio luminoso.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/correccion-rubio-extremo-cabello-danado-antes.webp',
                        alt: 'Antes: Cabello con manchas y daño severo recuperado.'
                    }
                ]
            },
            // Caso 1: Rubio Iluminación
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-despues.webp',
                title: "Rubio Soñado",
                subtitle: "Iluminación balayage",
                alt: "Diseño de color rubio con técnica balayage.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-antes.webp',
                        alt: 'Estado inicial antes del diseño de color.'
                    }
                ]
            },
            // Caso 2: Corrección Miel (Logic fixed by file renaming)
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/correccion-color-balayage-miel-chia-despues.webp',
                title: "Cambio de Look",
                subtitle: "Renovación total",
                alt: "Renovación de imagen con color y corte.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/correccion-color-balayage-miel-chia-antes.webp',
                        alt: 'Antes del cambio de look.'
                    }
                ]
            },
            // Caso 3: Rubio Perla
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-despues.webp',
                title: "Rubio Perla",
                subtitle: "Corrección y diseño",
                alt: "Balayage rubio perla con corrección de color.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-antes.webp',
                        alt: 'Estado inicial antes del balayage rubio perla.'
                    }
                ]
            },
            // Caso 4: Rubio Dorado
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-dorado-chia-despues.webp',
                title: "Rubio Dorado",
                subtitle: "Luz natural",
                alt: "Balayage en tonos dorados cálidos.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-dorado-chia-antes.webp',
                        alt: 'Estado antes de la iluminación dorada.'
                    }
                ]
            },
            // Caso 5: Rubio Tendencia (Nuevo)
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-tendencia-chia-despues.webp',
                title: "Rubio Tendencia",
                subtitle: "Diseño de autor",
                alt: "Balayage rubio tendencia 2026 realizado por expertos.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-tendencia-chia-antes.webp',
                        alt: 'Antes del cambio de look de tendencia.'
                    }
                ]
            },

        ]
    },
    'color-tinturas-cabello': {
        title: "Expertos en Color",
        description: "Resultados vibrantes, cobertura perfecta de canas y cuidado intensivo para tu fibra capilar.",
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/tinte-completo-rubio-dorado.webp',
                title: "Tinte Completo",
                subtitle: "Cobertura total",
                alt: "Resultado de tinte completo rubio dorado"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/cubrimiento-de-canas-natural.webp', 
                title: "Cubrimiento Canas",
                subtitle: "Acabado Natural",
                alt: "Cobertura 100% de canas con acabado natural"
            },
            {
                type: 'logo-card',
                layout: 'horizontal',
                src: '../../images/brand/logo_narbos.webp',
                title: "Expertos en Color",
                subtitle: "Técnica Profesional",
                alt: "Logo Narbos Salon Colorimetría"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/retoque-de-raiz-tinte.webp',
                title: "Retoque de Raíz",
                alt: "Mantenimiento impecable de color en raíz"
            },
            {
                type: 'logo-card',
                layout: 'square',
                src: '../../images/brand/logo_narbos.webp',
                title: "Salud Capilar",
                alt: "Cuidado del cabello post-color"
            }
        ]
    },
    'tratamientos-capilares': {
        title: "Recuperación Capilar",
        description: "Terapias profundas para devolver la fuerza, el brillo y la suavidad a tu cabello.",
        gallery: [
             {
                type: 'logo-card',
                layout: 'vertical',
                src: '../../images/brand/logo_narbos.webp',
                title: "Spa Capilar",
                subtitle: "Relajación y Salud",
                alt: "Lavado y masaje capilar profundo"
            },
            {
                type: 'logo-card',
                layout: 'vertical',
                src: '../../images/brand/logo_narbos.webp',
                title: "Nutrición",
                alt: "Aplicación de tratamiento nutritivo"
            },
            {
                type: 'logo-card',
                layout: 'horizontal',
                src: '../../images/brand/logo_narbos.webp',
                title: "Brillo Extremo",
                alt: "Cabello sano y brillante"
            },
            {
                type: 'logo-card', 
                layout: 'horizontal',
                src: '../../images/brand/logo_narbos.webp', 
                title: "Resultados Visibles",
                subtitle: "Salud Capilar",
                alt: "Cabello recuperado tras tratamiento"
            }
        ]
    },
    estetica: {
        hero: {
            title: "Estética y Spa en Chía",
            subtitle: "Relájate y renueva tu energía con nuestros tratamientos faciales y corporales.",
            imageSrc: "images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia.%20copy%20Large.webp",
            imageAlt: "Tratamientos de spa y estética en Narbo's"
        },
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: 'images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
                title: "Limpieza Facial",
                subtitle: "Piel Radiante",
                alt: "Limpieza facial profunda con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.webp',
                title: "Masaje Relajante",
                subtitle: "Piedras Calientes",
                alt: "Masaje relajante con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/masaje_reductor.webp',
                title: "Tratamiento Corporal",
                alt: "Masaje reductor y moldeador"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: 'images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp',
                title: "Depilación y Spa",
                subtitle: "Cuidado Integral",
                alt: "Servicios de spa y depilación en Chía"
            }
        ]
    },
    'limpieza-facial': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
                title: "Alta Frecuencia",
                subtitle: "Tecnología Facial",
                alt: "Limpieza facial profunda con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.webp',
                title: "Relajación Total",
                subtitle: "Complemento ideal",
                alt: "Tratamiento facial relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje_reductor.webp',
                title: "Mascarilla",
                alt: "Aplicación de mascarilla facial"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp',
                title: "Piel Radiante",
                subtitle: "Resultados visibles",
                alt: "Piel luminosa y limpia"
            }
        ]
    },
    'cejas-y-pestanas': {
        galleryOptions: { isolateItems: true }, // Aísla cada item de la galería (comportamiento solicitado)
        hero: {
            title: "Cejas y Pestañas",
            subtitle: "Tu mirada es tu carta de presentación. Diseños personalizados para realzar tu belleza natural con elegancia.",
            imageSrc: "images/pages/estetica/microblading-cejas-despues.webp",
            imageAlt: "Cejas y pestañas perfectas en Narbo's Salon"
        },
        gallery: [
             {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/microblading-cejas-despues.webp',
                title: "Diseño Microblading",
                subtitle: "Resultado Final",
                alt: "Cejas pelo a pelo resultado final",
                subImages: [
                    {
                        src: '../../images/pages/estetica/microblading-cejas-antes.webp',
                        alt: 'Cejas antes del procedimiento'
                    }
                ]
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp', // Fallback/Existing image
                title: "Lifting de Pestañas",
                alt: "Pestañas naturales curvadas"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp', // Generic beauty image
                title: "Rostro Armónico",
                alt: "Belleza facial integral"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/spa-hero.webp',
                title: "Mirada Impactante",
                subtitle: "Belleza Natural",
                alt: "Cliente satisfecha con diseño de cejas"
            }
        ]
    },
    'spa-facial-integral': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
                title: "Limpieza Profunda",
                subtitle: "Alta Frecuencia",
                alt: "Limpieza facial profunda con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.webp',
                title: "Relax Total",
                subtitle: "Piedras Calientes",
                alt: "Masaje relajante con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje_reductor.webp',
                title: "Tratamiento Corporal",
                alt: "Masaje reductor y moldeador"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp',
                title: "Experiencia Spa",
                subtitle: "Bienestar y Estética",
                alt: "Servicio de Spa Facial Completo"
            }
        ]
    },

    'masajes-relajantes': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.webp',
                title: "Piedras Calientes",
                subtitle: "Terapia térmica",
                alt: "Masaje con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp',
                title: "Ambiente Spa",
                subtitle: "Relax Total",
                alt: "Ambiente relajante de spa"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje_reductor.webp',
                title: "Masaje Corporal",
                alt: "Masaje reductor y relajante"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
                title: "Bienestar Integral",
                subtitle: "Cuerpo y Mente",
                alt: "Bienestar facial y corporal"
            }
        ]
    },
    'unas-spa': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/unas/manicure-spa.webp',
                title: "Manicure Spa",
                subtitle: "Relajación total",
                alt: "Servicio de Manicure Spa completo"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/pedicure-spa.webp',
                title: "Pedicure Spa",
                subtitle: "Bienestar para tus pies",
                alt: "Pedicure Spa con masaje relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/esmaltado-semi.webp',
                title: "Esmaltado Semipermanente",
                alt: "Uñas con esmaltado de larga duración"
            },
            {
                type: 'image',
                layout: 'featured-video', // Destacado para mostrar el arte
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.webp',
                title: "Extensiones & Nail Art",
                subtitle: "Diseños exclusivos",
                alt: "Uñas acrílicas y diseños artísticos personalizados"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/retiro-semi.webp',
                title: "Cuidado de Uñas",
                alt: "Retiro profesional de esmalte y cuidado"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/unas/disenos-nailart.webp',
                title: "Tendencias Nail Art",
                subtitle: "Creatividad sin límites",
                alt: "Variedad de diseños de uñas modernos"
            }
        ]
    },
    'unas-acrilicas-gel': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/unas/manicure-spa.webp',
                title: "Manicure Spa",
                subtitle: "Relajación total",
                alt: "Servicio de Manicure Spa completo"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/pedicure-spa.webp',
                title: "Pedicure Spa",
                subtitle: "Bienestar para tus pies",
                alt: "Pedicure Spa con masaje relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/esmaltado-semi.webp',
                title: "Esmaltado Semipermanente",
                alt: "Uñas con esmaltado de larga duración"
            },
            {
                type: 'image',
                layout: 'featured-video', // Destacado para mostrar el arte
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.webp',
                title: "Extensiones & Nail Art",
                subtitle: "Diseños exclusivos",
                alt: "Uñas acrílicas y diseños artísticos personalizados"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/retiro-semi.webp',
                title: "Cuidado de Uñas",
                alt: "Retiro profesional de esmalte y cuidado"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/unas/disenos-nailart.webp',
                title: "Tendencias Nail Art",
                subtitle: "Creatividad sin límites",
                alt: "Variedad de diseños de uñas modernos"
            }
        ]
    },
    'manicure-pedicure': {
         gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/unas/manicure-spa.webp',
                title: "Manicure Spa",
                subtitle: "Relajación total",
                alt: "Servicio de Manicure Spa completo"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/pedicure-spa.webp',
                title: "Pedicure Spa",
                subtitle: "Bienestar para tus pies",
                alt: "Pedicure Spa con masaje relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/esmaltado-semi.webp',
                title: "Esmaltado Semipermanente",
                alt: "Uñas con esmaltado de larga duración"
            },
            {
                type: 'image',
                layout: 'featured-video', // Destacado para mostrar el arte
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.webp',
                title: "Extensiones & Nail Art",
                subtitle: "Diseños exclusivos",
                alt: "Uñas acrílicas y diseños artísticos personalizados"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/retiro-semi.webp',
                title: "Cuidado de Uñas",
                alt: "Retiro profesional de esmalte y cuidado"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/unas/disenos-nailart.webp',
                title: "Tendencias Nail Art",
                subtitle: "Creatividad sin límites",
                alt: "Variedad de diseños de uñas modernos"
            }
        ]
    },
    'barberia-cortes-hombre': {
        gallery: [
            { type: 'logo-card', layout: 'vertical', src: 'images/brand/logo_narbos.webp', alt: 'Corte Clásico', title: 'Corte Clásico' },
            { type: 'logo-card', layout: 'square', src: 'images/brand/logo_narbos.webp', alt: 'Degradado', title: 'Degradado' },
            { type: 'logo-card', layout: 'horizontal', src: 'images/brand/logo_narbos.webp', alt: 'Perfilado', title: 'Perfilado de Barba' },
            { type: 'logo-card', layout: 'square', src: 'images/brand/logo_narbos.webp', alt: 'Estilo Moderno', title: 'Estilo Moderno' },
            { type: 'logo-card', layout: 'vertical', src: 'images/brand/logo_narbos.webp', alt: 'Ritual de Barba', title: 'Ritual de Barba' },
            { type: 'logo-card', layout: 'square', src: 'images/brand/logo_narbos.webp', alt: 'Corte Tijera', title: 'Corte a Tijera' },
            { type: 'logo-card', layout: 'horizontal', src: 'images/brand/logo_narbos.webp', alt: 'Acabados', title: 'Acabados Premium' }
        ]
    }
});
