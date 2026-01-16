import { siteConfig } from '../config.js';

/**
 * Componente Botón Flotante de WhatsApp con Widget de Chat.
 * Evita clics accidentales y mejora la UX/CRO.
 */
export class WhatsAppButton {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.shouldHide()) return;
        this.render();
        this.setupEventListeners();
    }

    /**
     * Determina si el botón debe ocultarse en la página actual.
     * @returns {boolean}
     */
    shouldHide() {
        const path = window.location.pathname;
        return path.includes('/blog/') || path.includes('/articles/');
    }

    /**
     * Renderiza el botón y el widget en el DOM.
     */
    render() {
        const container = document.createElement('div');
        container.id = 'whatsapp-widget-root';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4';
        
        // Obtenemos la URL de WhatsApp desde la configuración centralizada
        // Buscamos la red social WhatsApp o usamos el contacto por defecto
        const waConfig = siteConfig.socialLinks.find(s => s.name === "WhatsApp") || { url: `https://wa.me/${siteConfig.contact.whatsapp}` };

        container.innerHTML = `
            <!-- Chat Widget (Hidden by default) -->
            <div id="wa-chat-widget" 
                 class="w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 transform transition-all duration-300 origin-bottom-right scale-0 opacity-0 invisible overflow-hidden mb-2">
                
                <!-- Validate UX: Header similar to WhatsApp for familiarity -->
                <div class="bg-[#075E54] p-4 flex items-center justify-between text-white relative overflow-hidden">
                    <span class="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></span>
                    <div class="flex items-center gap-3 relative z-10">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <svg class="w-6 h-6 fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.8z"/></svg>
                        </div>
                        <div>
                            <h3 class="font-serif font-bold text-lg leading-tight">Narbos Salón</h3>
                            <p class="text-xs text-white/80">Solemos responder en minutos</p>
                        </div>
                    </div>
                    
                    <!-- Close Button -->
                    <button id="wa-close-btn" class="text-white/70 hover:text-white transition-colors p-1" aria-label="Cerrar chat">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-5 bg-gray-50 dark:bg-zinc-900/50">
                    <div class="bg-white dark:bg-zinc-800 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm text-sm text-gray-600 dark:text-gray-300 mb-4 inline-block border border-gray-100 dark:border-zinc-700">
                        👋 ¡Hola! ¿Te gustaría agendar una cita o necesitas más información?
                        <span class="block text-[10px] text-gray-400 mt-1 text-right">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>

                    <a href="${waConfig.url}" 
                       target="_blank"
                       id="wa-start-chat-btn"
                       class="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-green-500/30 group">
                        <span>Iniciar Chat en WhatsApp</span>
                        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </div>

            <!-- Trigger Button (Floating) -->
            <button id="wa-toggle-btn" 
                    aria-label="Abrir chat de WhatsApp"
                    class="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all hover:-translate-y-1">
                
                <!-- Tooltip Label (Solo visible si el chat está cerrado) -->
                <div id="wa-tooltip" class="absolute bottom-full mb-3 right-0 whitespace-nowrap bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 font-serif font-bold text-sm hidden md:flex items-center gap-2 animate-bounce origin-bottom-right">
                    <span>¡Agenda tu cita aquí!</span>
                    <div class="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
                </div>

                <!-- Pulse Effect -->
                <span class="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping group-hover:opacity-100 pointer-events-none"></span>
                
                <!-- Icon -->
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white fill-current relative z-10 transition-transform duration-300 group-hover:rotate-[15deg]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.8z"/>
                </svg>
            </button>
        `;
        
        document.body.appendChild(container);
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('wa-toggle-btn');
        const closeBtn = document.getElementById('wa-close-btn');
        const startChatBtn = document.getElementById('wa-start-chat-btn');
        const widget = document.getElementById('wa-chat-widget');
        const tooltip = document.getElementById('wa-tooltip');

        const toggle = (e) => {
            if (e) e.stopPropagation(); // Prevenir burbujeo
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                // Abrir
                widget.classList.remove('scale-0', 'opacity-0', 'invisible');
                widget.classList.add('scale-100', 'opacity-100', 'visible');
                if (tooltip) tooltip.classList.add('hidden'); // Ocultar tooltip al abrir
            } else {
                // Cerrar
                widget.classList.remove('scale-100', 'opacity-100', 'visible');
                widget.classList.add('scale-0', 'opacity-0', 'invisible');
                if (tooltip) tooltip.classList.remove('hidden'); // Restaurar tooltip al cerrar
            }
        };
        
        // Click en el botón flotante
        toggleBtn.addEventListener('click', toggle);

        // Click en la X de cerrar
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isOpen) toggle();
        });

        // Click en "Iniciar Chat" (se cierra el widget después de un momento para UX)
        startChatBtn.addEventListener('click', () => {
             // Opcional: Cerrar automáticamente después de que el usuario vaya a WhatsApp
             setTimeout(() => {
                 if (this.isOpen) toggle();
             }, 1000);
        });

        // Click fuera para cerrar (Click Outside)
        document.addEventListener('click', (e) => {
            const root = document.getElementById('whatsapp-widget-root');
            if (this.isOpen && root && !root.contains(e.target)) {
                toggle();
            }
        });
    }
}
