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
            imageSrc: "images/pages/peluqueria/estilismo-barba.webp",
            imageAlt: "Servicio de peluquería profesional en Narbo's"
        },
        gallery: [
            {
                type: 'video',
                layout: 'featured-video', // 9:16 vertical on mobile, 2x2 on desktop
                src: 'video/video_instagram_1.mp4',
                poster: 'images/pages/peluqueria/hair-hero.jpg',
                title: "Experiencia Narbo's",
                subtitle: "Vive el cambio",
                alt: "Video de experiencia en Narbo's Salon"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: 'images/pages/peluqueria/color-tratamiento.webp',
                title: "Color profundo",
                alt: "Balayage y tintes de color profundo"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/mechas-balayage-detalle.webp',
                title: "Iluminaciones",
                alt: "Detalle de mechas balayage"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/balayage-rubio-iluminado-corte-capas-narbos-salon-spa-chia.JPG',
                title: "Rubios",
                alt: "Balayage rubio iluminado"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/estilismo-barba.webp',
                title: "Cortes",
                alt: "Cortes de diseño y estilismo"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: 'images/pages/peluqueria/narbos-salon-spa-chia-peinado-tendencia-trenzas-laterales-ondas-sueltas Large.jpeg',
                title: "Peinados",
                alt: "Peinados de tendencia y ondas sueltas"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Spa Capilar",
                alt: "Lavado y spa capilar relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/imagen-balayage_chia.jpeg',
                title: "Babylights",
                alt: "Técnica de babylights en cabello"
            },
            {
                type: 'image',
                layout: 'square', // Originalmente era un bloque de cierre, lo dejaremos square o vertical según ajuste. En el HTML era col-span-2 md:col-span-1. Haremos square para mobile y desktop consistente.
                src: 'images/pages/peluqueria/lavado-spa-capilar.webp', // Nota: imagen repetida en origin, verificar si usar otra.
                title: "Tratamientos",
                alt: "Tratamientos capilares profundos"
            }
        ]
    },
    barberia: {
         hero: {
            title: "Barbería exclusiva en Chía",
            subtitle: "El espacio que mereces para cuidar tu imagen.",
            imageSrc: "images/pages/barberia/barber-hero.jpg",
            imageAlt: "Servicios de barbería profesional en Chía"
        }
    },
    nosotros: {
        hero: {
           title: "Nuestra historia",
           subtitle: "Pasión por la belleza y el bienestar desde 2013.",
           imageSrc: "", // En nosotros.html el hero actual es solo color de fondo con SVG, no tiene imagen. Se puede ajustar HeroSection.js para manejar esto o asignar una imagen nueva. Por ahora simularemos el comportamiento actual o se usará placeholder.
           // Nota: El Hero actual de nosotros.html NO tiene imagen de fondo, es un bg-brand-green sólido con un SVG.
           // El componente HeroSection.js probablemente espera una imagen.
           // Si asigno una imagen, cambiará el diseño. Si el usuario quiere el diseño actual (solo texto + color + svg), el componente HeroSection estándar QUIZÁS no sea 100% compatible sin modificarlo.
           // Sin embargo, el usuario pidió "traer el componente HeroSection".
           // Voy a definirlo aquí, pero tendré que ver cómo HeroSection maneja la falta de imagen o si debo añadir una.
           // Dado que el usuario dijo "traer los componentes", asumiré que quiere un Hero estándar con imagen, o adaptaré el Hero.
           // Voy a usar una imagen de placeholder coherente o vacía si el componente lo permite. 
           imageSrc: "images/team/Team_1.webp", // Usaré la imagen del equipo como fondo temporalmente para probar el componente, o una textura.
           imageAlt: "Equipo de Narbo's Salon"
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
        gallery: [
            {
                type: 'video',
                layout: 'featured-video',
                src: 'video/video_instagram_1.mp4',
                poster: 'images/pages/peluqueria/corte-de-cabello-color-en-chia.webp',
                title: "Experiencia Narbo's",
                subtitle: "Vive el cambio",
                alt: "Video de experiencia en Narbo's Salon"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/corte_pixie_mujer_chia.jpeg',
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
                src: '../../images/pages/peluqueria/corte_bob_chia.jpeg',
                title: "Corte Bob",
                alt: "Corte Bob en Chía"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/peluqueria/corte_capas_chia.jpeg',
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
                layout: 'vertical', 
                src: '../../images/pages/peluqueria/casos_exito/correccion-rubio-extremo-cabello-danado-despues.jpg',
                title: "Corrección Total",
                subtitle: "De maltratado a rubio perfecto",
                alt: "Resultado final: Corrección de color exitosa y diseño de balayage rubio luminoso.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/correccion-rubio-extremo-cabello-danado-antes.jpg',
                        alt: 'Antes: Cabello con manchas y daño severo recuperado.'
                    }
                ]
            },
            // Caso 1: Rubio Iluminación
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-despues.jpg',
                title: "Rubio Soñado",
                subtitle: "Iluminación balayage",
                alt: "Diseño de color rubio con técnica balayage.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-antes.jpg',
                        alt: 'Estado inicial antes del diseño de color.'
                    }
                ]
            },
            // Caso 2: Corrección Miel (Logic fixed by file renaming)
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/correccion-color-balayage-miel-chia-despues.jpg',
                title: "Cambio de Look",
                subtitle: "Renovación total",
                alt: "Renovación de imagen con color y corte.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/correccion-color-balayage-miel-chia-antes.jpg',
                        alt: 'Antes del cambio de look.'
                    }
                ]
            },
            // Caso 3: Rubio Perla
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-despues.jpg',
                title: "Rubio Perla",
                subtitle: "Corrección y diseño",
                alt: "Balayage rubio perla con corrección de color.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-antes.jpg',
                        alt: 'Estado inicial antes del balayage rubio perla.'
                    }
                ]
            },
            // Caso 4: Rubio Dorado
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-dorado-chia-despues.jpg',
                title: "Rubio Dorado",
                subtitle: "Luz natural",
                alt: "Balayage en tonos dorados cálidos.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-dorado-chia-antes.jpg',
                        alt: 'Estado antes de la iluminación dorada.'
                    }
                ]
            },
            // Caso 5: Rubio Tendencia (Nuevo)
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-tendencia-chia-despues.jpg',
                title: "Rubio Tendencia",
                subtitle: "Diseño de autor",
                alt: "Balayage rubio tendencia 2026 realizado por expertos.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-tendencia-chia-antes.jpg',
                        alt: 'Antes del cambio de look de tendencia.'
                    }
                ]
            },
            // Caso 6: Rubio Iluminación (Faltante)
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-despues.jpg',
                title: "Iluminación Sutil",
                subtitle: "Efecto natural",
                alt: "Balayage con técnica de iluminación suave.",
                subImages: [
                    {
                        src: '../../images/pages/peluqueria/casos_exito/balayage-rubio-iluminacion-chia-antes.jpg',
                        alt: 'Cabello antes de la iluminación.'
                    }
                ]
            }
        ]
    },
    'color-tinturas-cabello': {
        title: "Expertos en Color",
        description: "Resultados vibrantes, cobertura perfecta de canas y cuidado intensivo para tu fibra capilar.",
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/color-tratamiento.webp',
                title: "Cobertura Total",
                subtitle: "Coloración premium",
                alt: "Tintura completa y cobertura de canas"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/correccion_color_antes_despues_chia.JPG',
                title: "Rubios Fríos",
                alt: "Matización de tonos amarillos y naranjas"
            },
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-despues.jpg', 
                title: "Brillo Espejo",
                subtitle: "Resultados increíbles",
                alt: "Balayage rubio brillante y saludable"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Cuidado Post-Color",
                subtitle: "Spa Capilar",
                alt: "Tratamiento de hidratación profunda post-color"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/Resultado-Balayage-Peluqueria-en-Chia-cerca-de-Cajica-Narbos.jpeg',
                title: "Salud Capilar",
                alt: "Cabello sano y brillante después del tinte"
            }
        ]
    },
    'tratamientos-capilares': {
        title: "Recuperación Capilar",
        description: "Terapias profundas para devolver la fuerza, el brillo y la suavidad a tu cabello.",
        gallery: [
             {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Spa Capilar",
                subtitle: "Relajación y Salud",
                alt: "Lavado y masaje capilar profundo"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/hair-hero.jpg',
                title: "Brillo Extremo",
                alt: "Cabello sano y brillante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/peluqueria/color-tratamiento.webp',
                title: "Nutrición",
                alt: "Aplicación de tratamiento nutritivo"
            },
            {
                type: 'featured-video', // Si no hay video, usaré imagen de respaldo por ahora para no romper
                layout: 'horizontal',
                src: '../../images/pages/peluqueria/casos_exito/balayage-correccion-rubio-claro-chia-despues.jpg', // Placeholder de calidad
                title: "Resultados Visibles",
                subtitle: "Antes y Después",
                alt: "Cabello recuperado tras tratamiento"
            }
        ]
    },
    estetica: {
        hero: {
            title: "Estética y Spa en Chía",
            subtitle: "Relájate y renueva tu energía con nuestros tratamientos faciales y corporales.",
            imageSrc: "images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia.%20copy%20Large.jpeg",
            imageAlt: "Tratamientos de spa y estética en Narbo's"
        },
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: 'images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.jpeg',
                title: "Limpieza Facial",
                subtitle: "Piel Radiante",
                alt: "Limpieza facial profunda con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.jpeg',
                title: "Masaje Relajante",
                subtitle: "Piedras Calientes",
                alt: "Masaje relajante con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/estetica/masaje_reductor.jpeg',
                title: "Tratamiento Corporal",
                alt: "Masaje reductor y moldeador"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: 'images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.jpeg',
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
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.jpeg',
                title: "Alta Frecuencia",
                subtitle: "Tecnología Facial",
                alt: "Limpieza facial profunda con alta frecuencia"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.jpeg',
                title: "Relajación Total",
                subtitle: "Complemento ideal",
                alt: "Tratamiento facial relajante"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje_reductor.jpeg',
                title: "Mascarilla",
                alt: "Aplicación de mascarilla facial"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.jpeg',
                title: "Piel Radiante",
                subtitle: "Resultados visibles",
                alt: "Piel luminosa y limpia"
            }
        ]
    },
    'masajes-relajantes': {
        gallery: [
            {
                type: 'image',
                layout: 'vertical',
                src: '../../images/pages/estetica/masaje-relajante-piedras-calientes-narbos-salon-spa-chia copy Large.jpeg',
                title: "Piedras Calientes",
                subtitle: "Terapia térmica",
                alt: "Masaje con piedras calientes"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/servicio-de-spa-en-chia-masaje-facial-relajante-narbos copy Large.jpeg',
                title: "Ambiente Spa",
                subtitle: "Relax Total",
                alt: "Ambiente relajante de spa"
            },
            {
                type: 'image',
                layout: 'square',
                src: '../../images/pages/estetica/masaje_reductor.jpeg',
                title: "Masaje Corporal",
                alt: "Masaje reductor y relajante"
            },
            {
                type: 'image',
                layout: 'horizontal',
                src: '../../images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia. copy Large.jpeg',
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
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.jpeg',
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
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.jpeg',
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
                src: '../../images/pages/unas/unas-decoradas-personalizadas-narbos-salon-spa-chia-cundinamarca.jpeg',
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
    }
});
