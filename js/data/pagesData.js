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
    'home': {
        metaTitle: "Narbo's Salón Spa | Peluquería, Barbería y Estética en Chía",
        metaDescription: "Bienvenida a Narbo's Salón Spa en Chía. Expertos en Balayage, Barbería Premium, Uñas Spa y Estética Facial. Reserva tu cita hoy y vive una experiencia única.",
    },
    'blog': {
        metaTitle: "Blog de Belleza y Bienestar | Consejos Narbo's Salón Chía",
        metaDescription: "Descubre tips de cuidado capilar, tendencias en coloración, mitos sobre el corte de pelo y mucho más en el blog oficial de Narbo's Salón Spa.",
    },
    'peluqueria': {
        hero: {
            title: "Peluquería en Chía: expertos en estilo, color <span class=\"text-brand-green\">y bienestar</span>",
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
            title: "Barbería exclusiva <span class=\"text-brand-green\">en Chía</span>",
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
           title: "Nuestra <span class=\"text-brand-green\">historia</span>",
           subtitle: "Pasión por la belleza y el bienestar desde 2013.",
           imageSrc: "images/brand/logo_narbos.webp",
           imageAlt: "Equipo de Narbo's Salon",
           variant: 'logo'
       }
   },
   contacto: {
        hero: {
            title: "Ponte en <span class=\"text-brand-green\">Contacto</span>",
            subtitle: "Estamos listos para transformar tu día. Visítanos en nuestra nueva sede.",
            imageSrc: "images/blog/foto_fachada.webp",
            imageAlt: "Recepción de Narbos Salon en Chia"
        }
   },
    'cortes-de-pelo': {
        hero: {
            title: "Cortes de pelo en Chía: Estilo y <span class=\"text-brand-green\">Tendencia</span>",
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
                src: '../../images/pages/peluqueria/cortes-de-pelo-profesionales-chia.webp',
                title: "Cortes Modernos",
                alt: "Resultado de corte profesional en Narbo's"
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
        hero: {
            title: "Balayage y Mechas en Chía: Expertos en <span class=\"text-brand-green\">Iluminación</span>",
            subtitle: "Técnicas avanzadas de aclaración, babylights y contornos para un rubio espectacular.",
            imageSrc: "../../images/pages/peluqueria/balayage-rubio-perfecto-ondas-chia-narbos.webp",
            imageAlt: "Diseño de balayage profesional en Narbo's Salon"
        },
        metaTitle: "Balayage y Mechas en Chía | Especialistas en Rubios | Narbo's",
        metaDescription: "Consigue el rubio de tus sueños con nuestras técnicas de Balayage, Mechas y Babylights en Chía. Expertos en iluminación capilar y salud de tu fibra.",
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
        hero: {
            title: "Color y Tinturas en Chía: Cobertura y <span class=\"text-brand-green\">Brillo</span>",
            subtitle: "Expertos en color global, retoque de raíz y cubrimiento total de canas con marcas premium.",
            imageSrc: "../../images/pages/peluqueria/color-tintura-cabello-profesional-chia.webp",
            imageAlt: "Servicio de coloración profesional en Narbo's"
        },
        metaTitle: "Coloración y Tinturas en Chía | Cubrimiento de Canas | Narbo's",
        metaDescription: "Especialistas en tintura global, retoque de raíz y matización en Chía. Brindamos cobertura 100% de canas y brillo duradero para tu cabello.",
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
        title: "Recuperación <span class=\"text-brand-green\">Capilar</span>",
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
            title: "Estética y Spa <span class=\"text-brand-green\">en Chía</span>",
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
                src: 'images/pages/estetica/terapia-piedras-calientes-spa-chia.webp',
                title: "Masaje Relajante",
                subtitle: "Piedras Calientes",
                alt: "Masaje relajante con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/masaje-relajante-piedras-calientes-espalda-chia.webp',
                title: "Relax Total",
                subtitle: "Espalda",
                alt: "Masaje de piedras calientes espalda"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/tratamiento-despigmentante-mascarilla-facial.webp',
                title: "Despigmentante",
                subtitle: "Mascarilla",
                alt: "Tratamiento con mascarilla facial"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/radiofrecuencia-reduccion-corporal-chia.webp',
                title: "Moldeamiento Corporal",
                alt: "Radiofrecuencia para reducción y moldeo"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: 'images/pages/estetica/masaje-descontracturante-cuerpo-chia.webp',
                title: "Descontracturante",
                subtitle: "Alivio y Bienestar",
                alt: "Masaje descontracturante profesional"
            }
        ]
    },
    'limpieza-facial': {
        hero: {
            title: "Limpieza Facial Profunda <span class=\"text-brand-green\">en Chía</span>",
            subtitle: "Elimina impurezas, puntos negros y toxinas con tecnología de alta frecuencia.",
            imageSrc: "../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp",
            imageAlt: "Limpieza de cutis profunda en Chía"
        },
        metaTitle: "Limpieza Facial Profunda en Chía | Extracción e Impurezas | Narbo's",
        metaDescription: "Recupera la pureza de tu piel con nuestra limpieza facial profunda en Chía. Alta frecuencia, extracción de puntos negros y nutrición para tu cutis.",
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
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-espalda-chia.webp',
                title: "Relajación Total",
                subtitle: "Complemento ideal",
                alt: "Tratamiento facial relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/tratamiento-despigmentante-mascarilla-facial.webp',
                title: "Mascarilla",
                alt: "Aplicación de mascarilla facial despigmentante"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/microdermoabrasion-hidrofacial-equipos-chia.webp',
                title: "Tecnología Avanzada",
                subtitle: "Resultados visibles",
                alt: "Equipos de hidrofacial y microdermoabrasión"
            }
        ]
    },
    'cejas-y-pestanas': {
        galleryOptions: { isolateItems: true }, // Aísla cada item de la galería (comportamiento solicitado)
        hero: {
            title: "Cejas y <span class=\"text-brand-green\">Pestañas</span>",
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
        hero: {
            title: "Spa Facial Integral: Rejuvenecimiento y <span class=\"text-brand-green\">Relax</span>",
            subtitle: "Rituales de bienestar para tu rostro que combinan nutrición profunda y máxima relajación.",
            imageSrc: "../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp",
            imageAlt: "Spa facial integral y masajes relajantes en Chía"
        },
        metaTitle: "Spa Facial Integral en Chía | Rejuvenecimiento y Bienestar | Narbo's",
        metaDescription: "Vive una experiencia de lujo con nuestro Spa Facial Integral en Chía. Hidratación, masajes faciales y terapias de rejuvenecimiento en un ambiente único.",
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.webp',
                title: "Masaje Facial",
                subtitle: "Relajación Profunda",
                alt: "Masaje facial relajante en Narbo's"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.webp',
                title: "Alta Frecuencia",
                subtitle: "Limpieza Profunda",
                alt: "Limpieza facial con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/microdermoabrasion-hidrofacial-equipos-chia.webp',
                title: "Hidrofacial",
                alt: "Sesión de hidrofacial profesional"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/tratamiento-despigmentante-mascarilla-facial.webp',
                title: "Mascarilla",
                subtitle: "Nutrición Intensiva",
                alt: "Mascarilla facial nutritiva"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/spa-hero.webp',
                title: "Ambiente Spa",
                alt: "Cabina de estética y spa"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/microdermoabrasion-hidrofacial-equipos-chia.webp',
                title: "Equipos de Vanguardia",
                subtitle: "Tecnología Estética",
                alt: "Equipamiento de hidrofacial y estética"
            }
        ]
    },

    'masajes-relajantes': {
        gallery: [
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-espalda-chia.webp',
                title: "Piedras Calientes",
                subtitle: "Terapia térmica",
                alt: "Masaje con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/terapia-piedras-calientes-spa-chia.webp',
                title: "Ambiente Spa",
                subtitle: "Relax Total",
                alt: "Ambiente relajante de spa"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje-descontracturante-cuerpo-chia.webp',
                title: "Descontracturante",
                alt: "Masaje profundo para alivio muscular"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/radiofrecuencia-reduccion-corporal-chia.webp',
                title: "Radiofrecuencia",
                subtitle: "Moldeamiento",
                alt: "Tratamiento de reducción y moldeamiento"
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
                layout: 'featured-video', // Movidó aquí para encajar con el vertical en móvil (1+1 cols) y escritorio (1+2+1 cols de squares)
                src: '../../images/pages/unas/unas-acrilicas-tendencia-2026-chia.webp', // Actualizado a la imagen tendencia 2026
                title: "Extensiones & Nail Art",
                subtitle: "Diseños exclusivos",
                alt: "Uñas acrílicas y diseños artísticos personalizados"
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
                layout: 'horizontal',
                src: '../../images/pages/unas/disenos-nailart.webp',
                title: "Tendencias Nail Art",
                subtitle: "Creatividad sin límites",
                alt: "Variedad de diseños de uñas modernos"
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
                layout: 'square',
                src: '../../images/pages/unas/diseno-unas-arte-mano-alzada-chia.webp',
                title: "Arte a Mano Alzada",
                subtitle: "Diseño exclusivo",
                alt: "Diseño de uñas a mano alzada en Chía"
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
                subtitle: "Limpieza profunda",
                alt: "Servicio de Manicure Spa completo"
            },
            {
                type: 'image',
                layout: 'featured-video',
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.webp',
                title: "Nail Art & Diseño",
                subtitle: "Arte a mano alzada",
                alt: "Uñas acrílicas y diseños artísticos personalizados"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/manicure-ruso-detalle-perfecto-narbos.webp',
                title: "Manicure Ruso",
                alt: "Detalle de manicure ruso con acabado impecable"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/manicure-diseno-unas-glitter-elegantes-narbos-salon-spa-chia.webp',
                title: "Diseño con Glitter",
                alt: "Uñas decoradas con glitter y destellos"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/unas/disenos-nailart.webp',
                title: "Tendencias 2026",
                subtitle: "Creatividad extrema",
                alt: "Variedad de diseños de uñas modernos"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/diseno-unas-arte-mano-alzada-chia.webp',
                title: "Nail Art",
                alt: "Diseños personalizados hechos a mano"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/esmaltado-semi.webp',
                title: "Esmaltado Semipermanente",
                alt: "Uñas con brillo de larga duración"
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
                alt: "Sesión de manicure spa relajante"
            },
            {
                type: 'image',
                layout: 'featured-video',
                src: '../../images/pages/unas/pedicure-spa-relax-experiencia-chia.webp',
                title: "Pedicure Spa",
                subtitle: "Bienestar para tus pies",
                alt: "Experiencia completa de pedicure spa"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/pedicure-spa.webp',
                title: "Salud y Estética",
                alt: "Cuidado profesional de pies"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/esmaltado-semi.webp',
                title: "Brillo Duradero",
                alt: "Uñas perfectas por 21 días"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/unas/manicura-perfecta-tono-vino-elegante-narbos-salon-spa-chia.webp',
                title: "Clásicos Elegantes",
                subtitle: "Tono vino profundo",
                alt: "Manicura elegante en color vino"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/retiro-semi.webp',
                title: "Cuidado Técnico",
                alt: "Retiro seguro de semipermanente"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/unas/manicure-diseno-premium-narbos-salon-spa-chia-cundinamarca-belleza-integral.webp',
                title: "Belleza Integral",
                alt: "Detalle de manicura de alta calidad"
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
