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
        document.querySelectorAll('[data-dynamic-hours]').forEach(container => {
            const target = container.id === this.containerId
                ? container
                : container.querySelector(`#${this.containerId}`);

            // Solo el slot designado recibe la lista día a día: está pensada para el
            // footer, sobre fondo oscuro. Los demás contenedores marcados —el bloque
            // junto al mapa, la FAQ, contacto— tienen su propio maquetado para fondo
            // claro, y sustituirlo dejaba las horas en blanco sobre blanco. Ahí se
            // respeta el marcado estático y solo se refresca la marca de sincronización.
            if (!target || !data.weekdayText?.length) {
                this._stampSync(container, data);
                return;
            }

            container.classList.add('transition-opacity', 'duration-500', 'opacity-0');

            setTimeout(() => {
                target.innerHTML = this._buildHoursHTML(data.weekdayText);
                container.classList.remove('opacity-0');
                container.classList.add('opacity-100');
            }, 500);
        });
    }

    /**
     * Refresca la fecha de sincronización sin tocar el resto del maquetado.
     * @private
     */
    _stampSync(container, data) {
        const syncTag = container.querySelector('.sync-timestamp');
        if (!syncTag) return;
        syncTag.textContent = `Sincronizado con Google • ${new Date(data.lastSync).toLocaleDateString()}`;
    }

    /**
     * Construye la lista de horarios día a día.
     * Los colores se heredan del contenedor en lugar de fijarse, para que el bloque
     * siga siendo legible si se reutiliza fuera del footer.
     * @private
     */
    _buildHoursHTML(weekdayText) {
        const listHtml = weekdayText.map(text => {
            const isSunday = text.toLowerCase().includes('domingo');
            const isClosed = text.toLowerCase().includes('cerrado');
            const colorClass = isClosed ? (isSunday ? 'opacity-60' : 'text-red-400') : '';
            const [day, ...rest] = text.split(':');
            const time = rest.join(':');
            return `<p>${day}: <span class="font-bold ${colorClass}">${time}</span></p>`;
        }).join('');

        return `
            <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="font-bold uppercase tracking-wider text-xs opacity-70">Horario de atención</span>
            </div>
            ${listHtml}
            <span class="sync-timestamp text-[9px] opacity-30 mt-1 uppercase tracking-tighter">Sincronizado con Google • En Vivo</span>
        `;
    }
}
