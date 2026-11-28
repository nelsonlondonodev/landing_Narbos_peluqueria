/**
 * Ruta de un fichero o de una URL en su forma comparable: sin barra inicial, sin `.html`
 * y sin `index` (los directorios conservan su barra final).
 *
 * @param {string} ruta - `servicios/peluqueria/index.html`, `/blog/articles/x`…
 * @returns {string}
 */
export const limpiarRuta = (ruta) =>
    ruta.replace(/^\/+/, '').replace(/\.html$/, '').replace(/(^|\/)index$/, '$1');
