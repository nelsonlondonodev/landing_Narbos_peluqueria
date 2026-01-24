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

                // --- FIX: Prevent Duplicates ---
                // If this parent already has a specific leaf type injected by this component, skip to avoid "double leaves".
                // We use a specific class 'floating-decoration-leaf' to identify our own elements.
                // We also check if the image source matches to allow multiple DIFFERENT leaves but not same ones.
                const existingLeaves = parentSection.querySelectorAll('.floating-decoration-leaf');
                let isDuplicate = false;
                existingLeaves.forEach(leaf => {
                    if (leaf.src.includes(config.img)) {
                        isDuplicate = true;
                    }
                });

                if (isDuplicate) return; 

                this.setupParentSection(parentSection);
                const leaf = this.createLeafElement(config);
                
                // --- FIX: Animation Conflict ---
                // Only register for parallax loop if speed is > 0.
                // If speed is 0, we let CSS animations (like 'animate-leaf-enter-...') handle the movement 
                // without JS overriding the 'transform' property every frame.
                if (this.config.enableAnimation && config.speed > 0) {
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
        
        // Base Config (FAQ Section)
        const baseConfig = [
            { 
                parent: 'faq', 
                img: 'ui/decorations/hoja-seca-3d.webp', 
                speed: 0.15,
                wrapperClasses: '-left-8 -top-10 md:left-2 md:top-2 z-20',
                imgClasses: 'w-24 md:w-32 -rotate-45 md:rotate-10'
            }
        ];

        let heroConfig = [];

        if (isHomePage) {
            // --- Home: Original Decorations ---
            heroConfig = [
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-seca-3d.webp', 
                    speed: 0.25,
                    wrapperClasses: '-left-6 top-[10%] md:left-[-2%] z-10',
                    imgClasses: 'w-20 md:w-44 rotate-45 opacity-90 md:opacity-100'
                },
                { 
                    parent: 'inicio', 
                    img: 'ui/decorations/hoja-verde-3d.webp', 
                    speed: 0.35,
                    wrapperClasses: '-right-6 top-[40%] md:right-[15%] md:top-[35%] z-10',
                    imgClasses: 'w-24 md:w-56 -rotate-12 opacity-90 md:opacity-100'
                },
                // Home Services section decorations
                { 
                    parent: 'servicios', 
                    img: 'ui/decorations/hoja-seca-3d.webp', 
                    speed: 0.2,
                    wrapperClasses: '-right-2 top-24 md:-right-20 md:top-12 z-20',
                    imgClasses: 'w-24 md:w-48'
                },
                { 
                    parent: 'servicios', 
                    img: 'ui/decorations/hoja-verde-3d.webp', 
                    speed: 0.3,
                    wrapperClasses: '-left-4 top-1/2 md:-left-12 md:top-[40%] z-20',
                    imgClasses: 'w-28 md:w-40' 
                }
            ];
        } else {
            // --- Internal Pages & Services ---
            
            if (isServicePage) {
                 heroConfig = [
                    { 
                        parent: 'inicio', 
                        img: 'ui/decorations/hoja-seca-3d.webp', 
                        speed: 0, 
                        wrapperClasses: '-right-4 top-12 md:-right-12 md:top-20 z-30',
                        imgClasses: 'w-24 md:w-56 rotate-[15deg] animate-leaf-enter-right' 
                    },
                    { 
                        parent: 'inicio', 
                        img: 'ui/decorations/hoja-verde-3d.webp', 
                        speed: 0, 
                        wrapperClasses: '-left-6 top-3/4 md:-left-16 md:bottom-20 z-30',
                        imgClasses: 'w-28 md:w-48 -rotate-[15deg] animate-leaf-enter-left' 
                    }
                ];
            } else {
                // Default Internal (Nosotros/Contacto)
                 heroConfig = [
                    { 
                        parent: 'inicio', 
                        img: 'ui/decorations/hoja-seca-3d.webp', 
                        speed: 0, 
                        wrapperClasses: '-right-4 top-12 md:-right-12 md:top-20 z-30',
                        imgClasses: 'w-24 md:w-40 rotate-[15deg] opacity-90'
                    },
                    { 
                        parent: 'inicio', 
                        img: 'ui/decorations/hoja-verde-3d.webp', 
                        speed: 0, 
                        wrapperClasses: '-left-6 top-3/4 md:-left-8 md:top-[60%] z-30',
                        imgClasses: 'w-28 md:w-36 -rotate-[15deg] opacity-90' 
                    }
                ];
            }
        }

        return [...heroConfig, ...baseConfig];
    }

    setupParentSection(element) {
        if (window.getComputedStyle(element).position === 'static') {
            element.classList.add('relative');
        }
    }

    createLeafElement(config) {
        // Wrapper: Responsible for Position (Top/Left) and Parallax Movement (Transform)
        const wrapper = document.createElement('div');
        wrapper.className = `floating-decoration-wrapper absolute pointer-events-none will-change-transform ${config.wrapperClasses}`;
        
        // Image: Responsible for Appearance (Size, Rotation, Opacity, Entry Animation)
        const leaf = document.createElement('img');
        leaf.src = `${this.basePath}images/${config.img}`;
        leaf.onerror = () => { 
            wrapper.style.display = 'none';
        };
        leaf.alt = '';
        leaf.className = `floating-decoration-leaf block drop-shadow-2xl transition-transform duration-700 ease-out ${config.imgClasses}`;
        
        wrapper.appendChild(leaf);
        
        // We return the wrapper to be appended, but we also attach the element ref for parallax usage
        wrapper._parallaxTarget = wrapper; 
        
        return wrapper;
    }

    registerForParallax(wrapper, config) {
        wrapper.setAttribute('data-speed', config.speed);
        
        this.leaves.push({
            element: wrapper,
            speed: config.speed
            // No rotation needed here because rotation is CSS-handled on the inner image
        });
    }

    adjustZIndices(parentSection, wrapper, config) {
        if (parentSection.children.length > 0) {
            Array.from(parentSection.children).forEach(child => {
                // Skip our own wrapper and non-element nodes
               if (child !== wrapper && child.nodeType === 1) {
                   const style = window.getComputedStyle(child);
                   if (style.position === 'static') {
                       child.classList.add('relative');
                   }
                   // If the decoration is not z-10 (high layer), content should be above it
                   if (!config.wrapperClasses.includes('z-10')) {
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
                // Simply move the wrapper. No need to worry about rotation/scale preservation.
                item.element.style.transform = `translateY(${yOffset}px)`;
            });
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}
