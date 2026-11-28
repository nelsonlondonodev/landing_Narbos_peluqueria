/**
 * Desplegable «Servicios» de escritorio.
 *
 * Abre con ratón, clic, toque y teclado. El estado vive en `data-open` (lo pinta el CSS) y
 * en `aria-expanded`. Sin JavaScript, el CSS abre el panel con `:hover` y `:focus-within`
 * mientras la raíz no tenga `data-enhanced`.
 */

/** Espera antes de abrir: un cursor que solo cruza el botón no despliega nada. */
export const OPEN_DELAY_MS = 80;
/** Espera antes de cerrar: cubre el hueco entre el botón y el panel. */
export const CLOSE_DELAY_MS = 250;

export class ServicesMenu {
    /** @param {HTMLElement|null} root - Contenedor `[data-services-nav]`. */
    constructor(root) {
        this.root = root;
        this.button = root?.querySelector('button[aria-controls]') ?? null;
        this.timer = null;
        this.openedByHover = false;
    }

    get isOpen() {
        return this.root.hasAttribute('data-open');
    }

    init() {
        // `data-enhanced` evita enlazar dos veces los mismos eventos.
        if (!this.button || this.root.hasAttribute('data-enhanced')) return;
        this.root.setAttribute('data-enhanced', '');

        const doc = this.root.ownerDocument;

        this.root.addEventListener('pointerenter', (e) => this.onPointerEnter(e));
        this.root.addEventListener('pointerleave', (e) => this.onPointerLeave(e));
        this.root.addEventListener('focusout', (e) => this.onFocusOut(e));
        this.button.addEventListener('click', () => this.onClick());
        this.button.addEventListener('keydown', (e) => this.onButtonKeydown(e));
        doc.addEventListener('keydown', (e) => this.onEscape(e));
        doc.addEventListener('pointerdown', (e) => {
            if (!this.root.contains(e.target)) this.close();
        });
        // Al volver con «atrás», el navegador restaura la página tal como quedó.
        doc.defaultView.addEventListener('pageshow', () => this.close());
    }

    open() {
        clearTimeout(this.timer);
        this.root.setAttribute('data-open', '');
        this.button.setAttribute('aria-expanded', 'true');
    }

    close() {
        clearTimeout(this.timer);
        this.openedByHover = false;
        this.root.removeAttribute('data-open');
        this.button.setAttribute('aria-expanded', 'false');
    }

    // En pantallas táctiles el puntero «entra» justo antes del clic: ahí manda el clic.
    onPointerEnter(event) {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(this.timer);
        if (this.isOpen) return;
        this.timer = setTimeout(() => {
            this.open();
            this.openedByHover = true;
        }, OPEN_DELAY_MS);
    }

    onPointerLeave(event) {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.close(), CLOSE_DELAY_MS);
    }

    onClick() {
        // Un clic sobre un menú que el ratón acaba de abrir lo deja abierto, no lo cierra.
        if (this.isOpen && !this.openedByHover) {
            this.close();
            return;
        }
        this.open();
        this.openedByHover = false;
    }

    onButtonKeydown(event) {
        if (event.key !== 'ArrowDown') return;
        event.preventDefault();
        this.open();
        this.root.querySelector('a[href]')?.focus();
    }

    onEscape(event) {
        if (event.key !== 'Escape' || !this.isOpen) return;
        const hadFocus = this.root.contains(this.root.ownerDocument.activeElement);
        this.close();
        if (hadFocus) this.button.focus();
    }

    onFocusOut(event) {
        // Sin `relatedTarget` el foco no ha ido a ningún sitio (Safari no enfoca botones):
        // el clic fuera ya lo cubre `pointerdown`.
        if (event.relatedTarget && !this.root.contains(event.relatedTarget)) this.close();
    }
}
