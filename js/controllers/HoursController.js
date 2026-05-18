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
            // Animación de salida opcional
            container.classList.add('transition-opacity', 'duration-500', 'opacity-0');
            
            setTimeout(() => {
                // Aquí podrías mapear los datos específicos de Google a tu diseño.
                // Por ahora, actualizamos la marca de tiempo de sincronización.
                const syncTag = container.querySelector('.sync-timestamp');
                if (syncTag) {
                    syncTag.textContent = `Sincronizado con Google • ${new Date(data.lastSync).toLocaleDateString()}`;
                }
                
                // Animación de entrada
                container.classList.remove('opacity-0');
                container.classList.add('opacity-100');
            }, 500);
        });
    }
}
