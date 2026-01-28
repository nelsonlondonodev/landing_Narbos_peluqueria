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
         gallery: [
             {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/corte-de-cabello-color-en-chia.webp',
                title: "Corte Dama",
                alt: "Corte dama"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/mechas-balayage-detalle.webp',
                title: "Detalle Mechas",
                alt: "Peinado novia" // Keeping original alt though title suggests mechas
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/color-tratamiento.webp',
                title: "Coloración",
                alt: "Coloración balayage"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Tratamiento",
                alt: "Tratamiento capilar"
            }
        ]
    },
    'tratamientos-capilares': {
        gallery: [
             {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/corte-de-cabello-color-en-chia.webp',
                title: "Corte Dama",
                alt: "Corte dama"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/mechas-balayage-detalle.webp',
                title: "Detalle",
                alt: "Peinado novia"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/color-tratamiento.webp',
                title: "Coloración",
                alt: "Coloración balayage"
            },
            {
                type: 'image',
                layout: 'square',
                src: 'images/pages/peluqueria/lavado-spa-capilar.webp',
                title: "Spa Capilar",
                alt: "Tratamiento capilar"
            }
        ]
    },
    estetica: {
        hero: {
            title: "Estética y Spa en Chía",
            subtitle: "Relájate y renueva tu energía con nuestros tratamientos faciales y corporales.",
            imageSrc: "images/pages/estetica/limpieza-facial-profunda-spa-en-chia-alta-frecuencia.%20copy%20Large.jpeg",
            imageAlt: "Tratamientos de spa y estética en Narbo's"
        }
    }
});
