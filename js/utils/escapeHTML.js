/**
 * Escapa texto para meterlo en una plantilla HTML, como contenido o como valor de un
 * atributo entre comillas simples o dobles.
 *
 * Hace falta siempre que el texto no venga de nuestros propios archivos: una reseña de
 * Google o lo que alguien teclea en el buscador pueden traer `<` y colar marcado.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
