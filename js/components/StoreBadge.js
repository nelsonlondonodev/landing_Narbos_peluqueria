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

    isOpen() {
        // Forma robusta compatible con Safari y navegadores móviles para forzar UTC-5 (Bogotá)
        const now = new Date();
        const options = { timeZone: 'America/Bogota', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        
        // Obtener las partes formateadas directamente para evitar parseos de string (que fallan en Safari)
        const parts = formatter.formatToParts(now);
        const getPart = (type) => parseInt(parts.find(p => p.type === type).value, 10);
        
        const bYear = getPart('year');
        const bMonth = getPart('month'); // formatter.formatToParts month is 1-12
        const bDayOfMonth = getPart('day');
        const bHour = getPart('hour') === 24 ? 0 : getPart('hour');
        const bMinute = getPart('minute');
        
        // Calcular el día de la semana para Colombia de manera precisa
        // JavaScript Date.UTC method uses month 0-11
        const utcBogota = new Date(Date.UTC(bYear, bMonth - 1, bDayOfMonth));
        const dayOfWeek = utcBogota.getUTCDay(); // 0 = Domingo, 1 a 6 = Lunes a Sábado
        
        // --- EXCEPCIONES DE CIERRE (Días especiales) ---
        // Hoy 3 de Abril de 2026: Cerrado (Nelson)
        const isSpecialClosure = bYear === 2026 && 
                                 bMonth === 4 && // Abril es 4
                                 bDayOfMonth === 3;
        
        if (isSpecialClosure) {
            this.specialReason = "CERRADO POR HOY";
            return false;
        }

        this.specialReason = null;
        // --- LÓGICA DE DÍAS (Lunes a Sábado) ---
        // Valor decimal de la hora (ej: 7:30 = 7.5) para facilitar la comparación
        const timeValue = bHour + (bMinute / 60);

        // Domingos y Festivos: CERRADO
        if (dayOfWeek === 0) {
            this.specialReason = "CERRADO DOMINGOS";
            return false;
        }

        // Horarios oficiales de Narbo's Salon Spa:
        // Lunes a Sábado (1-6): 07:00 a 20:00
        if (dayOfWeek >= 1 && dayOfWeek <= 6) {
            return timeValue >= 7 && timeValue < 20;
        } 
        
        return false;
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
