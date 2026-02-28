
/**
 * LoyaltyController.js
 * handles the logic for the loyalty program registration form.
 * Clean, modular and scalable implementation.
 */
export class LoyaltyController {
    constructor() {
        this.DOM = {
            form: document.getElementById('fidelizacion-form'),
            successMsg: document.getElementById('success-msg'),
            submitBtn: document.getElementById('submit-btn'),
            inputs: document.querySelectorAll('.form-input'),
            // Nativos date selector
            birthdayInput: document.getElementById('birthday'),
            // QR Modal
            qrTrigger: document.getElementById('qr-trigger'),
            qrModal: document.getElementById('qr-modal'),
            closeQr: document.getElementById('close-qr'),
            qrImage: document.getElementById('qr-image')
        };

        this.WEBHOOK_URL = 'https://n8n.srv1033442.hstgr.cloud/webhook/f576ac1f-1397-416f-b3c6-6e2ab7dc4c08/chat';
    }

    /**
     * Initializes the controller and attaches event listeners.
     */
    init() {
        if (!this.DOM.form) return;
        this.DOM.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this._initInputAnimations();
        this._initDateSelector();
        this._initQRModal();
    }

    /**
     * Handles the form submission process.
     * @param {Event} e - The submit event.
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this._validateForm()) return;

        this._setLoadingState(true);

        const formData = new FormData(this.DOM.form);
        const data = this._prepareData(formData);

        try {
            const success = await this._sendToWebhook(data);
            if (success) {
                this._handleSuccess();
            } else {
                this._handleError('Hubo un error al procesar tu registro. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('[LoyaltyController] Submission error:', error);
            this._handleError('No se pudo establecer conexión con el servidor. Verifica tu internet.');
        } finally {
            this._setLoadingState(false);
        }
    }

    /**
     * Prepares the data object for the webhook.
     * @param {FormData} formData 
     * @returns {Object}
     */
    _prepareData(formData) {
        const rawData = Object.fromEntries(formData.entries());
        
        // Normalización de WhatsApp para usuarios colombianos
        if (rawData.whatsapp) {
            let phone = rawData.whatsapp.replace(/\D/g, ''); // Quitar todo lo que no sea número
            // Si tiene 10 dígitos y no empieza por 57, asumimos Colombia (+57)
            if (phone.length === 10 && !phone.startsWith('57')) {
                rawData.whatsapp = `+57${phone}`;
            } else if (!rawData.whatsapp.startsWith('+')) {
                rawData.whatsapp = `+${phone}`;
            }
        }

        return {
            ...rawData,
            source: 'Fidelizacion Page',
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
    }

    /**
     * Sends data to the n8n webhook.
     * @param {Object} data 
     * @returns {Promise<boolean>}
     */
    async _sendToWebhook(data) {
        const response = await fetch(this.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.ok;
    }

    /**
     * Handles successful submission.
     */
    _handleSuccess() {
        this.DOM.form.classList.add('hidden');
        this.DOM.successMsg.classList.remove('hidden');
        this.DOM.successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * Handles submission errors.
     * @param {string} message 
     */
    _handleError(message) {
        alert(message);
    }

    /**
     * Sets the loading state of the submit button.
     * @param {boolean} isLoading 
     */
    _setLoadingState(isLoading) {
        if (!this.DOM.submitBtn) return;
        
        this.DOM.submitBtn.disabled = isLoading;
        this.DOM.submitBtn.innerHTML = isLoading ? 
            '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Procesando...</span>' : 
            'Unirme y ganar recompensas';
    }

    /**
     * Basic validation before sending.
     * @returns {boolean}
     */
    _validateForm() {
        // Native validation handles most things, but we can add custom logic here
        return this.DOM.form.checkValidity();
    }

    /**
     * Adds subtle micro-interactions to inputs if needed.
     */
    _initInputAnimations() {
        this.DOM.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('input-focused');
                }
            });
        });
    }

    /**
     * Initializes Flatpickr on the birthday input to provide a user-friendly date selector.
     */
    _initDateSelector() {
        if (!this.DOM.birthdayInput) return;

        // Validar si flatpickr cargó desde el CDN de forma global
        if (typeof window.flatpickr !== 'undefined') {
            window.flatpickr(this.DOM.birthdayInput, {
                locale: "es", // Español
                dateFormat: "Y-m-d", // Formato exacto que necesita tu DB/n8n sin romperse
                altInput: true,
                altFormat: "j \\d\\e F, Y", // Ej: 25 de noviembre, 1982
                disableMobile: true // Obliga a usar la UI profesional de flatpickr en celulares (donde es más fácil seleccionar el año que en el nativo)
            });
        }
    }

    /**
     * Handles opening and closing of QR Modal for Staff/iPad usage inline
     */
    _initQRModal() {
        if (!this.DOM.qrTrigger || !this.DOM.qrModal || !this.DOM.closeQr) return;

        const openModal = () => {
            this.DOM.qrModal.classList.remove('opacity-0', 'pointer-events-none');
            // Animate card up
            const card = this.DOM.qrModal.querySelector('div');
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
            // Lazy load the QR image only when opened to save bandwidth on regular visits
            if (this.DOM.qrImage && !this.DOM.qrImage.src) {
                this.DOM.qrImage.src = this.DOM.qrImage.getAttribute('data-src');
            }
        };

        const closeModal = () => {
            this.DOM.qrModal.classList.add('opacity-0', 'pointer-events-none');
            const card = this.DOM.qrModal.querySelector('div');
            card.classList.remove('scale-100');
            card.classList.add('scale-95');
        };

        this.DOM.qrTrigger.addEventListener('click', openModal);
        this.DOM.closeQr.addEventListener('click', closeModal);
        this.DOM.qrModal.addEventListener('click', (e) => {
            if (e.target === this.DOM.qrModal) closeModal();
        });
    }
}
