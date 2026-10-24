import { GoogleMapsService } from '../services/GoogleMapsService.js';
import { siteConfig } from '../config.js';
import { TIME_ZONE } from '../data/place-config.js';
import businessHours from '../data/business-hours.js';
import { buildHoursRows, SPECIAL_BADGE_HTML } from '../utils/hoursRows.js';
import { calcularEstadoNegocio, momentoEnZona } from '../utils/estadoNegocio.js';

export class StoreBadge {
    /**
     * @param {string} containerId - El ID del elemento donde se inyectará el componente
     */
    constructor(containerId = 'business-status-root') {
        this.container = document.getElementById(containerId);
        this.lastState = null;
        this.lastLabel = null;
        this.todayNote = null;
        this.isLive = false;
        this.liveData = null;
        this.weekdayText = businessHours.weekdayText || [];
    }

    async init() {
        if (!this.container) return;

        // 1. Mostrar estado inicial basado en fallback local inmediato (LCP veloz)
        this.checkAndUpdate();

        // 2. Intentar sincronizar estado real en vivo desde Google Maps (Places API)
        try {
            const googleService = new GoogleMapsService(siteConfig.contact.googleMapsApiKey);
            const liveData = await googleService.getBusinessHours();

            if (liveData && liveData.periods?.length) {
                this.liveData = liveData;
                this.isLive = true;
                if (liveData.weekdayText?.length) this.weekdayText = liveData.weekdayText;
                // Forzar el repintado: si la etiqueta no cambia, el popover se
                // quedaba con el horario del build.
                this.lastLabel = null;
                this.checkAndUpdate();
            }
        } catch (error) {
            // Fallback silencioso en caso de error de conexión
        }

        // 3. Refrescar el estado cada minuto para que el badge no se congele
        //    en pestañas abiertas mucho tiempo (no consume llamadas a la API).
        this.timer = setInterval(() => this.checkAndUpdate(), 60 * 1000);
    }

    checkAndUpdate() {
        if (!this.container) return;
        // Datos en vivo de Google si los hay; si no, los sincronizados en el build.
        const delBuild = businessHours.periods || [];
        const { abierto: open, etiqueta: label, nota } = calcularEstadoNegocio({
            periodos: this.liveData?.periods?.length ? this.liveData.periods : delBuild,
            regulares: this.liveData?.regularPeriods?.length ? this.liveData.regularPeriods : delBuild,
            ahora: momentoEnZona(TIME_ZONE)
        });
        this.todayNote = nota;

        if (this.lastState !== open || this.lastLabel !== label) {
            this.lastState = open;
            this.lastLabel = label;
            this.render(open, label, this.isLive);
        }
    }

    /**
     * Obtiene las clases de estilo y colores correspondientes para el Badge.
     * @param {boolean} open
     * @returns {Object}
     */
    _getBadgeStyles(open) {
        // Cerrado no es una alarma: casi siempre dice cuándo vuelve a abrir, y el rojo
        // pegado a «Agenda tu cita» desanimaba a pedir cita por WhatsApp.
        const badgeClasses = open
            ? "bg-black/40 backdrop-blur-md text-white border-white/20"
            : "bg-black/60 backdrop-blur-md text-white border-amber-300/40";

        const dotColor = open ? "bg-green-400" : "bg-amber-400";
        const pingEffect = `<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}"></span>`;

        return { badgeClasses, dotColor, pingEffect };
    }

    /**
     * Construye las filas de horario del popover a partir de los datos de Google.
     * @returns {string} HTML de la lista
     */
    _generateScheduleRows() {
        if (!this.weekdayText.length) {
            return `
                <li class="flex justify-between items-center">
                    <span class="opacity-80">Lunes a Sábado:</span>
                    <span class="font-bold">7:00 AM – 8:00 PM</span>
                </li>
                <li class="flex justify-between items-center text-red-400">
                    <span class="opacity-80">Domingos:</span>
                    <span class="font-bold">CERRADO</span>
                </li>
            `;
        }

        const specialDates = this.isLive ? (this.liveData?.specialDates || []) : [];

        return buildHoursRows(this.weekdayText, specialDates).map(row => {
            const colorClass = row.special ? 'text-brand-medium' : (row.closed ? 'text-red-400' : 'text-white');
            const day = row.dateLabel ? `${row.day} ${row.dateLabel}` : row.day;

            return `
                <li class="flex justify-between items-center gap-3">
                    <span class="opacity-80 capitalize">${day}:${row.special ? SPECIAL_BADGE_HTML : ''}</span>
                    <span class="font-bold text-right ${colorClass}">${row.time}</span>
                </li>
            `;
        }).join('');
    }

    /**
     * Genera el HTML del popover flotante con el detalle de los horarios.
     * @param {boolean} isLive
     * @returns {string} HTML del Popover
     */
    _generatePopoverHTML(isLive) {
        const syncText = isLive
            ? 'Sincronizado en tiempo real con Google (incluye festivos y horarios especiales).'
            : 'Mostrando horario local (sin conexión en tiempo real).';

        const noteHtml = this.todayNote
            ? `<p class="mt-2 text-[10px] text-brand-gold font-semibold">${this.todayNote}</p>`
            : '';

        return `
            <div id="store-badge-popover" class="absolute right-0 mt-2 w-64 bg-brand-gray-dark/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/10 p-4 invisible opacity-0 md:group-hover:visible md:group-hover:opacity-100 transition-all duration-300 z-50 text-left translate-y-1 md:group-hover:translate-y-0" role="region" aria-label="Detalle de horarios de atención">
                <h4 class="font-serif font-bold text-xs text-brand-gold border-b border-white/10 pb-1.5 mb-2 flex justify-between items-center tracking-wider uppercase">
                    <span>Horario de Atención</span>
                    <span class="text-[8px] px-1.5 py-0.5 rounded bg-white/10 font-sans tracking-normal lowercase font-semibold">${isLive ? 'en vivo' : 'local'}</span>
                </h4>
                <ul class="space-y-1.5 text-[11px]">
                    ${this._generateScheduleRows()}
                </ul>
                ${noteHtml}
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

        // Antes de abrirse decide hacia dónde: abajo por defecto, arriba si debajo no
        // cabe y arriba hay más sitio; alineado a la derecha del badge salvo que así se
        // salga por la izquierda. En la home el badge vive al pie del hero y pegado al
        // margen izquierdo, y abriendo siempre igual el horario quedaba fuera de pantalla.
        const orientar = () => {
            const badge = trigger.getBoundingClientRect();
            const cabecera = document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0;
            const abajo = window.innerHeight - badge.bottom;
            const arriba = badge.top - cabecera;
            const haciaArriba = abajo < popover.offsetHeight + 12 && arriba > abajo;
            popover.classList.toggle('bottom-full', haciaArriba);
            popover.classList.toggle('mb-2', haciaArriba);
            popover.classList.toggle('mt-2', !haciaArriba);

            const desdeIzquierda = badge.right - popover.offsetWidth < 8;
            popover.classList.toggle('left-0', desdeIzquierda);
            popover.classList.toggle('right-0', !desdeIzquierda);
        };
        trigger.parentElement?.addEventListener('mouseenter', orientar);
        trigger.addEventListener('focus', orientar);

        const togglePopover = (e) => {
            e.stopPropagation();
            orientar();
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

    render(open, label, isLive = false) {
        if (!this.container) return;

        const { badgeClasses, dotColor, pingEffect } = this._getBadgeStyles(open);
        const popoverHTML = this._generatePopoverHTML(isLive);

        this.container.innerHTML = `
            <div class="relative inline-block group">
                <button id="store-badge-trigger" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider uppercase border transition-all duration-300 transform hover:scale-105 cursor-pointer ${badgeClasses}" aria-expanded="false" aria-controls="store-badge-popover">
                    <span class="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      ${pingEffect}
                      <span class="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 ${dotColor}"></span>
                    </span>
                    ${label}
                </button>
                ${popoverHTML}
            </div>
        `;

        const trigger = this.container.querySelector('#store-badge-trigger');
        const popover = this.container.querySelector('#store-badge-popover');

        this._setupPopoverListeners(trigger, popover);
    }
}
