import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// Un `</div>` de más en el hero cerraba #app-wrapper, y con él <main>: desde servicios
// hasta el footer quedaba todo fuera del landmark y del contenedor que evita el scroll
// horizontal, y en el navegador no se notaba a simple vista.
test('home: todas las secciones de contenido viven dentro de <main>', () => {
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    const { document } = new JSDOM(html).window;
    const main = document.querySelector('#app-wrapper > main');
    assert.ok(main, '<main> debe estar dentro de #app-wrapper');
    const fuera = [...document.querySelectorAll('section[id]')]
        .filter(section => !main.contains(section))
        .map(section => section.id);
    assert.deepEqual(fuera, []);
});
