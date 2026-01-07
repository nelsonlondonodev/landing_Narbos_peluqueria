
/**
 * Componente para añadir iconos decorativos flotantes en el fondo de las secciones.
 * Mejora la experiencia visual añadiendo dinamismo sutil.
 */
export class FloatingDecorations {
    constructor() {
        this.sections = [
            { id: 'inicio', count: 2, icons: ['scissors', 'comb', 'lotus'] },
            { id: 'servicios', count: 2, icons: ['dryer', 'polish', 'sparkle'] },
            { id: 'nosotros', count: 1, icons: ['lotus', 'leaf'] },
            { id: 'galeria', count: 2, icons: ['camera', 'scissors', 'polish'] },
            { id: 'resenas', count: 1, icons: ['star', 'quote'] }
        ];
        
        this.iconsStore = {
            // Scissors (Lucide)
            scissors: '<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="1.5"/>',
            // Sparkles (Lucide - representing beauty/cleanliness)
            sparkle: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
            // Flower (Lucide - representing spa/nature)
            lotus: '<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m3 4.5a4.5 4.5 0 1 0 4.5-4.5M12 16.5V15m4.5-3H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
            // Feather (Lucide - representing softness/lashes)
            feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
            // Gem (Lucide - representing premium/nails)
            gem: '<path d="M6 3h12l4 6-10 13L2 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 3 8 9l4 13 4-13-3-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
            // Leaf (Lucide - nature)
            leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 6.5-2 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
        };

        this.init();
    }

    init() {
        // 1. Legacy/Specific Sections (Homepage)
        this.sections.forEach(section => {
             const element = document.getElementById(section.id);
             if (element) {
                 this.injectIcons(element, section.count, section.icons);
             }
        });

        // 2. Generic Data Attribute Support [data-floating-bg="count|icons"]
        // Example: data-floating-bg="2" implies 2 generic icons
        const genericElements = document.querySelectorAll('[data-floating-bg]');
        genericElements.forEach(el => {
            const count = parseInt(el.dataset.floatingBg) || 2;
            this.injectIcons(el, count, ['scissors', 'sparkle', 'leaf', 'gem']);
        });

        // 3. Blog Article Auto-Detection
        // If we are in a blog article (has <article> tag), decorate the main container
        const article = document.querySelector('article');
        const main = document.querySelector('main');
        if (article && main) {
            // Avoid double injection if main already has ID in sections (unlikely) or data attrib
            if (!main.hasAttribute('data-floating-bg-injected')) {
                this.injectIcons(main, 4, ['scissors', 'comb', 'sparkle', 'leaf']);
                main.setAttribute('data-floating-bg-injected', 'true');
            }
        }
    }

    injectIcons(element, count, allowedIcons) {
        // Ensure section is relative so absolute icons stay inside
        if (!element.classList.contains('relative')) {
            element.classList.add('relative');
        }
        // IMPORTANT: Ensure the EXISTING content of the section stays on top of the icons
        // We iterate over children and add z-10 relative to content
        Array.from(element.children).forEach(child => {
            if (!child.classList.contains('absolute')) { // Don't mess with existing absolute elements if possible
                 child.classList.add('relative', 'z-10');
            }
        });

        const container = document.createElement('div');
        // z-0 ensures it is behind the z-10 content but legal in stacking context
        container.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0';
        container.setAttribute('aria-hidden', 'true');
        
        for (let i = 0; i < count; i++) {
            
            let iconKey = allowedIcons[Math.floor(Math.random() * allowedIcons.length)];
            
            if (iconKey === 'comb') iconKey = 'sparkle'; 
            if (iconKey === 'dryer') iconKey = 'leaf';
            if (iconKey === 'polish') iconKey = 'gem';
            if (iconKey === 'camera') iconKey = 'feather';
            if (iconKey === 'quote') iconKey = 'sparkle';
            if (iconKey === 'star') iconKey = 'sparkle';

            const iconSvgContent = this.iconsStore[iconKey] || this.iconsStore['sparkle'];
            
            const icon = document.createElement('div');
            
            // Random properties
            const size = Math.floor(Math.random() * 40) + 40; // 40-80px
            const left = Math.floor(Math.random() * 90) + 5; // 5-95%
            const top = Math.floor(Math.random() * 90) + 5; // 5-95%
            const rotation = Math.floor(Math.random() * 360);
            
            // FASTER ANIMATION: 3s to 6s
            const duration = Math.floor(Math.random() * 3) + 3; 
            const delay = Math.random() * 1; // Minimal delay
            
            // Use darker colors for visibility against white bg
            // text-gray-300, text-gray-400 instead of brand-light
            const colors = ['text-brand-green/20', 'text-brand-medium/30', 'text-black/10'];
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            
            // Force animation without 'animate-' prefix relying strictly on tailwind config might be flaky if not safelisted? 
            // We use inline styles for animation for 100% guarantee if classes fail.
            // But let's try standard classes first with opacity 0.3 for clear visibility.
            
            const animClass = 'animate-float'; // Stick to simple float first to debug

            // Opacity explicit in color class or here. 
            // Using text-black/20 is safer.
            icon.className = `absolute ${colorClass} ${animClass}`;
            icon.style.width = `${size}px`;
            icon.style.height = `${size}px`;
            icon.style.left = `${left}%`;
            icon.style.top = `${top}%`;
            icon.style.transform = `rotate(${rotation}deg)`;
            
            // We force the animation style inline to be 100% sure it applies
            icon.style.animationName = 'float';
            icon.style.animationDuration = `${duration}s`;
            icon.style.animationIterationCount = 'infinite';
            icon.style.animationTimingFunction = 'ease-in-out';
            icon.style.animationDelay = `${delay}s`;
            
            // Ensure viewBox is 0 0 24 24 for Lucide
            icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">${iconSvgContent}</svg>`;
            
            container.appendChild(icon);
        }
        
        element.prepend(container);
    }
}
