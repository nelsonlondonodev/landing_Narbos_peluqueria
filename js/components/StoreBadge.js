export class StoreBadge {
    /**
     * @param {string} containerId - El ID del elemento donde se inyectará el componente
     */
    constructor(containerId = 'business-status-root') {
        this.container = document.getElementById(containerId);
        this.lastState = null;
    }
    
    init() {
        if (!this.container) return;
        this.checkAndUpdate();
    }

    checkAndUpdate() {
        if (!this.container) return;
        const open = this.isOpen();
        
        // Solo actualizamos el DOM si el estado ha cambiado, evitando repaints molestos
        if (this.lastState !== open) {
            this.lastState = open;
            this.render(open);
        }
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
     * Verifica si hay alguna regla de cierre excepcional manual (vacaciones/festivos manuales).
     * @param {number} year 
     * @param {number} month 
     * @param {number} day 
     * @returns {boolean} Si está cerrado por razones especiales
     */
    _isSpecialClosure(year, month, day) {
        // Ejemplo de cerrado especial: Abril 3, 2026
        const isClosed = (year === 2026 && month === 4 && day === 3);
        if (isClosed) {
            this.specialReason = "CERRADO POR HOY";
        }
        return isClosed;
    }

    /**
     * Verifica si es un día y hora laboral según los horarios fijos de la peluquería.
     * @param {number} dayOfWeek 
     * @param {number} hour 
     * @param {number} minute 
     * @returns {boolean}
     */
    _isWithinBusinessHours(dayOfWeek, hour, minute) {
        if (dayOfWeek === 0) {
            this.specialReason = "CERRADO DOMINGOS";
            return false;
        }

        const timeValue = hour + (minute / 60);

        if (dayOfWeek >= 1 && dayOfWeek <= 6) {
            // Lunes a Sábado (1-6): 07:00 a 20:00
            return timeValue >= 7 && timeValue < 20;
        }

        return false;
    }

    /**
     * Método principal orquestador que define el estado de apertura.
     */
    isOpen() {
        this.specialReason = null;

        const { bYear, bMonth, bDayOfMonth, bHour, bMinute } = this._getBogotaTimeParts();
        const dayOfWeek = this._getDayOfWeek(bYear, bMonth, bDayOfMonth);
        
        if (this._isSpecialClosure(bYear, bMonth, bDayOfMonth)) {
            return false;
        }

        return this._isWithinBusinessHours(dayOfWeek, bHour, bMinute);
    }

    render(open) {
        if (!this.container) return;
        
        const badgeClasses = open 
            ? "bg-black/40 backdrop-blur-md text-white border-white/20"
            : "bg-black/60 backdrop-blur-md text-white border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
            
        const textStr = open ? "ABIERTO AHORA" : (this.specialReason || "CERRADO AHORA");
        const dotColor = open ? "bg-green-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]";
        
        // Ahora ambos estados (Abierto y Cerrado) usan la animación 'animate-ping' para dar sensación de "en vivo"
        const pingEffect = `<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}"></span>`;

        this.container.innerHTML = `
            <div title="Horario: Lun-Sáb 7am a 8pm | Domingos: CERRADO" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 transform hover:scale-105 ${badgeClasses}">
                <span class="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                  ${pingEffect}
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 ${dotColor}"></span>
                </span>
                ${textStr}
            </div>
        `;
    }
}
