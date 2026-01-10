/**
 * Componente para manejar decoraciones flotantes con efecto Parallax.
 * Optimizado para Tailwind CSS v4 con diseño Responsivo.
 */
export class FloatingDecorations {
    constructor(basePath = './') {
        this.basePath = basePath;
        this.leaves = [];
        this.init();
    }

    init() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        this.injectDecorations();
        this.startParallaxLoop();
    }

    injectDecorations() {
        /**
         * Configuración de las hojas usando clases de Tailwind v4.
         * mobileClasses: Estilo por defecto (discreto para móvil).
         * desktopClasses: md: o lg: para el diseño inmersivo en PC.
         */
        const configs = [
            // --- Sección Inicio (Hero) ---
            { 
                parent: 'inicio', 
                img: 'hoja-seca-3d.webp', 
                speed: 0.1,
                classes: 'w-20 -left-4 top-[10%] opacity-70 md:w-44 md:left-[-1%] md:opacity-90 z-10' 
            },
            { 
                parent: 'inicio', 
                img: 'hoja-verde-3d.webp', 
                speed: 0.15,
                classes: 'w-24 -right-4 top-[40%] opacity-70 md:w-56 md:right-[15%] md:top-[35%] md:opacity-90 z-10' 
            },
            
            // --- Sección Servicios ---
            { 
                parent: 'servicios', 
                img: 'hoja-seca-3d.webp', 
                speed: 0.08,
                classes: 'w-24 -right-2 top-24 md:w-48 md:-right-20 md:top-12 z-20' 
            },
            { 
                parent: 'servicios', 
                img: 'hoja-verde-3d.webp', 
                speed: 0.12,
                classes: 'w-28 -left-4 top-1/2 md:w-40 md:-left-12 md:top-[40%] z-20' 
            },
            
            // --- Sección FAQ ---
            { 
                parent: 'faq', 
                img: 'hoja-seca-3d.webp', 
                speed: 0.05,
                classes: 'w-24 -left-8 -top-10 -rotate-45 md:w-32 md:left-2 md:top-2 md:rotate-10 z-20' 
            }
        ];

        configs.forEach((config) => {
            const parentSection = document.getElementById(config.parent);
            if (!parentSection) return;

            if (getComputedStyle(parentSection).position === 'static') {
                parentSection.classList.add('relative');
            }

            const leaf = document.createElement('img');
            // Fix: Use basePath for image paths to support subdirectories
            leaf.src = `${this.basePath}images/${config.img}`; 
            leaf.onerror = () => { leaf.src = `${this.basePath}images/leaf-placeholder.svg`; };
            leaf.alt = '';
            
            // Aplicamos las clases de Tailwind (Posicionamiento absoluto, pointer-events y el drop-shadow 3D)
            // Agregamos 'drop-shadow-xl' o un filtro personalizado vía clase si se prefiere, 
            // pero para mantener el control preciso del drop-shadow 3D usamos una clase de utilidad.
            leaf.className = `absolute pointer-events-none transition-transform duration-100 ease-linear ${config.classes}`;
            
            // Aplicamos el filtro 3D que es constante
            leaf.style.filter = 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))';

            this.leaves.push({
                element: leaf,
                speed: config.speed,
                // Guardamos la rotación base para el parallax
                rotation: config.classes.includes('rotate-') ? '' : (config.parent === 'inicio' && config.img.includes('seca') ? 'rotate(45deg)' : 'rotate(-15deg)')
            });

            parentSection.prepend(leaf);
            
            // Aseguramos que el contenido esté sobre las hojas
            Array.from(parentSection.children).forEach(child => {
                if (child !== leaf) {
                    if (getComputedStyle(child).position === 'static') {
                        child.classList.add('relative');
                    }
                    // Si la hoja no es z-10, el contenido debe ser z-10
                    if (!config.classes.includes('z-10')) {
                        child.classList.add('z-10');
                    } else {
                        // En Hero, el contenido ya es z-20 por HTML
                    }
                }
            });
        });
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
