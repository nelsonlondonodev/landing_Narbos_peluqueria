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
        const configs = [
            // --- Sección Inicio (Hero) ---
            // Hoja Seca Izquierda: Movida hacia la derecha para morder la imagen (left: -1% en lugar de -5%)
            // Z-Index: 10 (Entre imagen z-0 y texto z-20)
            { top: '10%', left: '-1%', size: '180px', rotate: '45deg', speed: 0.1, parent: 'inicio', img: 'hoja-seca-3d.png', zIndex: 'z-10' },
            
            // Hoja Verde Derecha: Subida y movida a la izquierda drásticamente para superponerse claramente sobre la modelo
            // Z-Index: 10 (Entre imagen z-0 y texto z-20)
            { top: '35%', right: '15%', size: '220px', rotate: '-15deg', speed: 0.15, parent: 'inicio', img: 'hoja-verde-3d.png', zIndex: 'z-10' },
            
            // --- Sección Servicios ---
            { top: '50px', right: '-80px', size: '200px', rotate: '120deg', speed: 0.08, parent: 'servicios', img: 'hoja-seca-3d.png', zIndex: 'z-0' },
            { top: '40%', left: '-60px', size: '160px', rotate: '200deg', speed: 0.12, parent: 'servicios', img: 'hoja-verde-3d.png', zIndex: 'z-0' },
            
            // --- Sección FAQ ---
            { top: '10px', left: '10px', size: '120px', rotate: '10deg', speed: 0.05, parent: 'faq', img: 'hoja-seca-3d.png', zIndex: 'z-0' }
        ];

        configs.forEach((config) => {
            const parentSection = document.getElementById(config.parent);
            if (!parentSection) return;

            // Aseguramos contexto de posicionamiento
            if (getComputedStyle(parentSection).position === 'static') {
                parentSection.classList.add('relative');
            }

            const leaf = document.createElement('img');
            leaf.src = `images/${config.img}`; 
            leaf.onerror = () => { leaf.src = 'images/leaf-placeholder.svg'; };
            
            leaf.alt = ''; // Decorativo
            
            // Clases base
            // IMPORTANTE: Eliminamos 'z-0' estático y usamos la config o por defecto z-0
            const zIndexClass = config.zIndex || 'z-0';
            leaf.classList.add('floating-leaf', 'absolute', 'pointer-events-none', zIndexClass);
            
            // Estilos para posicionamiento y tamaño
            leaf.style.width = config.size;
            leaf.style.top = config.top;
            if (config.left) leaf.style.left = config.left;
            if (config.right) leaf.style.right = config.right;
            
            // Transformación inicial
            leaf.style.transform = `rotate(${config.rotate})`;
            leaf.style.transition = 'transform 0.1s linear'; 
            
            // Sombra 3D
            leaf.style.filter = 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))';
            
            // Opacidad
            leaf.style.opacity = '0.9';

            this.leaves.push({
                element: leaf,
                speed: config.speed
            });

            parentSection.prepend(leaf);
            
            // Gestión de z-index para el contenido existente
            // Solo si la hoja es z-0, forzamos al contenido a ser z-10.
            // Si la hoja es z-10 (como en Hero), debemos tener cuidado de no tapar botones interactivos (z-20+).
            // En Hero, el texto es z-20, así que z-10 es seguro.
            
            Array.from(parentSection.children).forEach(child => {
                if (child !== leaf) {
                    const style = getComputedStyle(child);
                    // Si el elemento no tiene posición, aseguramos relative
                    if (style.position === 'static') {
                        child.classList.add('relative');
                    }
                    
                    // Si la hoja es fondo (z-0), elevamos el contenido a z-10
                    if (zIndexClass === 'z-0') {
                        child.classList.add('z-10');
                    }
                    // Si la hoja es z-10, asumimos que el contenido crítico ya tiene z-index superior (como el Hero Title z-20)
                }
            });
        });
    }

    startParallaxLoop() {
        const animate = () => {
            const scrollY = window.scrollY;
            
            this.leaves.forEach(item => {
                const yOffset = scrollY * item.speed;
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