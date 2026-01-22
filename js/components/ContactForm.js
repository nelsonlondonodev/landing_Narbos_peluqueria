
/**
 * Genera el HTML del formulario de contacto.
 * @returns {string} HTML del componente ContactForm.
 */
/**
 * Clases CSS reutilizables para inputs
 */
const INPUT_CLASSES = "w-full p-3 rounded-lg bg-white border border-brand-medium/50 focus:outline-none focus:ring-2 focus:ring-brand-green text-brand-gray-dark transition-all duration-200 placeholder-brand-gray-light/70";

/**
 * Genera el HTML del formulario de contacto.
 * @returns {string} HTML del componente.
 */
export function getContactFormHTML() {
    return `
    <section id="contacto" class="py-12 bg-white">
        <div class="container mx-auto px-6 max-w-screen-xl text-center">
            ${renderHeader()}
            ${renderWhatsAppButton()}
            ${renderForm()}
        </div>
    </section>
    `;
}

function renderHeader() {
    return `
        <h2 data-key="footerTitle" class="text-3xl font-serif mb-4 text-brand-gray-dark" data-animation="fadeInUp">Agenda tu cita hoy</h2>
        <p data-key="footerSubtitle" class="mb-6 max-w-xl mx-auto text-brand-gray-dark/80" data-animation="fadeInUp" data-animation-delay="0.2s">
            Llámanos o escríbenos por WhatsApp. O si prefieres, déjanos un mensaje aquí:
        </p>
    `;
}

function renderWhatsAppButton() {
    return `
        <p class="text-center mb-8" data-animation="zoomIn" data-animation-delay="0.4s">
            <a href="https://wa.me/573123462618?text=hola, ¡Te hablo desde la web de Narbos Salón!" target="_blank" class="text-brand-green hover:text-brand-gray-dark font-medium underline decoration-brand-green/30 hover:decoration-brand-gray-dark transition-all duration-300">
                ¿Prefieres chat? Escríbenos al WhatsApp
            </a>
        </p>
    `;
}

function renderForm() {
    return `
        <form id="contact-form" action="https://formspree.io/f/xyzpdrwe" method="POST" class="max-w-xl mx-auto text-left space-y-4" data-animation="fadeInUp" data-animation-delay="0.6s">
            ${renderInputGroup('name', 'text', 'Nombre', 'formNameLabel')}
            ${renderInputGroup('email', 'email', 'Correo Electrónico', 'formEmailLabel')}
            ${renderTextareaGroup('message', 'Mensaje', 'formMessageLabel')}
            
            <button type="submit" data-key="formSubmitBtn" class="w-full bg-gradient-to-r from-brand-medium to-brand-green text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-light">
                Enviar Mensaje
            </button>
            <p id="form-status" class="mt-4 text-center h-4"></p>
        </form>
    `;
}

function renderInputGroup(id, type, label, dataKey) {
    return `
        <div>
            <label for="${id}" data-key="${dataKey}" class="block mb-1 font-bold text-brand-green">${label}</label>
            <input type="${type}" id="${id}" name="${id}" class="${INPUT_CLASSES}" required>
        </div>
    `;
}

function renderTextareaGroup(id, label, dataKey) {
    return `
        <div>
            <label for="${id}" data-key="${dataKey}" class="block mb-1 font-bold text-brand-green">${label}</label>
            <textarea id="${id}" name="${id}" rows="4" class="${INPUT_CLASSES}" required></textarea>
        </div>
    `;
}
