import { ServicesMenu } from './ServicesMenu.js';
import { limpiarRuta } from '../utils/rutas.js';

/** Además, sin barra final: `/blog` y `/blog/` son la misma página. */
const rutaDePagina = (pathname) => limpiarRuta(pathname).replace(/\/+$/, '');

/**
 * Controlador del Header.
 * Maneja el estado del scroll, el desplegable de servicios y la página actual.
 */
export class HeaderController {
    constructor(headerElement) {
        // El Header ya viene en el HTML (SSG).
        this.header = headerElement || document.querySelector('.site-header') || document.querySelector('header');
    }

    init() {
        if (!this.header) return;

        this.initScrollEffect();
        new ServicesMenu(this.header.querySelector('[data-services-nav]')).init();
        this.markCurrentPage();
    }

    /**
     * Cambia el estilo del header al hacer scroll.
     * Optimizado con requestAnimationFrame para evitar sobrecarga.
     */
    initScrollEffect() {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                this.header.classList.toggle('header-scrolled', window.scrollY > 50);
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        handleScroll();
    }

    /**
     * Señala con `aria-current` el enlace de la página abierta. Un enlace principal («Blog»)
     * queda marcado también dentro de sus subpáginas.
     */
    markCurrentPage() {
        const current = rutaDePagina(window.location.pathname);

        this.header.querySelectorAll('.desktop-menu a[href]').forEach((link) => {
            const target = rutaDePagina(new URL(link.href, window.location.href).pathname);
            const isPage = target === current;
            const isSection = link.classList.contains('nav-top') && target !== '' && current.startsWith(`${target}/`);

            if (!isPage && !isSection) return;

            link.setAttribute('aria-current', isPage ? 'page' : 'true');
            link.closest('[data-services-nav]')?.querySelector('button')?.setAttribute('data-current', '');
        });
    }
}
