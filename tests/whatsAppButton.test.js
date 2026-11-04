import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { WhatsAppButton } from '../js/components/WhatsAppButton.js';
import { getHeroHTML } from '../js/components/HeroSection.js';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../js/config.js';

/** Monta el botón en una página de prueba y devuelve su enlace, si lo pinta. */
function pintarBoton({ url = 'https://narbossalon.com/', cuerpo = '' } = {}) {
    const { window } = new JSDOM(`<!doctype html><body>${cuerpo}`, { url });
    globalThis.window = window;
    globalThis.document = window.document;
    new WhatsAppButton().init();
    return window.document.getElementById('wa-chat-link');
}

test('abre el chat con el mensaje del hero de la página', () => {
    const hrefDelHero = getWhatsAppUrl('Hola, vengo de la página de balayage');
    const enlace = pintarBoton({ cuerpo: `<a data-whatsapp-page href="${hrefDelHero}">Agenda</a>` });
    assert.equal(enlace.href, hrefDelHero);
    assert.equal(enlace.target, '_blank');
});

test('sin hero usa el mensaje genérico', () => {
    assert.equal(pintarBoton().getAttribute('href'), getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE));
});

test('no aparece en el blog', () => {
    assert.equal(pintarBoton({ url: 'https://narbossalon.com/blog/articulo' }), null);
});

test('el hero marca el botón del que sale el mensaje de la página', () => {
    const html = getHeroHTML({ title: 'Balayage', subtitle: 'x', ctaMessage: 'Hola, balayage' });
    assert.match(html, /href="[^"]*Hola%2C%20balayage" data-whatsapp-page/);
});
