import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { ServiceCard } from '../js/components/ServiceCard.js';
import { getServiceWhatsAppUrl } from '../js/config.js';
import { estheticsCardsFor, estheticsServices } from '../js/data/estheticsServices.js';

const SUBPAGINAS = { 'spa-facial-integral': 4, 'masajes-relajantes': 5, 'cejas-y-pestanas': 2, 'depilacion-corporal': 5 };

test('cada subpágina de estética agenda sus servicios sin enlace propio', () => {
    for (const [pagina, total] of Object.entries(SUBPAGINAS)) {
        const tarjetas = estheticsCardsFor(pagina);
        assert.equal(tarjetas.length, total, pagina);
        assert.ok(tarjetas.every(tarjeta => tarjeta.reserva && !tarjeta.link), pagina);
    }
});

test('el hub de estética sigue enlazando a sus subpáginas', () => {
    assert.equal(estheticsServices.length, 16);
    assert.ok(estheticsServices.every(servicio => servicio.link && !servicio.reserva));
});

test('la limpieza facial y la microdermoabrasión conservan el «Desde»', () => {
    const precios = estheticsCardsFor('spa-facial-integral').map(tarjeta => tarjeta.price);
    assert.deepEqual(precios, ['Desde $130.000', 'Desde $75.000', '$220.000', 'Sesión desde $75.000']);
});

test('una tarjeta de reserva con logo también lleva a WhatsApp', () => {
    globalThis.document = new JSDOM('<!doctype html><body>').window.document;
    const tarjeta = new ServiceCard({ title: 'Cera', description: 'Texto', image: 'a.webp', variant: 'logo', reserva: true }).render();

    assert.equal(tarjeta.querySelector('a').href, getServiceWhatsAppUrl('Cera'));
    assert.doesNotMatch(tarjeta.textContent, /Ver detalles/);
    assert.equal(tarjeta.querySelector('.line-clamp-3'), null);
});
