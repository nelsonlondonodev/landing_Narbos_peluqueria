import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { ServiceCard } from '../js/components/ServiceCard.js';
import { getServiceWhatsAppUrl } from '../js/config.js';
import { appendServiceCards } from '../js/utils/serviceCards.js';
import { hairPageServices } from '../js/data/hairPageServices.js';
import { makeupServices } from '../js/data/makeupServices.js';

function pintar(props) {
    globalThis.document = new JSDOM('<!doctype html><body>').window.document;
    return new ServiceCard({ title: 'Balayage', description: 'Texto', price: '$1', duration: '2 horas', image: 'a.webp', variant: 'standard', ...props }).render();
}

test('la tarjeta de reserva lleva a WhatsApp con el servicio en el mensaje', () => {
    const tarjeta = pintar({ reserva: true });
    const enlace = tarjeta.querySelector('a');

    assert.equal(tarjeta.tagName, 'DIV');
    assert.equal(tarjeta.hasAttribute('data-modal-target'), false);
    assert.equal(enlace.href, getServiceWhatsAppUrl('Balayage'));
    assert.match(decodeURIComponent(enlace.href), /Hola, quisiera agendar una cita para Balayage$/);
    assert.equal(enlace.dataset.whatsappServicio, 'Balayage');
});

test('la tarjeta de reserva muestra la duración y el texto completo', () => {
    const tarjeta = pintar({ reserva: true });

    assert.match(tarjeta.textContent, /Duración: 2 horas/);
    assert.equal(tarjeta.querySelector('.line-clamp-3'), null);
});

test('una tarjeta con enlace sigue llevando a su página', () => {
    const tarjeta = pintar({ link: '/servicios/balayage' });

    assert.equal(tarjeta.tagName, 'A');
    assert.equal(tarjeta.getAttribute('href'), '/servicios/balayage');
    assert.match(tarjeta.textContent, /Ver detalles/);
    assert.doesNotMatch(tarjeta.textContent, /Duración/);
});

test('peluquería y maquillaje ya no piden modal y sus reservas traen duración', () => {
    const servicios = [...hairPageServices, ...makeupServices];
    const reservas = servicios.filter(servicio => servicio.reserva);

    assert.equal(servicios.some(servicio => 'modal' in servicio), false);
    assert.ok(reservas.length > 0);
    assert.ok(reservas.every(servicio => servicio.duration));
});

test('en cliente, las tarjetas resuelven sus rutas y las de reserva no llevan enlace propio', () => {
    const { window } = new JSDOM('<!doctype html><body><div id="grid"></div>');
    globalThis.document = window.document;
    globalThis.window = { narbosApp: { raiz: '/raiz/', resolvePath(ruta) { return `${this.raiz}${ruta}`; } } };
    const grid = window.document.getElementById('grid');

    appendServiceCards(grid, [
        { title: 'Corte', description: 'Texto', image: 'a.webp', link: 'servicios/corte' },
        { title: 'Balayage', description: 'Texto', image: 'b.webp', reserva: true }
    ]);

    const [hub, reserva] = grid.children;
    assert.equal(hub.getAttribute('href'), '/raiz/servicios/corte');
    assert.equal(reserva.tagName, 'DIV');
    assert.equal(reserva.querySelector('img').getAttribute('src'), '/raiz/b.webp');
});
