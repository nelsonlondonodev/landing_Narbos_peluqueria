export class BusinessStatusBadge {
    /**
     * @param {string} containerId - El ID del elemento donde se inyectará el componente
     */
    constructor(containerId = 'business-status-root') {
        this.container = document.getElementById(containerId);
    }
    
    init() {
        if (!this.container) return;
        this.render();
        // Revisar cada minuto para actualizar automáticamente si cruza la hora de cierre/apertura
        setInterval(() => this.render(), 60000);
    }

    isOpen() {
        // Obtenemos la hora actual en la zona horaria de Colombia (UTC-5)
        const bogotaString = new Date().toLocaleString("en-US", { timeZone: "America/Bogota" });
        const bogotaDate = new Date(bogotaString);
        
        const day = bogotaDate.getDay(); // 0 = Domingo, 1 a 6 = Lunes a Sábado
        const hours = bogotaDate.getHours();
        const minutes = bogotaDate.getMinutes();
        
        // Valor decimal de la hora (ej: 7:30 = 7.5) para facilitar la comparación
        const timeValue = hours + (minutes / 60);

        // Horarios oficiales de Narbo's Salon Spa:
        // Lunes a Sábado (1-6): 07:00 a 20:00
        if (day >= 1 && day <= 6) {
            return timeValue >= 7 && timeValue < 20;
        } 
        // Domingos (0): 09:00 a 18:00
        else if (day === 0) {
            return timeValue >= 9 && timeValue < 18;
        }
        
        return false;
    }

    render() {
        if (!this.container) return;
        
        const open = this.isOpen();
        
        const badgeClasses = open 
            ? "bg-black/40 backdrop-blur-md text-white border-white/20"
            : "bg-black/60 backdrop-blur-md text-white border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
            
        const textStr = open ? "ABIERTO AHORA" : "CERRADO AHORA";
        const dotColor = open ? "bg-green-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]";
        
        const pingEffect = open 
            ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}"></span>` 
            : `<span class="animate-pulse absolute inline-flex h-full w-full rounded-full opacity-50 ${dotColor}"></span>`;

        this.container.innerHTML = `
            <div title="Horario: Lun-Sáb 7am a 8pm | Dom 9am a 6pm" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 transform hover:scale-105 ${badgeClasses}">
                <span class="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                  ${pingEffect}
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 ${dotColor}"></span>
                </span>
                ${textStr}
            </div>
        `;
    }
}
