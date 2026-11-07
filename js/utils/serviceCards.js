import { ServiceCard } from '../components/ServiceCard.js';

/**
 * Pinta tarjetas de servicio en cliente. Con el build no hace falta, porque llegan del
 * SSG: solo cubre el trabajo contra el código fuente.
 *
 * @param {HTMLElement} container
 * @param {ReadonlyArray<{ image: string, link?: string, variant?: string }>} services
 */
export function appendServiceCards(container, services) {
    const app = window.narbosApp;

    services.forEach(service => {
        container.appendChild(new ServiceCard({
            ...service,
            image: app.resolvePath(service.image),
            link: service.link && app.resolvePath(service.link),
            variant: service.variant || 'standard'
        }).render());
    });
}
