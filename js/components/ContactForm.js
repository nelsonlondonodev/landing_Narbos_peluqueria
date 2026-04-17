
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
        <form id="contact-form" action="https://formspree.io/f/xyzpdrwe" method="POST" class="max-w-xl mx-auto text-left space-y-4" data-animation="fadeInUpSmall" data-animation-delay="0.6s">
            ${renderInputGroup('name', 'text', 'Nombre', 'formNameLabel')}
            ${renderInputGroup('email', 'email', 'Correo Electrónico', 'formEmailLabel')}
            ${renderTextareaGroup('message', 'Mensaje', 'formMessageLabel')}
            
            <div class="pt-2">
                <label class="flex items-start gap-3 cursor-pointer group">
                    <div class="relative flex items-center shrink-0">
                        <input type="checkbox" id="accept-policies" name="accept_policies" required class="peer appearance-none w-5 h-5 border-2 border-brand-green/30 rounded-md checked:bg-brand-green checked:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all cursor-pointer">
                        <svg class="absolute inset-0 m-auto w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span class="text-[10px] md:text-xs text-brand-gray-dark/60 leading-tight select-none">
                        He leído y acepto la <a href="/legal/politica-privacidad" target="_blank" class="text-brand-green font-bold underline hover:text-brand-gray-dark transition-colors">Política de Tratamiento de Datos (Ley 1581)</a> y acepto ser contactado.
                    </span>
                </label>
            </div>

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
