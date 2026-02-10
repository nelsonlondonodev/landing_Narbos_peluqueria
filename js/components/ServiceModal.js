export class ServiceModal {
    constructor(services) {
        this.services = services;
        this.modal = document.getElementById('service-modal');
        
        if (!this.modal) {
            console.warn('ServiceModal: Modal element not found in DOM');
            return;
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
}
