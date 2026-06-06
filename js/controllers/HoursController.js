import { GoogleMapsService } from '../services/GoogleMapsService.js';
import { siteConfig } from '../config.js';

/**
 * HoursController.js
 * Orquestador de la visualización de horarios. 
 * Maneja la transición entre el horario estático y la actualización dinámica desde Google.
 */
export class HoursController {
    constructor() {
        this.googleService = new GoogleMapsService(siteConfig.googleMapsApiKey);
        this.containerId = 'hours-display-container'; // ID del contenedor en el footer/contacto
    }

    /**
     * Inicializa la sincronización dinámica.
     */
    async init() {
        // 1. El HTML estático ya está renderizado (SEO garantizado).
        
        // 2. Intentamos obtener la actualización "Live" desde Google
        try {
            const liveData = await this.googleService.getBusinessHours();
            
            if (liveData) {
                this.updateUI(liveData);
            }
        } catch (error) {
            // Fallback silencioso al horario estático (SEO)
        }
    }

    /**
     * Actualiza la interfaz de usuario con los datos frescos de Google.
     * Implementa una transición suave para evitar parpadeos (FOUC).
     */
    updateUI(data) {
        const containers = document.querySelectorAll(`[data-dynamic-hours]`);
        
        containers.forEach(container => {
            // Animación de salida suave
            container.classList.add('transition-opacity', 'duration-500', 'opacity-0');
            
            setTimeout(() => {
                const target = container.querySelector('#hours-display-container') || container;
                
                if (data.weekdayText && data.weekdayText.length > 0) {
                    const listHtml = data.weekdayText.map(text => {
                        const isSunday = text.toLowerCase().includes('domingo');
                        const isClosed = text.toLowerCase().includes('cerrado');
                        let colorClass = 'text-white';
                        if (isClosed) {
                            colorClass = isSunday ? 'text-brand-light/60' : 'text-red-400';
                        }
                        const parts = text.split(':');
                        const day = parts[0];
                        const time = parts.slice(1).join(':');
                        return `<p>${day}: <span class="font-bold ${colorClass}">${time}</span></p>`;
                    }).join('');
                    
                    target.innerHTML = `
                        <div class="flex items-center gap-2 mb-1">
                            <svg class="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="font-bold uppercase tracking-wider text-xs opacity-70">Horario de atención</span>
                        </div>
                        ${listHtml}
                        <span class="sync-timestamp text-[9px] opacity-30 mt-1 uppercase tracking-tighter">Sincronizado con Google • En Vivo</span>
                    `;
                } else {
                    const syncTag = target.querySelector('.sync-timestamp');
                    if (syncTag) {
                        syncTag.textContent = `Sincronizado con Google • ${new Date(data.lastSync).toLocaleDateString()}`;
                    }
                }
                
                // Animación de entrada
                container.classList.remove('opacity-0');
                container.classList.add('opacity-100');
            }, 500);
        });
    }
}
