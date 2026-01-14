

/**
 * Controlador del Formulario de Contacto.
 * Maneja la lógica de envío, validación y feedback al usuario.
 */
export class ContactFormController {
    constructor() {
        this.DOM = {
            form: document.getElementById("contact-form"),
            status: document.getElementById("form-status")
        };
        
        this.init();
    }

    /**
     * Inicializa el controlador si el formulario existe.
     */
    init() {
        if (!this.DOM.form) return;
        this.DOM.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    /**
     * Maneja el evento de envío del formulario.
     * @param {Event} e 
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        this.updateStatus("Enviando mensaje...", "#6B755A");

        try {
            await this.sendFormData(e.target);
            this.handleSuccess();
        } catch (error) {
            this.handleError(error);
        }
        
        this.clearStatusAfterDelay();
    }

    /**
     * Envía los datos del formularo a Formspree.
     * @param {HTMLFormElement} form 
     */
    async sendFormData(form) {
        const data = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            const result = await response.json();
            throw result;
        }
    }

    handleSuccess() {
        this.updateStatus("¡Mensaje enviado con éxito!", "green");
        this.DOM.form.reset();
    }

    handleError(error) {
        let message = "Hubo un error al enviar el mensaje.";
        
        if (error && error.errors && Array.isArray(error.errors)) {
            message = error.errors.map(err => err.message).join(", ");
        }

        this.updateStatus(message, "red");
    }

    /**
     * Actualiza el mensaje de estado en la UI.
     * @param {string} message 
     * @param {string} color 
     */
    updateStatus(message, color) {
        if (!this.DOM.status) return;
        
        this.DOM.status.textContent = message;
        this.DOM.status.style.color = color;
    }

    clearStatusAfterDelay() {
        setTimeout(() => {
            if (this.DOM.status) this.DOM.status.textContent = "";
        }, 5000);
    }
}
