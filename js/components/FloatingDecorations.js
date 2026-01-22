/**
 * Componente para manejar decoraciones flotantes con efecto Parallax.
 * Optimizado para Tailwind CSS v4 con diseño Responsivo.
 */
export class FloatingDecorations {
    /**
     * @param {string|Object} options - Base path string OR options object
     * @param {string} options.basePath - Path to assets (default './')
     * @param {boolean} options.enableAnimation - Whether to run the parallax loop (default true)
     * @param {Array} options.customConfig - Array of decoration configs to override defaults
     */
    constructor(options = {}) {
        this.config = {
            basePath: options.basePath || './',
            enableAnimation: options.enableAnimation !== false, // Default: true
            customConfig: options.customConfig || null
        };

        this.basePath = this.config.basePath;
        this.leaves = [];
        this.init();
    }

    init() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.injectDecorations();

        // Only start animation loop if enabled and motion is allowed
        if (this.config.enableAnimation && !prefersReducedMotion) {
            this.startParallaxLoop();
        }
    }

    injectDecorations() {
        const configs = this.getConfigs();

        configs.forEach((config) => {
            try {
                const parentSection = document.getElementById(config.parent);
                if (!parentSection) return;

                this.setupParentSection(parentSection);
                const leaf = this.createLeafElement(config);
                
                if (this.config.enableAnimation) {
                    this.registerForParallax(leaf, config);
                }

                parentSection.prepend(leaf);
                this.adjustZIndices(parentSection, leaf, config);

            } catch (err) {
                console.warn(`FloatingDecorations: Failed to inject leaf for ${config.parent}`, err);
            }
        });
    }

    getConfigs() {
        if (this.config.customConfig) return this.config.customConfig;

        const path = window.location.pathname;
        const isHomePage = path === '/' || (path.endsWith('index.html') && !path.includes('/servicios/'));
        const isServicePage = path.includes('/servicios/') || path.includes('peluqueria') || path.includes('barberia');
        
        // Configuración Base (Siempre presente en secciones comunes como FAQ)
        const baseConfig = [
            // --- Sección FAQ (Común en varias páginas) ---
            { 
                parent: 'faq', 
                img: 'ui/decorations/hoja-seca-3d.webp', 
                speed: 0.05,
                classes: 'w-24 -left-8 -top-10 -rotate-45 md:w-32 md:left-2 md:top-2 md:rotate-10 z-20' 
            }
        ];

        // Si es página de servicios, NO inyectamos en 'inicio' ni 'servicios' aquí 
        // porque asumimos que esas páginas pueden tener su propia lógica o no requieren 
        // la inyección automática en 'inicio' de la misma manera que Contacto/Nosotros.
        // O si queremos unificar, definimos explícitamente:
        
        if (isServicePage) {
            // En páginas de servicios reales, ya existen decoraciones inyectadas o maquetadas.
            // Retornamos solo la base (FAQ) para no duplicar ni romper lo existente.
            return baseConfig;
        }

        // Configuración para el HERO ('inicio')
        let heroConfig = [];

        if (isHomePage) {
            // --- Home: Decoraciones Grandes (Diseño Original) ---
            heroConfig = [
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-seca-3d.webp', 
                    speed: 0.1,
                    classes: 'w-20 -left-6 top-[10%] opacity-90 md:w-44 md:left-[-2%] md:opacity-100 z-10 rotate-45' 
                },
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-verde-3d.webp', 
                    speed: 0.15,
                    classes: 'w-24 -right-6 top-[40%] opacity-90 md:w-56 md:right-[15%] md:top-[35%] md:opacity-100 z-10 -rotate-12' 
                },
                // La Home también tiene decoraciones en la sección de servicios (intermedia)
                { 
                    parent: 'servicios', 
                    img: 'ui/decorations/hoja-seca-3d.webp', 
                    speed: 0.08,
                    classes: 'w-24 -right-2 top-24 md:w-48 md:-right-20 md:top-12 z-20' 
                },
                { 
                    parent: 'servicios', 
                    img: 'ui/decorations/hoja-verde-3d.webp', 
                    speed: 0.12,
                    classes: 'w-28 -left-4 top-1/2 md:w-40 md:-left-12 md:top-[40%] z-20' 
                }
            ];
        } else {
            // --- Internas (Nosotros/Contacto): Decoraciones Estilo Servicios (ESTÁTICAS) ---
            // Importante: Speed 0 para que no tengan movimiento parallax, igual que en Servicios.
            heroConfig = [
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-seca-3d.webp', 
                    speed: 0, // Sin movimiento
                    classes: 'w-24 -right-4 top-12 md:w-40 md:-right-12 md:top-20 z-30 opacity-90 rotate-[15deg]' 
                },
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-verde-3d.webp', 
                    speed: 0, // Sin movimiento
                    classes: 'w-28 -left-6 top-3/4 md:w-36 md:-left-8 md:top-[60%] z-30 opacity-90 -rotate-[15deg]' 
                }
            ];
        }

        return [...heroConfig, ...baseConfig];
    }

    setupParentSection(element) {
        if (window.getComputedStyle(element).position === 'static') {
            element.classList.add('relative');
        }
    }

    createLeafElement(config) {
        const leaf = document.createElement('img');
        leaf.src = `${this.basePath}images/${config.img}`;
        leaf.onerror = () => { 
            leaf.style.display = 'none';
            leaf.onerror = null; 
        };
        leaf.alt = '';
        leaf.className = `absolute pointer-events-none drop-shadow-2xl transition-transform duration-700 ease-out will-change-transform ${config.classes}`;
        return leaf;
    }

    registerForParallax(leaf, config) {
        leaf.setAttribute('data-speed', config.speed);
        // Guardamos la rotación base para el parallax
        const rotation = config.classes.includes('rotate-') ? '' : (config.parent === 'inicio' && config.img.includes('seca') ? 'rotate(45deg)' : 'rotate(-15deg)');
        
        this.leaves.push({
            element: leaf,
            speed: config.speed,
            rotation: rotation
        });
    }

    adjustZIndices(parentSection, leaf, config) {
        if (parentSection.children.length > 0) {
            Array.from(parentSection.children).forEach(child => {
               if (child !== leaf && child.nodeType === 1) {
                   const style = window.getComputedStyle(child);
                   if (style.position === 'static') {
                       child.classList.add('relative');
                   }
                   // Si la hoja no es z-10, el contenido debe ser z-10 para estar encima
                   if (!config.classes.includes('z-10')) {
                       child.classList.add('z-10');
                   }
               }
           });
       }
    }

    startParallaxLoop() {
        const animate = () => {
            const scrollY = window.scrollY;
            this.leaves.forEach(item => {
                const yOffset = scrollY * item.speed;
                item.element.style.transform = `${item.rotation} translateY(${yOffset}px)`;
            });
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}
