/**
 * Componente para manejar decoraciones flotantes con efecto Parallax.
 * Añade profundidad visual sin interferir con el contenido principal.
 */
export class FloatingDecorations {
    constructor() {
        this.leaves = [];
        this.init();
    }

    init() {
        // Solo inicializar si no estamos en un dispositivo muy pequeño o si el usuario prefiere movimiento reducido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        this.injectDecorations();
        this.startParallaxLoop();
    }

    injectDecorations() {
        // Configuración de las hojas: Ubicación, imagen y velocidad de parallax
        // Usamos IDs de imagen numéricos para rotar entre diferentes assets
        const configs = [
            // Sección Inicio (Hero)
            { top: '10%', left: '-5%', size: '180px', rotate: '45deg', speed: 0.1, parent: 'inicio', img: 'hoja-seca-3d.png' },
            { top: '70%', right: '-8%', size: '220px', rotate: '-15deg', speed: 0.15, parent: 'inicio', img: 'hoja-verde-3d.png' },
            
            // Sección Servicios
            { top: '50px', right: '-80px', size: '200px', rotate: '120deg', speed: 0.08, parent: 'servicios', img: 'hoja-seca-3d.png' },
            { top: '40%', left: '-60px', size: '160px', rotate: '200deg', speed: 0.12, parent: 'servicios', img: 'hoja-verde-3d.png' },
            
            // Sección FAQ (si existe)
            { top: '10px', left: '10px', size: '120px', rotate: '10deg', speed: 0.05, parent: 'faq', img: 'hoja-seca-3d.png' }
        ];

        configs.forEach((config) => {
            const parentSection = document.getElementById(config.parent);
            if (!parentSection) return;

            // Aseguramos contexto de posicionamiento
            if (getComputedStyle(parentSection).position === 'static') {
                parentSection.classList.add('relative');
            }

            const leaf = document.createElement('img');
            // Asignamos la ruta a la imagen real (el usuario debe proveer estos archivos en /images/)
            // Fallback temporal al placeholder si no existen
            leaf.src = `images/${config.img}`; 
            leaf.onerror = () => { leaf.src = 'images/leaf-placeholder.svg'; }; // Fallback seguro
            
            leaf.alt = ''; // Decorativo
            leaf.classList.add('floating-leaf', 'absolute', 'pointer-events-none', 'z-0');
            
            // Estilos para posicionamiento y tamaño
            leaf.style.width = config.size;
            leaf.style.top = config.top;
            if (config.left) leaf.style.left = config.left;
            if (config.right) leaf.style.right = config.right;
            
            // Transformación inicial
            leaf.style.transform = `rotate(${config.rotate})`;
            leaf.style.transition = 'transform 0.1s linear'; 
            
            // *** CORRECCIÓN VISUAL: Sombra específica para efecto 3D ***
            leaf.style.filter = 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))';
            
            // Ajustamos opacidad para que no compita demasiado, pero sea visible como imagen real
            leaf.style.opacity = '0.9';

            this.leaves.push({
                element: leaf,
                speed: config.speed
            });

            parentSection.prepend(leaf);
            
            // Gestión de z-index para asegurar que el contenido esté siempre encima
            Array.from(parentSection.children).forEach(child => {
                if (child !== leaf) {
                    // Si el elemento ya tiene posición (relative/absolute), solo ajustamos z-index
                    // Si es static, lo volvemos relative para que z-index aplique
                    const style = getComputedStyle(child);
                    if (style.position === 'static') {
                        child.classList.add('relative');
                    }
                    child.classList.add('z-10');
                }
            });
        });
    }

    startParallaxLoop() {
        const animate = () => {
            const scrollY = window.scrollY;
            
            this.leaves.forEach(item => {
                const yOffset = scrollY * item.speed;
                // Extraemos la rotación inicial guardada en el estilo inline
                // (O podríamos guardarla en el objeto item para mayor limpieza, pero esto funciona)
                const currentTransform = item.element.style.transform || '';
                const rotateMatch = currentTransform.match(/rotate\(([^)]+)\)/);
                const rotation = rotateMatch ? rotateMatch[0] : 'rotate(0deg)';
                
                item.element.style.transform = `${rotation} translateY(${yOffset}px)`;
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }
}
