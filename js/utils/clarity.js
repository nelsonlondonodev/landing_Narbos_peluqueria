/**
 * Manda a Clarity un evento propio, con etiquetas opcionales para filtrar después.
 *
 * Si Clarity no ha cargado (sin consentimiento, con bloqueador) no hace nada: la
 * medición nunca debe romper lo que mide.
 *
 * @param {string} name - Nombre del evento, en snake_case, tal como se filtrará en Clarity.
 * @param {Record<string, string>} [tags] - Etiquetas de sesión que acompañan al evento.
 */
export function trackClarityEvent(name, tags = {}) {
    const { clarity } = /** @type {Window & { clarity?: (...args: string[]) => void }} */ (window);
    if (!clarity) return;
    Object.entries(tags).forEach(([key, value]) => clarity('set', key, value));
    clarity('event', name);
}
