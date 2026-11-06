import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBentoGridHTML } from '../js/components/BentoGrid.js';

const items = [
    { src: 'a.webp', alt: 'Foto', subImages: [{ src: 'b.webp', alt: 'Otra' }] },
    { type: 'youtube', youtubeId: 'abc123', src: 'c.webp', alt: 'Vídeo' }
];

test('los enlaces de la galería son rastreables', () => {
    const html = getBentoGridHTML(items);
    assert.doesNotMatch(html, /href="javascript:/);
    assert.match(html, /href="a\.webp" data-href="a\.webp"/);
    assert.match(html, /href="b\.webp" data-href="b\.webp"/);
    assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=abc123" data-video-id="abc123"/);
});
