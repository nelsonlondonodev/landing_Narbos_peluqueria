import { searchIndex } from '../data/searchIndex.js';
import { searchSite, normalize, findHighlightRanges } from '../utils/siteSearchEngine.js';
import { escapeHTML } from '../utils/escapeHTML.js';
import { resolveRoute, getWhatsAppUrl } from '../config.js';
import { searchIcon } from './Navbar.js';

/** @typedef {import('../utils/siteSearchEngine.js').SearchResult} SearchResult */

/** Cada tipo de resultado, en el orden en que se pintan sus grupos. */
const GROUPS = Object.freeze([
    { type: 'pagina', label: 'Ir a', limit: 4, icon: '<path d="M9 18l6-6-6-6"/>' },
    { type: 'servicio', label: 'Servicios y precios', limit: 6, icon: '<path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8L4 8.8h6.1z"/>' },
    { type: 'articulo', label: 'Del blog', limit: 3, icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>' }
]);

const POPULAR_SEARCHES = ['Balayage', 'Uñas acrílicas', 'Masajes', 'Limpieza facial', 'Corte dama', 'Maquillaje de novia'];

// Lo que tarda en darse por buena una búsqueda sin resultados. Antes, cada tecla
// intermedia («bal», «bala»…) acabaría en Clarity como si fuera una búsqueda.
const NO_RESULT_REPORT_DELAY = 1500;

/**
 * Título con los términos encontrados envueltos en `<mark>`.
 * @param {string} title
 * @param {string[]} terms
 * @returns {string} HTML escapado.
 */
function highlight(title, terms) {
    const chars = [...title];
    let html = '';
    let cursor = 0;
    for (const [start, end] of findHighlightRanges(title, terms)) {
        html += escapeHTML(chars.slice(cursor, start).join(''));
        html += `<mark class="bg-transparent text-brand-green font-semibold">${escapeHTML(chars.slice(start, end).join(''))}</mark>`;
        cursor = end;
    }
    return html + escapeHTML(chars.slice(cursor).join(''));
}

/**
 * Buscador interno del sitio, en forma de paleta de comandos.
 *
 * Se carga en diferido desde `SearchController`: ni el índice ni este módulo viajan
 * con la página, solo cuando alguien va a buscar.
 */
export class SiteSearch {
    /**
     * @param {string} appRoot - Raíz absoluta del sitio, para resolver los enlaces
     *   igual desde la home que desde un artículo del blog.
     */
    constructor(appRoot) {
        this.appRoot = appRoot;
        /** @type {HTMLAnchorElement[]} */
        this.options = [];
        this.activeIndex = -1;
        /** @type {ReturnType<typeof setTimeout>|null} */
        this.noResultTimer = null;
        /** @type {string|null} */
        this.pendingNoResult = null;
        this.reportedNoResults = new Set();

        this.render();
        this.bindEvents();
    }

    render() {
        const dialog = document.createElement('dialog');
        dialog.id = 'site-search';
        dialog.setAttribute('aria-label', "Buscar en Narbo's Salón Spa");
        dialog.className = [
            'm-0 p-0 w-full max-w-none h-[100dvh] max-h-none bg-white text-brand-gray-dark',
            'open:flex open:flex-col',
            // El dialog modal va con `inset: 0`: sin `bottom-auto`, `h-auto` se estira hasta abajo.
            'md:mx-auto md:mt-[12vh] md:bottom-auto md:h-auto md:max-h-[76vh] md:max-w-2xl md:rounded-2xl md:shadow-2xl',
            'backdrop:bg-brand-gray-dark/60 backdrop:backdrop-blur-sm',
            'transition-[opacity,translate] duration-200 ease-out starting:open:opacity-0 starting:open:translate-y-2'
        ].join(' ');

        dialog.innerHTML = `
            <div class="flex items-center gap-3 px-4 md:px-5 py-3 border-b border-brand-gray-lighter">
                ${searchIcon('w-5 h-5 shrink-0 text-brand-green')}
                <input id="site-search-input" type="search" role="combobox" aria-expanded="false" aria-controls="site-search-results" aria-autocomplete="list"
                    autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go"
                    placeholder="¿Qué buscas? Balayage, uñas, masajes…"
                    class="flex-1 min-w-0 bg-transparent text-lg py-2 outline-none placeholder:text-brand-gray-dark/50 [&::-webkit-search-cancel-button]:hidden">
                <button type="button" data-search-close class="shrink-0 text-sm font-medium text-brand-green px-2 py-1 rounded-md hover:bg-brand-light/40 focus-visible:outline-2 focus-visible:outline-brand-green">
                    <span class="md:hidden">Cancelar</span>
                    <kbd class="max-md:hidden font-sans text-xs border border-brand-gray-lighter rounded px-1.5 py-0.5">Esc</kbd>
                </button>
            </div>
            <div id="site-search-results" role="listbox" aria-label="Resultados de búsqueda" class="flex-1 overflow-y-auto overscroll-contain px-2 pb-3"></div>
            <p id="site-search-status" class="sr-only" aria-live="polite"></p>
            <div class="max-md:hidden flex gap-4 px-5 py-2.5 border-t border-brand-gray-lighter text-xs text-brand-gray-dark/60">
                <span><kbd class="font-sans">↑</kbd> <kbd class="font-sans">↓</kbd> para moverte</span>
                <span><kbd class="font-sans">Enter</kbd> para abrir</span>
            </div>
        `;

        document.body.appendChild(dialog);
        this.dialog = dialog;
        this.input = /** @type {HTMLInputElement} */ (dialog.querySelector('#site-search-input'));
        this.results = /** @type {HTMLElement} */ (dialog.querySelector('#site-search-results'));
        this.status = /** @type {HTMLElement} */ (dialog.querySelector('#site-search-status'));
    }

    bindEvents() {
        this.input.addEventListener('input', () => this.update());
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));

        this.dialog.addEventListener('click', (e) => {
            const target = /** @type {HTMLElement} */ (e.target);
            if (target.closest('[data-search-close]')) return this.close();

            const suggestion = target.closest('[data-search-suggestion]');
            if (suggestion) {
                this.input.value = suggestion.textContent?.trim() ?? '';
                this.update();
                this.input.focus();
                return;
            }

            // Clic en el fondo: el `::backdrop` cuenta como clic sobre el propio dialog.
            if (target === this.dialog) {
                const rect = this.dialog.getBoundingClientRect();
                const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                if (!inside) this.close();
            }
        });

        this.results.addEventListener('pointermove', (e) => {
            const option = /** @type {HTMLElement} */ (e.target).closest('[role="option"]');
            if (option) this.setActive(this.options.indexOf(/** @type {HTMLAnchorElement} */ (option)), false);
        });

        this.dialog.addEventListener('close', () => {
            document.documentElement.style.overflow = '';
            this.flushNoResultReport();
        });
    }

    open() {
        if (this.dialog.open) return;
        // `showModal` no bloquea el scroll de la página de fondo.
        document.documentElement.style.overflow = 'hidden';
        this.dialog.showModal();
        this.input.focus();
        this.input.select();
        this.update();
    }

    close() {
        this.dialog.close();
    }

    update() {
        const query = this.input.value.trim();

        if (!query) {
            this.renderSuggestions();
            this.cancelNoResultReport();
            return;
        }

        const results = searchSite(searchIndex, query);
        if (results.length === 0) {
            this.renderNoResults(query);
            this.scheduleNoResultReport(query);
        } else {
            this.renderResults(results);
            this.cancelNoResultReport();
        }
    }

    renderSuggestions() {
        this.results.innerHTML = `
            <p class="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark/60">Lo más buscado</p>
            <div class="flex flex-wrap gap-2 px-3">
                ${POPULAR_SEARCHES.map(term => `
                    <button type="button" data-search-suggestion class="px-3.5 py-2 rounded-full bg-brand-light/40 text-sm hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-brand-green transition-colors">${escapeHTML(term)}</button>
                `).join('')}
            </div>
        `;
        this.setOptions([]);
        this.status.textContent = '';
    }

    /**
     * @param {string} query
     */
    renderNoResults(query) {
        const whatsappUrl = getWhatsAppUrl(`Hola, busqué «${query}» en la web de Narbo's y no lo encontré. ¿Lo hacen?`);
        this.results.innerHTML = `
            <div class="px-4 py-10 text-center">
                <p class="text-base">No encontramos nada para «<strong>${escapeHTML(query)}</strong>».</p>
                <p class="mt-1 text-sm text-brand-gray-dark/70">Puede que lo hagamos y no esté en la web. Pregúntanos sin compromiso.</p>
                <a href="${whatsappUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-brand-green text-white font-medium hover:bg-brand-gray-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">
                    Escríbenos por WhatsApp
                </a>
            </div>
        `;
        this.setOptions([]);
        this.status.textContent = 'Sin resultados';
    }

    /**
     * @param {SearchResult[]} results
     */
    renderResults(results) {
        let optionCount = 0;
        const groupsHTML = GROUPS.map(group => {
            const groupResults = results.filter(r => r.entry.type === group.type).slice(0, group.limit);
            if (groupResults.length === 0) return '';

            const optionsHTML = groupResults.map(({ entry, matchedTerms }) => {
                const details = [entry.subtitle, entry.meta].filter(Boolean).join(' · ');
                return `
                    <a role="option" id="site-search-option-${optionCount++}" aria-selected="false"
                        href="${resolveRoute(entry.link, this.appRoot)}"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-xl aria-selected:bg-brand-light/50 transition-colors">
                        <span class="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-brand-light/40 text-brand-green">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">${group.icon}</svg>
                        </span>
                        <span class="flex-1 min-w-0">
                            <span class="block font-medium leading-snug line-clamp-2">${highlight(entry.title, matchedTerms)}</span>
                            <span class="block text-sm text-brand-gray-dark/70 truncate">${escapeHTML(details)}</span>
                        </span>
                    </a>
                `;
            }).join('');

            return `
                <div role="group" aria-labelledby="site-search-group-${group.type}">
                    <p id="site-search-group-${group.type}" class="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark/60">${group.label}</p>
                    ${optionsHTML}
                </div>
            `;
        }).join('');

        this.results.innerHTML = groupsHTML;
        this.setOptions([...this.results.querySelectorAll('[role="option"]')]);
        this.status.textContent = optionCount === 1 ? '1 resultado' : `${optionCount} resultados`;
    }

    /**
     * @param {HTMLAnchorElement[]} options
     */
    setOptions(options) {
        this.options = options;
        this.input.setAttribute('aria-expanded', String(options.length > 0));
        this.setActive(options.length > 0 ? 0 : -1, false);
    }

    /**
     * @param {number} index
     * @param {boolean} scroll - Solo al moverse con el teclado: con el ratón, desplazar
     *   la lista bajo el puntero haría saltar la opción activa.
     */
    setActive(index, scroll) {
        this.options[this.activeIndex]?.setAttribute('aria-selected', 'false');
        this.activeIndex = index;
        const active = this.options[index];
        if (!active) {
            this.input.removeAttribute('aria-activedescendant');
            return;
        }
        active.setAttribute('aria-selected', 'true');
        this.input.setAttribute('aria-activedescendant', active.id);
        if (scroll) active.scrollIntoView({ block: 'nearest' });
    }

    /**
     * @param {KeyboardEvent} e
     */
    handleKeydown(e) {
        if (this.options.length === 0) return;
        const last = this.options.length - 1;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.setActive(this.activeIndex >= last ? 0 : this.activeIndex + 1, true);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.setActive(this.activeIndex <= 0 ? last : this.activeIndex - 1, true);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            // `click` y no `location.assign`, para que pase por las transiciones de página.
            this.options[this.activeIndex]?.click();
        }
    }

    /**
     * Las búsquedas sin resultados se mandan a Clarity como etiqueta de sesión: dicen qué
     * piden los clientes que la web no tiene. Se espera a que la persona deje de escribir.
     * @param {string} query
     */
    scheduleNoResultReport(query) {
        this.cancelNoResultReport();
        this.pendingNoResult = query;
        this.noResultTimer = setTimeout(() => this.flushNoResultReport(), NO_RESULT_REPORT_DELAY);
    }

    cancelNoResultReport() {
        if (this.noResultTimer) clearTimeout(this.noResultTimer);
        this.noResultTimer = null;
        this.pendingNoResult = null;
    }

    flushNoResultReport() {
        const query = this.pendingNoResult;
        this.cancelNoResultReport();
        if (!query || query.length < 3) return;

        const key = normalize(query);
        if (this.reportedNoResults.has(key)) return;
        this.reportedNoResults.add(key);

        // Si Clarity no ha cargado (sin consentimiento, bloqueador), no se registra nada.
        const { clarity } = /** @type {Window & { clarity?: (...args: string[]) => void }} */ (window);
        clarity?.('set', 'busqueda_sin_resultado', query);
        clarity?.('event', 'busqueda_sin_resultado');
    }
}
