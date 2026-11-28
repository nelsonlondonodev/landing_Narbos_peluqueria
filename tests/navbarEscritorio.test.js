import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { getNavbarHTML } from '../js/components/Navbar.js';
import { getMenuCategories } from '../js/data/navigation.js';
import { HeaderController } from '../js/controllers/HeaderController.js';
import { CLOSE_DELAY_MS, OPEN_DELAY_MS } from '../js/controllers/ServicesMenu.js';

/** Monta el navbar real en una página de prueba, con el header ya inicializado. */
function montar({ ruta = '/', cuerpo = '', veces = 1 } = {}) {
    const { window } = new JSDOM(
        `<!doctype html><body><header class="site-header">${getNavbarHTML('/', ruta === '/')}</header>${cuerpo}`,
        { url: `https://narbossalon.com${ruta}` }
    );
    window.requestAnimationFrame = (callback) => callback();
    globalThis.window = window;
    globalThis.document = window.document;
    for (let i = 0; i < veces; i += 1) new HeaderController().init();

    const raiz = window.document.querySelector('[data-services-nav]');
    return {
        window,
        document: window.document,
        raiz,
        boton: raiz.querySelector('button'),
        enlaces: [...window.document.querySelectorAll('.desktop-menu a')],
        abierto: () => raiz.hasAttribute('data-open'),
        puntero(tipo, pointerType = 'mouse', destino = raiz) {
            const evento = new window.Event(tipo, { bubbles: tipo === 'pointerdown' });
            Object.defineProperty(evento, 'pointerType', { value: pointerType });
            destino.dispatchEvent(evento);
        },
        tecla(key, destino) {
            destino.dispatchEvent(new window.KeyboardEvent('keydown', { key, bubbles: true }));
        }
    };
}

test('el menú de escritorio enlaza todas las categorías y sus servicios', () => {
    const { enlaces } = montar();
    const textos = enlaces.map((enlace) => enlace.textContent.replace('→', '').trim());
    for (const categoria of getMenuCategories()) {
        assert.ok(textos.includes(categoria.title), categoria.title);
        categoria.items.forEach((item) => assert.ok(textos.includes(item.label), item.label));
    }
});

test('ver una sección de la página no marca ningún enlace del menú', () => {
    // Regresión: la sección `#servicios` pintaba «Peluquería» de blanco sobre el panel blanco.
    const observadas = [];
    globalThis.IntersectionObserver = class {
        constructor(callback) { this.callback = callback; }
        observe(target) {
            observadas.push(target.id);
            this.callback([{ isIntersecting: true, target }]);
        }
    };
    const { enlaces } = montar({ cuerpo: '<main><section id="servicios"></section></main>' });
    delete globalThis.IntersectionObserver;

    assert.deepEqual(observadas, []);
    enlaces.forEach((enlace) => assert.doesNotMatch(enlace.className, /nav-link-active|text-white font-bold/));
});

test('el ratón abre tras una pausa y cierra con margen para cruzar al panel', () => {
    mock.timers.enable({ apis: ['setTimeout'] });
    const menu = montar();

    menu.puntero('pointerenter');
    assert.equal(menu.abierto(), false);
    mock.timers.tick(OPEN_DELAY_MS);
    assert.equal(menu.abierto(), true);
    assert.equal(menu.boton.getAttribute('aria-expanded'), 'true');

    menu.puntero('pointerleave');
    mock.timers.tick(CLOSE_DELAY_MS - 1);
    menu.puntero('pointerenter');
    mock.timers.tick(CLOSE_DELAY_MS);
    assert.equal(menu.abierto(), true);

    menu.puntero('pointerleave');
    mock.timers.tick(CLOSE_DELAY_MS);
    assert.equal(menu.abierto(), false);
    assert.equal(menu.boton.getAttribute('aria-expanded'), 'false');
    mock.timers.reset();
});

test('un clic tras abrir con el ratón no cierra; el siguiente sí', () => {
    mock.timers.enable({ apis: ['setTimeout'] });
    const menu = montar();
    menu.puntero('pointerenter');
    mock.timers.tick(OPEN_DELAY_MS);

    menu.boton.click();
    assert.equal(menu.abierto(), true);
    menu.boton.click();
    assert.equal(menu.abierto(), false);
    mock.timers.reset();
});

test('en táctil el primer toque abre y el segundo cierra', () => {
    const menu = montar();
    menu.puntero('pointerenter', 'touch');
    menu.boton.click();
    assert.equal(menu.abierto(), true);
    menu.boton.click();
    assert.equal(menu.abierto(), false);
});

test('iniciar dos veces no duplica los eventos', () => {
    const menu = montar({ veces: 2 });
    menu.boton.click();
    assert.equal(menu.abierto(), true);
});

test('con teclado: flecha abajo entra al panel y Esc devuelve el foco', () => {
    const menu = montar();
    menu.boton.focus();
    menu.tecla('ArrowDown', menu.boton);
    assert.equal(menu.abierto(), true);
    assert.equal(menu.document.activeElement, menu.raiz.querySelector('a'));

    menu.tecla('Escape', menu.document.activeElement);
    assert.equal(menu.abierto(), false);
    assert.equal(menu.document.activeElement, menu.boton);
});

test('se cierra al sacar el foco o al pulsar fuera', () => {
    const menu = montar({ cuerpo: '<button id="fuera">Fuera</button>' });
    const fuera = menu.document.getElementById('fuera');

    menu.boton.focus();
    menu.boton.click();
    fuera.focus();
    assert.equal(menu.abierto(), false);

    menu.boton.click();
    menu.puntero('pointerdown', 'mouse', fuera);
    assert.equal(menu.abierto(), false);
});

test('marca la página actual y el botón que la contiene', () => {
    const menu = montar({ ruta: '/servicios/peluqueria/balayage-mechas' });
    const marcados = menu.enlaces.filter((enlace) => enlace.hasAttribute('aria-current'));
    assert.deepEqual(marcados.map((enlace) => enlace.textContent.trim()), ['Balayage y Mechas']);
    assert.equal(menu.boton.hasAttribute('data-current'), true);
});

test('un artículo deja marcado «Blog» como sección', () => {
    const menu = montar({ ruta: '/blog/articles/alisados-cabello-chia' });
    const marcados = menu.enlaces.filter((enlace) => enlace.hasAttribute('aria-current'));
    assert.deepEqual(marcados.map((enlace) => [enlace.textContent.trim(), enlace.getAttribute('aria-current')]), [['Blog', 'true']]);
    assert.equal(menu.boton.hasAttribute('data-current'), false);
});
