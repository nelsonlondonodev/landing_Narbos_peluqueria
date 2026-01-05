
/**
 * Genera el HTML del formulario de contacto.
 * @returns {string} HTML del componente ContactForm.
 */
export function getContactFormHTML() {
    const inputClasses = "w-full p-3 rounded-lg bg-white border border-brand-medium/50 focus:outline-none focus:ring-2 focus:ring-brand-green text-brand-gray-dark transition-all duration-200 placeholder-brand-gray-light/70";
    
    return `
    <section id="contacto" class="py-12 bg-white">
        <div class="container mx-auto px-6 max-w-screen-xl text-center">
            <h2 data-key="footerTitle" class="text-3xl font-serif mb-4 text-brand-gray-dark" data-animation="fadeInUp">Agenda tu cita hoy</h2>
            <p data-key="footerSubtitle" class="mb-6 max-w-xl mx-auto text-brand-gray-dark/80" data-animation="fadeInUp" data-animation-delay="0.2s">
                Llámanos o escríbenos por WhatsApp. O si prefieres, déjanos un mensaje aquí:
            </p>
            <a href="https://wa.me/573123462618?text=hola, ¡Te hablo desde la web de Narbos Salón!" target="_blank" data-key="footerCta" class="inline-block bg-brand-green text-white font-bold py-2 px-6 rounded-full hover:bg-brand-green/90 transition-colors duration-300 ease-in-out mb-8" data-animation="zoomIn" data-animation-delay="0.4s">
                Contactar por WhatsApp
            </a>
            
            <form id="contact-form" action="https://formspree.io/f/xyzpdrwe" method="POST" class="max-w-xl mx-auto text-left space-y-4" data-animation="fadeInUp" data-animation-delay="0.6s">
                <div>
                    <label for="name" data-key="formNameLabel" class="block mb-1 font-bold text-brand-green">Nombre</label>
                    <input type="text" id="name" name="name" class="${inputClasses}" required>
                </div>
                <div>
                    <label for="email" data-key="formEmailLabel" class="block mb-1 font-bold text-brand-green">Correo Electrónico</label>
                    <input type="email" id="email" name="email" class="${inputClasses}" required>
                </div>
                <div>
                    <label for="message" data-key="formMessageLabel" class="block mb-1 font-bold text-brand-green">Mensaje</label>
                    <textarea id="message" name="message" rows="4" class="${inputClasses}" required></textarea>
                </div>
                <button type="submit" data-key="formSubmitBtn" class="w-full bg-gradient-to-r from-brand-medium to-brand-green text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-light">Enviar Mensaje</button>
                <p id="form-status" class="mt-4 text-center h-4"></p>
            </form>
        </div>
    </section>
    `;
}
