import { I18nService } from '../services/I18nService.js';

/**
 * ContactFormController
 * Handles the logic for the contact form: submission, validation, and feedback.
 */
export class ContactFormController {
    constructor() {
        this.contactForm = document.getElementById("contact-form");
        this.formStatus = document.getElementById("form-status");
        
        // We need access to translations for status messages.
        // In a perfect world, I18nService would expose a static method or singleton,
        // but for now, we'll fetch basic translations or rely on the global instance logic if refactored further.
        // A simple approach is to read the current language and have a local map or try to reuse the service logic.
        // For robustness, I'll instantiate a helper or read directly if needed, but let's stick to the pattern.
        
        this.init();
    }

    init() {
        if (!this.contactForm) return;

        this.contactForm.addEventListener("submit", (e) => this.handleSubmit(e));

    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const lang = localStorage.getItem("language") || "es";
        
        // Basic translations for form status (could be improved by fetching from I18nService if it was a singleton)
        const messages = {
            es: {
                submitting: "Enviando...",
                success: "¡Gracias! Tu mensaje ha sido enviado.",
                error: "Oops! Hubo un problema al enviar tu formulario."
            },
            en: {
                submitting: "Sending...",
                success: "Thanks! Your message has been sent.",
                error: "Oops! There was a problem submitting your form."
            }
        };

        const currentMessages = messages[lang] || messages.es;

        if (this.formStatus) {
            this.formStatus.textContent = currentMessages.submitting;
            this.formStatus.style.color = "#6B755A";
        }

        const data = new FormData(e.target);

        try {
            const response = await fetch(e.target.action, {
                method: e.target.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if (this.formStatus) {
                    this.formStatus.textContent = currentMessages.success;
                    this.formStatus.style.color = "green";
                }
                this.contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    if (this.formStatus) this.formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    if (this.formStatus) this.formStatus.textContent = currentMessages.error;
                }
                if (this.formStatus) this.formStatus.style.color = "red";
            }
        } catch (error) {
            if (this.formStatus) {
                this.formStatus.textContent = currentMessages.error;
                this.formStatus.style.color = "red";
            }
        }
        
        setTimeout(() => {
            if (this.formStatus) this.formStatus.textContent = "";
        }, 5000);
    }
}
