import { GoogleMapsService } from '../services/GoogleMapsService.js';
import { siteConfig } from '../config.js';
import { TIME_ZONE } from '../data/place-config.js';
import businessHours from '../data/business-hours.js';

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export class StoreBadge {
    /**
     * @param {string} containerId - El ID del elemento donde se inyectará el componente
     */
    constructor(containerId = 'business-status-root') {
        this.container = document.getElementById(containerId);
        this.lastState = null;
        this.lastLabel = null;
        this.specialReason = null;
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
        const open = this.calculateStatus();
        const label = open ? 'ABIERTO AHORA' : (this.specialReason || 'CERRADO AHORA');

        if (this.lastState !== open || this.lastLabel !== label) {
            this.lastState = open;
            this.lastLabel = label;
            this.render(open, label, this.isLive);
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
            timeZone: TIME_ZONE,
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
     * Selecciona los tramos de atención que aplican al día de hoy.
     *
     * Google entrega dos formas de periodo: los de `currentOpeningHours` vienen
     * fechados (y ya incorporan el horario especial de un festivo tal como está
     * en la ficha), mientras que los de `regularOpeningHours` solo indican día de
     * la semana. Si hay periodos fechados, ellos mandan: que hoy no aparezca
     * significa cerrado durante toda la jornada.
     *
     * @param {Array} periods
     * @param {Object} parts - Fecha de hoy en Bogotá
     * @param {number} dayOfWeek
     * @returns {Array} Tramos aplicables a hoy
     */
    _getTodayPeriods(periods, parts, dayOfWeek) {
        const dated = periods.filter(p => p.open?.date);

        if (dated.length > 0) {
            return dated.filter(p =>
                p.open.date.year === parts.bYear &&
                p.open.date.month === parts.bMonth &&
                p.open.date.day === parts.bDayOfMonth
            );
        }

        return periods.filter(p => p.open?.day === dayOfWeek);
    }

    /**
     * Serializa una lista de tramos para poder compararlos entre sí.
     * @param {Array} periods
     * @returns {string}
     */
    _fingerprint(periods) {
        return periods
            .map(p => `${p.open?.hour}:${p.open?.minute}-${p.close?.hour}:${p.close?.minute}`)
            .sort()
            .join('|');
    }

    /**
     * Determina si hoy tiene un horario distinto al habitual de ese día de la semana
     * (festivo, jornada especial o cierre excepcional configurado en Google).
     * @param {Array} todayPeriods
     * @param {number} dayOfWeek
     * @returns {boolean}
     */
    _isSpecialToday(todayPeriods, dayOfWeek) {
        const regular = this.liveData?.regularPeriods?.length
            ? this.liveData.regularPeriods
            : (businessHours.periods || []);

        if (!regular.length) return false;

        const regularToday = regular.filter(p => p.open?.day === dayOfWeek);
        return this._fingerprint(todayPeriods) !== this._fingerprint(regularToday);
    }

    /**
     * Convierte un extremo de periodo de Google a minutos desde medianoche.
     * @param {Object} point - { hour, minute }
     * @returns {number}
     */
    _toMinutes(point) {
        return (point?.hour || 0) * 60 + (point?.minute || 0);
    }

    /**
     * Calcula el estado de apertura a partir de los horarios de Google.
     * Usa los datos en vivo si están disponibles y, si no, los sincronizados en el build.
     * @returns {boolean}
     */
    calculateStatus() {
        this.specialReason = null;
        this.todayNote = null;

        const parts = this._getBogotaTimeParts();
        const dayOfWeek = this._getDayOfWeek(parts.bYear, parts.bMonth, parts.bDayOfMonth);
        const periods = this.liveData?.periods?.length
            ? this.liveData.periods
            : (businessHours.periods || []);

        const todayPeriods = this._getTodayPeriods(periods, parts, dayOfWeek);
        const isSpecial = this._isSpecialToday(todayPeriods, dayOfWeek);

        // Sin tramos hoy: cerrado toda la jornada.
        if (todayPeriods.length === 0) {
            if (dayOfWeek === 0) {
                this.specialReason = 'CERRADO DOMINGOS';
            } else {
                this.specialReason = isSpecial ? 'CERRADO HOY (FESTIVO)' : 'CERRADO HOY';
            }
            return false;
        }

        const nowMinutes = parts.bHour * 60 + parts.bMinute;
        const isOpen = todayPeriods.some(p => {
            const opens = this._toMinutes(p.open);
            let closes = this._toMinutes(p.close);
            if (closes <= opens) closes += 24 * 60; // Cierre pasada la medianoche
            return nowMinutes >= opens && nowMinutes < closes;
        });

        // Hay atención hoy pero estamos fuera del horario: es un cierre por hora,
        // no un cierre por festivo. Etiquetarlo como festivo era el error anterior.
        if (!isOpen) {
            this.specialReason = 'CERRADO AHORA';
        } else if (isSpecial) {
            const p = todayPeriods[0];
            this.todayNote = `Hoy: horario especial ${this._formatPoint(p.open)} – ${this._formatPoint(p.close)}`;
        }

        return isOpen;
    }

    /**
     * Formatea un extremo de periodo como hora legible (ej: "9:00 AM").
     * @param {Object} point
     * @returns {string}
     */
    _formatPoint(point) {
        const hour = point?.hour ?? 0;
        const minute = String(point?.minute ?? 0).padStart(2, '0');
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const display = hour % 12 === 0 ? 12 : hour % 12;
        return `${display}:${minute} ${suffix}`;
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

        return this.weekdayText.map(text => {
            const separator = text.indexOf(':');
            const day = text.slice(0, separator);
            const time = text.slice(separator + 1).trim();
            const isClosed = /cerrado/i.test(time);
            const colorClass = isClosed ? 'text-red-400' : 'text-white';

            return `
                <li class="flex justify-between items-center gap-3">
                    <span class="opacity-80 capitalize">${day}:</span>
                    <span class="font-bold text-right ${colorClass}">${time}</span>
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
