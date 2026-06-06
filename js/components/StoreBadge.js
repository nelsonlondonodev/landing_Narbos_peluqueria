import { GoogleMapsService } from '../services/GoogleMapsService.js';
import { siteConfig } from '../config.js';
import businessHours from '../data/business-hours.js';

export class StoreBadge {
    /**
     * @param {string} containerId - El ID del elemento donde se inyectará el componente
     */
    constructor(containerId = 'business-status-root') {
        this.container = document.getElementById(containerId);
        this.lastState = null;
        this.specialReason = null;
    }
    
    async init() {
        if (!this.container) return;

        // 1. Mostrar estado inicial basado en fallback local inmediato (LCP veloz)
        this.checkAndUpdate(false);

        // 2. Intentar sincronizar estado real en vivo desde Google Maps (Places API)
        try {
            const googleService = new GoogleMapsService(siteConfig.googleMapsApiKey);
            const liveData = await googleService.getBusinessHours();
            
            if (liveData) {
                const isOpenLive = liveData.status === 'OPEN';
                this.specialReason = isOpenLive ? null : "CERRADO POR HOY (Festivo/Especial)";
                this.updateUI(isOpenLive, true);
            }
        } catch (error) {
            // Fallback silencioso en caso de error de conexión
        }
    }

    checkAndUpdate(isLive = false) {
        if (!this.container) return;
        const open = this.calculateLocalStatus();
        
        if (this.lastState !== open) {
            this.lastState = open;
            this.render(open, isLive);
        }
    }

    updateUI(open, isLive = true) {
        this.lastState = open;
        this.render(open, isLive);
    }

    /**
     * Extrae de forma robusta las partes de fecha/hora en zona UTC-5 (Bogotá)
     * compatibles con navegadores móviles y Safari.
     * @returns {Object} Partes de la fecha y hora
     */
    _getBogotaTimeParts() {
        const now = new Date();
        const options = { 
            timeZone: 'America/Bogota', 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: false 
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        
        const getPart = (type) => parseInt(parts.find(p => p.type === type).value, 10);
        
        return {
            bYear: getPart('year'),
            bMonth: getPart('month'), // 1-12
            bDayOfMonth: getPart('day'),
            bHour: getPart('hour') === 24 ? 0 : getPart('hour'),
            bMinute: getPart('minute')
        };
    }

    /**
     * Calcula dinámicamente el día exacto de la semana (0 a 6) en Bogotá.
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {number} 0 = Domingo, 1-6 = Lunes a Sábado
     */
    _getDayOfWeek(year, month, day) {
        const utcBogota = new Date(Date.UTC(year, month - 1, day));
        return utcBogota.getUTCDay(); 
    }

    /**
     * Identifica si la fecha corresponde a un día festivo en Colombia durante 2026.
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean}
     */
    _isColombianHoliday(year, month, day) {
        if (year !== 2026) return false;
        
        // Días festivos oficiales en Colombia para el año 2026
        const holidays2026 = {
            1: [1, 12],      // Año Nuevo, Reyes Magos
            3: [23],         // Día de San José
            4: [2, 3],       // Jueves Santo, Viernes Santo
            5: [1, 18],      // Día del Trabajo, Ascensión del Señor
            6: [8, 15, 29],  // Corpus Christi, Sagrado Corazón, San Pedro y San Pablo
            7: [20],         // Día de la Independencia
            8: [7, 17],      // Batalla de Boyacá, Asunción de la Virgen
            10: [12],        // Día de la Raza
            11: [2, 16],     // Todos los Santos, Independencia de Cartagena
            12: [8, 25]      // Inmaculada Concepción, Navidad
        };
        
        return (holidays2026[month] || []).includes(day);
    }

    /**
     * Verifica si hay alguna regla de cierre excepcional manual (vacaciones/festivos manuales).
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean} Si está cerrado por razones especiales
     */
    _isSpecialClosure(year, month, day) {
        const isClosed = (year === 2026 && month === 4 && day === 3);
        if (isClosed) {
            this.specialReason = "CERRADO POR HOY";
        }
        return isClosed;
    }

    /**
     * Convierte una hora en formato string (ej: "7:00 AM", "8:30 PM") a un float decimal.
     * @param {string} timeStr 
     * @returns {number} Valor flotante que representa las horas decimales (0.0 a 24.0)
     */
    _parseTimeToFloat(timeStr) {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        return hours + (minutes / 60);
    }

    /**
     * Retorna la configuración de horario para el día correspondiente en el schedule.
     * @param {Array} schedule 
     * @param {number} dayOfWeek 
     * @param {boolean} isHoliday 
     * @returns {Object|null}
     */
    _getDayConfig(schedule, dayOfWeek, isHoliday) {
        if (isHoliday) {
            this.specialReason = "FESTIVOS (9am a 6pm)";
            return schedule.find(s => s.day === 'Festivos');
        }
        
        const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const currentDayName = dayNames[dayOfWeek];
        return schedule.find(s => s.day === currentDayName);
    }

    /**
     * Calcula el estado de apertura usando el fallback de configuración local.
     * @returns {boolean}
     */
    calculateLocalStatus() {
        this.specialReason = null;
        const { bYear, bMonth, bDayOfMonth, bHour, bMinute } = this._getBogotaTimeParts();
        const dayOfWeek = this._getDayOfWeek(bYear, bMonth, bDayOfMonth);
        
        if (this._isSpecialClosure(bYear, bMonth, bDayOfMonth)) {
            return false;
        }

        if (dayOfWeek === 0) {
            this.specialReason = "CERRADO DOMINGOS";
            return false;
        }

        const isHoliday = this._isColombianHoliday(bYear, bMonth, bDayOfMonth);
        const dayConfig = this._getDayConfig(businessHours.schedule, dayOfWeek, isHoliday);
        const timeValue = bHour + (bMinute / 60);

        if (dayConfig && !dayConfig.closed) {
            const opensVal = this._parseTimeToFloat(dayConfig.opens);
            const closesVal = this._parseTimeToFloat(dayConfig.closes);

            const isOpen = timeValue >= opensVal && timeValue < closesVal;
            if (!isOpen && isHoliday) {
                this.specialReason = "CERRADO POR HOY (Festivo)";
            }
            return isOpen;
        }

        return false;
    }

    /**
     * Obtiene las clases de estilo y colores correspondientes para el Badge.
     * @param {boolean} open 
     * @returns {Object}
     */
    _getBadgeStyles(open) {
        const badgeClasses = open 
            ? "bg-black/40 backdrop-blur-md text-white border-white/20"
            : "bg-black/60 backdrop-blur-md text-white border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
            
        const dotColor = open ? "bg-green-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]";
        const pingEffect = `<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}"></span>`;
        
        return { badgeClasses, dotColor, pingEffect };
    }

    /**
     * Genera el HTML del popover flotante con el detalle de los horarios.
     * @param {boolean} isLive 
     * @returns {string} HTML del Popover
     */
    _generatePopoverHTML(isLive) {
        const syncText = isLive 
            ? 'Sincronizado en tiempo real con Google Places API (incluye festivos y horarios especiales).' 
            : 'Mostrando horario local (sin conexión en tiempo real).';
            
        return `
            <div id="store-badge-popover" class="absolute right-0 mt-2 w-64 bg-brand-gray-dark/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/10 p-4 invisible opacity-0 md:group-hover:visible md:group-hover:opacity-100 transition-all duration-300 z-50 text-left translate-y-1 md:group-hover:translate-y-0" role="region" aria-label="Detalle de horarios de atención">
                <h4 class="font-serif font-bold text-xs text-brand-gold border-b border-white/10 pb-1.5 mb-2 flex justify-between items-center tracking-wider uppercase">
                    <span>Horario de Atención</span>
                    <span class="text-[8px] px-1.5 py-0.5 rounded bg-white/10 font-sans tracking-normal lowercase font-semibold">${isLive ? 'en vivo' : 'local'}</span>
                </h4>
                <ul class="space-y-1.5 text-[11px]">
                    <li class="flex justify-between items-center">
                        <span class="opacity-80">Lunes a Sábado:</span>
                        <span class="font-bold">7:00 AM – 8:00 PM</span>
                    </li>
                    <li class="flex justify-between items-center text-brand-gold">
                        <span class="opacity-90">Festivos:</span>
                        <span class="font-bold">9:00 AM – 6:00 PM</span>
                    </li>
                    <li class="flex justify-between items-center text-red-400">
                        <span class="opacity-80">Domingos:</span>
                        <span class="font-bold">CERRADO</span>
                    </li>
                </ul>
                <div class="mt-3 pt-2.5 border-t border-white/10 text-[9px] text-white/50 leading-relaxed">
                    ${syncText}
                </div>
            </div>
        `;
    }

    /**
     * Registra los escuchadores de eventos click y tap para mobile y cierres externos.
     * @param {HTMLElement} trigger 
     * @param {HTMLElement} popover 
     */
    _setupPopoverListeners(trigger, popover) {
        if (!trigger || !popover) return;
        
        const togglePopover = (e) => {
            e.stopPropagation();
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !isExpanded);
            
            popover.classList.toggle('opacity-0');
            popover.classList.toggle('invisible');
            popover.classList.toggle('translate-y-1');
            popover.classList.toggle('opacity-100');
            popover.classList.toggle('visible');
            popover.classList.toggle('translate-y-0');
        };
        
        trigger.addEventListener('click', togglePopover);
        
        const closePopover = () => {
            if (trigger.getAttribute('aria-expanded') === 'true') {
                trigger.setAttribute('aria-expanded', 'false');
                popover.classList.add('opacity-0', 'invisible', 'translate-y-1');
                popover.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        };
        
        document.addEventListener('click', closePopover);
        
        popover.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    render(open, isLive = false) {
        if (!this.container) return;
        
        const { badgeClasses, dotColor, pingEffect } = this._getBadgeStyles(open);
        const textStr = open ? "ABIERTO AHORA" : (this.specialReason || "CERRADO AHORA");
        const popoverHTML = this._generatePopoverHTML(isLive);

        this.container.innerHTML = `
            <div class="relative inline-block group">
                <button id="store-badge-trigger" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 transform hover:scale-105 cursor-pointer ${badgeClasses}" aria-expanded="false" aria-controls="store-badge-popover">
                    <span class="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      ${pingEffect}
                      <span class="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 ${dotColor}"></span>
                    </span>
                    ${textStr}
                </button>
                ${popoverHTML}
            </div>
        `;

        const trigger = this.container.querySelector('#store-badge-trigger');
        const popover = this.container.querySelector('#store-badge-popover');
        
        this._setupPopoverListeners(trigger, popover);
    }
}
