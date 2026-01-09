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
        // Configuración de las hojas: Ubicación y velocidad de parallax
        // speed: positivo mueve hacia arriba al hacer scroll (más lento que el scroll), negativo acelera o invierte.
        const configs = [
            { top: '10%', left: '-5%', size: '150px', rotate: '45deg', speed: 0.1, parent: 'inicio' },
            { top: '80%', right: '-5%', size: '200px', rotate: '-15deg', speed: 0.15, parent: 'inicio' },
            { top: '50px', right: '-80px', size: '180px', rotate: '120deg', speed: 0.08, parent: 'servicios' },
            { top: '40%', left: '-60px', size: '140px', rotate: '200deg', speed: 0.12, parent: 'servicios' },
            // Solo añadir en FAQ si existe la sección
            { top: '10px', left: '10px', size: '100px', rotate: '10deg', speed: 0.05, parent: 'faq' }
        ];

        configs.forEach((config, index) => {
            const parentSection = document.getElementById(config.parent);
            if (!parentSection) return;

            // Aseguramos que el padre tenga posición relativa para que el absolute funcione
            if (getComputedStyle(parentSection).position === 'static') {
                parentSection.classList.add('relative');
            }
            // Aseguramos que el contenido del padre tenga z-index superior
            // Esto asume que el contenido dentro del section ya tiene alguna estructura, 
            // pero forzamos una clase de contenedor si es necesario o aplicamos z-0 a la hoja.

            const leaf = document.createElement('img');
            leaf.src = '/images/leaf-placeholder.svg';
            leaf.alt = ''; // Decorativo, vacio para accesibilidad
            leaf.classList.add('floating-leaf', 'absolute', 'pointer-events-none', 'z-0', 'opacity-80', 'mix-blend-multiply');
            
            // Estilos inline para posicionamiento específico
            leaf.style.width = config.size;
            leaf.style.top = config.top;
            if (config.left) leaf.style.left = config.left;
            if (config.right) leaf.style.right = config.right;
            leaf.style.transform = `rotate(${config.rotate})`;
            leaf.style.transition = 'transform 0.1s linear'; // Suavizado
            
            // Filtro de sombra suave para profundidad
            leaf.style.filter = 'drop-shadow(5px 10px 6px rgba(0,0,0,0.1))';

            // Guardamos referencia para el loop de animación
            this.leaves.push({
                element: leaf,
                baseTop: parseFloat(config.top), // Simplificación, mejor usar offset
                speed: config.speed,
                initialY: 0
            });

            parentSection.prepend(leaf);
            
            // Aseguramos que el resto del contenido del section esté por encima
            // Esto es un "hack" seguro: asume que los hijos directos del section (salvo la hoja) son contenido
            Array.from(parentSection.children).forEach(child => {
                if (child !== leaf && getComputedStyle(child).position === 'static') {
                    child.classList.add('relative', 'z-10');
                } else if (child !== leaf) {
                    child.classList.add('z-10');
                }
            });
        });
    }

    startParallaxLoop() {
        let lastScrollY = window.scrollY;
        
        const animate = () => {
            const scrollY = window.scrollY;
            
            this.leaves.forEach(item => {
                // Calculamos el desplazamiento relativo al viewport o al scroll global
                // Para efecto simple: mover el elemento un % de los píxeles scrolleados
                const yOffset = scrollY * item.speed;
                
                // Mantenemos la rotación original y añadimos la traslación Y
                // Nota: leemos la rotación inicial del estilo inline o la guardamos en el objeto
                const initialRotation = item.element.style.transform.match(/rotate\(([^)]+)\)/)[0];
                item.element.style.transform = `${initialRotation} translateY(${yOffset}px)`;
            });

            lastScrollY = scrollY;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }
}