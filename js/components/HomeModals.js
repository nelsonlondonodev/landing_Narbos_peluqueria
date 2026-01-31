import { hairSalonServices } from '../data/hairSalonServices.js';
import { nailsServices } from '../data/nailsServices.js';
import { estheticsServices } from '../data/estheticsServices.js';

/**
 * Configuración de los modales.
 * Centraliza el contenido combinando datos dinámicos y textos estáticos.
 */
const MODALS_CONFIG = [
    {
        id: 'peluqueria-modal',
        title: 'Peluquería',
        image: 'images/pages/peluqueria/estilismo-barba.webp',
        subtitle: 'Transformación y Cuidado',
        description: 'Expertos en colorimetría y cuidado capilar. Utilizamos las mejores marcas para garantizar la salud y belleza de tu cabello.',
        items: hairSalonServices.map(s => s.title),
        cta: '¡Agenda tu diagnóstico capilar!'
    },
    {
        id: 'manos-pies-modal',
        title: 'Manos y pies',
        image: 'images/pages/unas/manicure-spa.webp',
        subtitle: 'Cuidado Integral',
        description: 'Relájate con nuestros rituales de spa para manos y pies. Diseños exclusivos y técnicas duraderas.',
        items: nailsServices.slice(0, 5).map(s => s.title), // Top 5 servicios
        cta: '¡Reserva tu cita de uñas hoy!'
    },
    {
        id: 'estetica-modal',
        title: 'Estética y spa',
        image: 'images/pages/estetica/spa-hero.webp',
        subtitle: 'Bienestar Total',
        description: 'Tratamientos faciales y corporales diseñados para renovar tu energía y resaltar tu belleza natural.',
        items: estheticsServices.map(s => s.title),
        cta: '¡Regálate un momento de relax!'
    },
    {
        id: 'depilacion-modal',
        title: 'Depilación y pestañas',
        image: 'images/pages/estetica/spa-hero.webp',
        subtitle: 'Detalles que Enamoran',
        description: 'Técnicas precisas y delicadas para el cuidado de tu piel y la expresión de tu mirada.',
        items: [
            'Depilación con Cera',
            'Depilación con Hilo',
            'Diseño de Cejas',
            'Lifting de Pestañas'
        ],
        cta: '¡Luce una piel suave y radiante!'
    }
];

/**
 * Icono de Check Premium (Reutilizable)
 */
const CHECK_ICON = `
<svg class="pointer-events-none w-5 h-5 text-brand-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg>`;

/**
 * Genera el HTML de un servicio individual (Item de lista).
 */
const createServiceItem = (text) => `
    <li class="modal-service-item flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
        <span class="modal-service-icon shrink-0">
            ${CHECK_ICON}
        </span>
        <span class="text-gray-700 font-medium">${text}</span>
    </li>
`;

/**
 * Genera el HTML completo para un modal.
 */
const createModalHTML = (config) => `
    <div id="${config.id}" role="dialog" aria-modal="true" class="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] hidden p-4 transition-opacity duration-300">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto p-6 md:p-8 transform transition-transform duration-300 scale-95 opacity-0 modal-content">
            <button data-modal-close="${config.id}" aria-label="Cerrar ventana modal" class="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                <svg class="pointer-events-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <h3 class="text-3xl font-serif font-bold text-brand-green mb-2">${config.title}</h3>
            ${config.subtitle ? `<p class="text-sm font-medium text-brand-gold uppercase tracking-wider mb-4">${config.subtitle}</p>` : ''}
            
            <img src="${config.image}" alt="${config.title}" width="600" height="300" class="w-full h-48 md:h-64 object-cover rounded-lg mb-6 shadow-lg" loading="lazy">
            
            <div class="text-gray-700 space-y-6">
                <p class="leading-relaxed text-gray-600">${config.description}</p>
                
                <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>Servicios Destacados</span>
                    </h4>
                    <ul class="space-y-1">
                        ${config.items.map(createServiceItem).join('')}
                    </ul>
                </div>
                
                <p class="pt-2 font-bold text-brand-green text-center text-lg">${config.cta}</p>
            </div>
        </div>
    </div>
`;

/**
 * Exportación principal
 */
export const getHomeModalsHTML = () => MODALS_CONFIG.map(createModalHTML).join('');

