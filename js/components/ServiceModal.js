export class ServiceModal {
    constructor(services) {
        this.services = services;
        this.modal = document.getElementById('service-modal');
        
        if (!this.modal) {
            this.injectHTML();
            this.modal = document.getElementById('service-modal');
        }

        this.refs = {
            backdrop: document.getElementById('modal-backdrop'),
            panel: document.getElementById('modal-panel'),
            scrollContainer: document.getElementById('modal-scroll-container'),
            closeBtn: document.getElementById('close-modal-btn'),
            title: document.getElementById('modal-title'),
            image: document.getElementById('modal-image'),
            duration: document.getElementById('modal-duration'),
            price: document.getElementById('modal-price'),
            desc: document.getElementById('modal-description'),
            whatsappBtn: document.getElementById('modal-whatsapp-btn')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        // Expose open method globally if needed for legacy inline calls, 
        // essentially orchestrating the view from data-attributes or similar
        window.openServiceModal = (id) => this.open(id);
    }

    bindEvents() {
        if (this.refs.closeBtn) {
            this.refs.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.refs.scrollContainer) {
            this.refs.scrollContainer.addEventListener('click', (e) => this.handleOutsideClick(e));
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    open(id) {
        const service = this.services.find(s => s.id === id);
        if (!service) return;

        this.updateContent(service);
        this.show();
    }

    updateContent(service) {
        if (this.refs.title) this.refs.title.textContent = service.title;
        if (this.refs.image) this.refs.image.src = service.image;
        if (this.refs.duration) this.refs.duration.textContent = service.duration;
        if (this.refs.price) this.refs.price.textContent = service.price;
        
        if (this.refs.desc) {
            // Convert Markdown bold to HTML bold
            this.refs.desc.innerHTML = service.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        if (this.refs.whatsappBtn) {
            const message = encodeURIComponent(`Hola, quisiera agendar una cita para ${service.title}`);
            const phoneNumber = '573123462618';
            this.refs.whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
        }
    }

    show() {
        this.modal.classList.remove('hidden');
        this.lockScroll();

        requestAnimationFrame(() => {
            if (this.refs.backdrop) this.refs.backdrop.classList.remove('opacity-0');
            if (this.refs.panel) {
                this.refs.panel.classList.remove('opacity-0', 'scale-95');
                this.refs.panel.classList.add('opacity-100', 'scale-100');
            }
        });
    }

    close() {
        if (this.refs.backdrop) this.refs.backdrop.classList.add('opacity-0');
        if (this.refs.panel) {
            this.refs.panel.classList.remove('opacity-100', 'scale-100');
            this.refs.panel.classList.add('opacity-0', 'scale-95');
        }

        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.unlockScroll();
        }, 300);
    }

    handleOutsideClick(e) {
        // Close if clicking the scroll container directly or the centering wrapper
        if (e.target === this.refs.scrollContainer || 
            (e.target.parentElement === this.refs.scrollContainer && !e.target.closest('#modal-panel'))) {
            this.close();
        }
    }

    lockScroll() {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollBarWidth > 0) {
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
    }

    unlockScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    injectHTML() {
        if (document.getElementById('service-modal')) return;
        
        const html = `
        <div id="service-modal" class="relative z-[100] hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-0 ease-out duration-300" id="modal-backdrop"></div>
            <div id="modal-scroll-container" class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl opacity-0 scale-95 duration-300 ease-out" id="modal-panel">
                        <button type="button" class="absolute right-4 top-4 z-20 p-2 rounded-full bg-black/10 text-white hover:bg-black/30 transition-colors focus:outline-none" id="close-modal-btn">
                            <span class="sr-only">Cerrar</span>
                            <svg class="h-6 w-6 shadow-sm" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="bg-white">
                            <div class="relative h-64 sm:h-80">
                                <img id="modal-image" src="" alt="" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div class="absolute bottom-6 left-6 right-6">
                                    <h3 id="modal-title" class="text-3xl font-serif font-bold text-white shadow-sm mb-2"></h3>
                                    <div class="flex items-center space-x-4 text-white/90 text-sm font-medium">
                                        <span class="flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span id="modal-duration"></span>
                                        </span>
                                        <span id="modal-price" class="text-xl font-bold text-brand-medium"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="px-6 py-8 sm:px-10">
                                <div class="prose max-w-none text-gray-600 mb-8">
                                    <p id="modal-description" class="leading-relaxed text-lg"></p>
                                </div>
                                <div class="border-t border-gray-100 pt-6">
                                    <a id="modal-whatsapp-btn" href="https://wa.me/573123462618" target="_blank" class="w-full sm:w-auto inline-flex justify-center items-center rounded-lg bg-brand-green px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-[#5a634b] hover:shadow-xl hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        Agendar Cita
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>\n`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}
