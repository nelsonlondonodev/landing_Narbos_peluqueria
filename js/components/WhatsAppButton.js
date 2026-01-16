import { siteConfig } from '../config.js';

/**
 * Componente Botón Flotante de WhatsApp con Widget de Chat.
 * Evita clics accidentales y mejora la UX/CRO.
 * Refactorizado bajo principios Clean Code (Single Responsibility, Small Functions).
 */
export class WhatsAppButton {
    constructor() {
        this.isOpen = false;
        this.elements = {};
        // Centralizamos la configuración aquí
        this.waConfig = siteConfig.socialLinks.find(s => s.name === "WhatsApp") || { url: `https://wa.me/${siteConfig.contact.whatsapp}` };
        this.init();
    }

    init() {
        if (this.shouldHide()) return;
        this.render();
        this.bindElements();
        this.setupEventListeners();
    }

    /**
     * Determina si el botón debe ocultarse en la página actual (ej. Blog).
     * @returns {boolean}
     */
    shouldHide() {
        const path = window.location.pathname;
        return path.includes('/blog/') || path.includes('/articles/');
    }

    /**
     * Orquestador principal de renderizado.
     * Crea el contenedor y agrega los subcomponentes.
     */
    render() {
        const container = document.createElement('div');
        container.id = 'whatsapp-widget-root';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans';
        
        container.innerHTML = `
            ${this._getWidgetHTML()}
            ${this._getFloatingButtonHTML()}
        `;
        
        document.body.appendChild(container);
    }

    /**
     * Retorna el HTML completo del Widget de Chat (contenedor oculto).
     * @private
     */
    _getWidgetHTML() {
        return `
            <div id="wa-chat-widget" 
                 class="w-80 bg-[#E5DDD5] dark:bg-[#111b21] rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-300 origin-bottom-right scale-0 opacity-0 invisible overflow-hidden mb-2 relative">
                ${this._getBackgroundPatternHTML()}
                ${this._getHeaderHTML()}
                ${this._getBodyHTML()}
            </div>
        `;
    }

    /**
     * Retorna el HTML del patrón de fondo (doodle).
     * @private
     */
    _getBackgroundPatternHTML() {
        return `
            <div class="absolute inset-0 opacity-[0.06] pointer-events-none" 
                 style="background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-size: 400px;">
            </div>
        `;
    }

    /**
     * Retorna el HTML de la cabecera del chat.
     * @private
     */
    _getHeaderHTML() {
        return `
            <div class="bg-[#075E54] p-4 flex items-center justify-between text-white relative z-10 shadow-md">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="w-10 h-10 bg-brand-gray-dark rounded-full flex items-center justify-center shadow-sm overflow-hidden p-0.5">
                            <img src="/images/logo_narbos.webp" alt="Narbos" class="w-full h-full object-contain rounded-full" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDc1RTU0IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMCAyMWEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMnYtN2wteC0zIDUgMyB2N3oiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4='">
                        </div>
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075E54] rounded-full"></span>
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 ">
                            <h3 class="font-bold text-base leading-tight">Narbos Salón</h3>
                            <!-- Verified Badge -->
                            <svg class="w-3.5 h-3.5 text-blue-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </div>
                        <p class="text-[11px] text-white/80 font-light">Responde en aprox. 1 hora</p>
                    </div>
                </div>
                
                <button id="wa-close-btn" class="text-white/70 hover:text-white transition-colors p-1" aria-label="Cerrar chat">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;
    }

    /**
     * Retorna el HTML del cuerpo del chat (Mensaje de bienvenida y botón CTA).
     * @private
     */
    _getBodyHTML() {
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        return `
            <div class="p-5 relative z-10 h-[280px] flex flex-col justify-between">
                <div class="flex flex-col gap-4">
                    <div class="flex justify-center mb-2">
                        <span class="bg-[#eef5fa] dark:bg-[#1f2c34] text-[#5b7380] dark:text-[#8696a0] text-[10px] uppercase font-bold px-3 py-1 rounded-lg shadow-sm">Hoy</span>
                    </div>

                    <div class="self-start max-w-[85%] relative group">
                        <span class="absolute -left-2 top-0 text-white dark:text-[#202c33]">
                            <svg viewBox="0 0 8 13" height="13" width="8" class="fill-current"><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
                        </span>
                        
                        <div class="bg-white dark:bg-[#202c33] p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-sm text-[13.5px] leading-[19px] text-[#111b21] dark:text-[#e9edef]">
                            <p>👋 ¡Hola! Bienvenido a <strong>Narbos Salón & Spa</strong>.</p>
                            <p class="mt-1">¿Te gustaría agendar una cita o tienes alguna pregunta sobre nuestros servicios?</p>
                            <span class="block text-[10px] text-[#667781] dark:text-[#8696a0] mt-1 text-right tabular-nums">${currentTime}</span>
                        </div>
                    </div>
                </div>

                <div class="mt-auto pt-2">
                    <a href="${this.waConfig.url}" 
                       target="_blank"
                       id="wa-start-chat-btn"
                       class="flex items-center justify-center gap-2 w-full bg-[#00a884] hover:bg-[#008f6f] text-white font-medium py-2.5 px-4 rounded-full transition-all shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transform active:scale-[0.98]">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        <span>Iniciar Chat en WhatsApp</span>
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Retorna el HTML del botón flotante (Toogle).
     * @private
     */
    _getFloatingButtonHTML() {
        return `
            <button id="wa-toggle-btn" 
                    aria-label="Abrir chat de WhatsApp"
                    class="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all hover:-translate-y-1">
                
                <div id="wa-tooltip" class="absolute bottom-full mb-3 right-0 whitespace-nowrap bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 font-serif font-bold text-sm flex items-center gap-2 animate-bounce origin-bottom-right">
                    <span>¡Agenda tu cita aquí!</span>
                    <div class="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
                </div>

                <span class="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping group-hover:opacity-100 pointer-events-none"></span>
                
                <svg class="w-8 h-8 md:w-10 md:h-10 text-white fill-current relative z-10 transition-transform duration-300 group-hover:rotate-[15deg]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.8z"/>
                </svg>
            </button>
        `;
    }

    /**
     * Cachea las referencias a los elementos del DOM.
     * @private
     */
    bindElements() {
        this.elements = {
            toggleBtn: document.getElementById('wa-toggle-btn'),
            closeBtn: document.getElementById('wa-close-btn'),
            startChatBtn: document.getElementById('wa-start-chat-btn'),
            widget: document.getElementById('wa-chat-widget'),
            tooltip: document.getElementById('wa-tooltip'),
            root: document.getElementById('whatsapp-widget-root')
        };
    }

    /**
     * Alterna la visibilidad del widget (Abierto/Cerrado).
     * @param {Event} [e] - Evento opcional para detener propagación.
     */
    toggleWidget(e) {
        if (e) e.stopPropagation();
        this.isOpen = !this.isOpen;
        this._updateUIState();
    }

    /**
     * Aplica las clases CSS según el estado (isOpen).
     * @private
     */
    _updateUIState() {
        const { widget, tooltip } = this.elements;
        
        if (this.isOpen) {
            // Abrir
            widget.classList.remove('scale-0', 'opacity-0', 'invisible');
            widget.classList.add('scale-100', 'opacity-100', 'visible');
            tooltip?.classList.add('hidden'); // Ocultar tooltip
        } else {
            // Cerrar
            widget.classList.add('scale-0', 'opacity-0', 'invisible');
            widget.classList.remove('scale-100', 'opacity-100', 'visible');
            tooltip?.classList.remove('hidden'); // Restaurar tooltip
        }
    }

    /**
     * Configura los listeners de eventos.
     */
    setupEventListeners() {
        const { toggleBtn, closeBtn, startChatBtn, root } = this.elements;

        // Botón principal
        toggleBtn?.addEventListener('click', (e) => this.toggleWidget(e));
        
        // Botón cerrar (X)
        closeBtn?.addEventListener('click', (e) => this.toggleWidget(e));

        // Botón Iniciar Chat
        startChatBtn?.addEventListener('click', () => {
             // Cierre retardado para UX suave
             setTimeout(() => {
                 if (this.isOpen) this.toggleWidget();
             }, 1000);
        });

        // Click fuera del widget
        document.addEventListener('click', (e) => {
            if (this.isOpen && root && !root.contains(e.target)) {
                this.toggleWidget();
            }
        });
    }
}
