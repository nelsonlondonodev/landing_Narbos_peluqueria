import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { ServiceCard } from '../js/components/ServiceCard.js';
import { getWhatsAppUrl } from '../js/config.js';
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
    assert.equal(enlace.href, getWhatsAppUrl('Hola, quisiera agendar una cita para Balayage'));
    assert.equal(enlace.dataset.whatsappServicio, 'Balayage');
});

test('la tarjeta de reserva muestra la duración y el texto completo', () => {
    const tarjeta = pintar({ reserva: true });

    assert.match(tarjeta.textContent, /Duración: 2 horas/);
    assert.equal(tarjeta.querySelector('.line-clamp-3'), null);
});

test('una tarjeta con modal sigue igual', () => {
    const tarjeta = pintar({ modalId: 'service-modal' });

    assert.equal(tarjeta.tagName, 'BUTTON');
    assert.equal(tarjeta.dataset.modalTarget, 'balayage');
    assert.match(tarjeta.textContent, /Ver detalles/);
    assert.doesNotMatch(tarjeta.textContent, /Duración/);
    assert.equal(tarjeta.querySelector('a'), null);
});

test('peluquería y maquillaje ya no piden modal y sus reservas traen duración', () => {
    const servicios = [...hairPageServices, ...makeupServices];
    const reservas = servicios.filter(servicio => servicio.reserva);

    assert.equal(servicios.some(servicio => 'modal' in servicio), false);
    assert.equal(reservas.length, 17);
    assert.ok(reservas.every(servicio => servicio.duration));
});
