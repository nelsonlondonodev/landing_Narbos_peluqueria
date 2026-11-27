import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { YouTubeGallery } from '../js/components/YouTubeGallery.js';
import { GALLERY_INITIAL, GALLERY_STEP, galleryVideos, initialGalleryVideos } from '../js/data/videoData.js';

/** Monta la galería en una página de prueba. */
function pintarGaleria(videos) {
    const { window } = new JSDOM('<!doctype html><body><div id="raiz"></div>');
    globalThis.window = window;
    globalThis.document = window.document;
    new YouTubeGallery('raiz', videos).render();

    const raiz = window.document.getElementById('raiz');
    return {
        ids: () => [...raiz.querySelectorAll('.video-card')].map(c => c.dataset.videoId),
        masBoton: () => raiz.querySelector('[data-gallery-more]'),
        raiz
    };
}

/** Catálogo inventado, del más antiguo (`v1`) al más reciente. */
const videosDePrueba = total => Array.from({ length: total }, (_, i) => ({
    id: `v${i + 1}`, title: `Video ${i + 1}`, thumbnailUrl: `${i + 1}.jpg`
}));

test('al cargar pinta solo los más recientes, el último primero', () => {
    const galeria = pintarGaleria(videosDePrueba(GALLERY_INITIAL + 3));
    assert.equal(galeria.ids().length, GALLERY_INITIAL);
    assert.equal(galeria.ids()[0], `v${GALLERY_INITIAL + 3}`);
    assert.equal(galeria.raiz.querySelectorAll('.badge-latest').length, 1);
});

test('«Ver más» añade por tandas sin repetir y desaparece al agotarse', () => {
    const total = GALLERY_INITIAL + GALLERY_STEP + 1;
    const galeria = pintarGaleria(videosDePrueba(total));

    galeria.masBoton().click();
    assert.equal(galeria.ids().length, GALLERY_INITIAL + GALLERY_STEP);

    galeria.masBoton().click();
    assert.equal(new Set(galeria.ids()).size, total);
    assert.equal(galeria.ids().at(-1), 'v1');
    assert.equal(galeria.masBoton(), null);
    assert.equal(galeria.raiz.querySelectorAll('.badge-latest').length, 1);
});

test('sin vídeos ocultos no hay botón', () => {
    assert.equal(pintarGaleria(videosDePrueba(GALLERY_INITIAL)).masBoton(), null);
});

test('el ItemList describe las mismas tarjetas que se ven al cargar', () => {
    const galeria = pintarGaleria(galleryVideos);
    assert.deepEqual(galeria.ids(), initialGalleryVideos.map(v => v.id));
});
