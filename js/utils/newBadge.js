const DEFAULT_BADGE_DURATION_DAYS = 30;
const MS_PER_DAY = 86400000;

/**
 * @typedef {Object} BadgeFields
 * @property {boolean} [isNew] - Fuerza la etiqueta sin caducidad.
 * @property {string} [addedAt] - Fecha de publicación (ISO). Con hora y offset si se
 *   quiere que caduque a una hora concreta: una fecha sola se lee como medianoche UTC.
 * @property {number} [badgeDurationDays=30] - Días que dura la etiqueta desde `addedAt`.
 */

/**
 * Instante en que caduca la etiqueta, o null si no caduca o no hay fecha válida.
 * @param {BadgeFields} item
 * @returns {Date|null}
 */
function getBadgeExpiry(item) {
    if (!item?.addedAt) return null;

    const addedDate = new Date(item.addedAt);
    if (isNaN(addedDate.getTime())) return null;

    const maxDays = item.badgeDurationDays || DEFAULT_BADGE_DURATION_DAYS;
    return new Date(addedDate.getTime() + maxDays * MS_PER_DAY);
}

/**
 * Determina si la etiqueta «Nuevo» debe estar activa.
 * @param {BadgeFields} item
 * @param {Date} [now]
 * @returns {boolean}
 */
export function isBadgeActive(item, now = new Date()) {
    if (!item) return false;
    if (item.isNew) return true;

    const expiry = getBadgeExpiry(item);
    return expiry !== null && now <= expiry;
}

/**
 * HTML de la etiqueta «Nuevo», o cadena vacía si no toca.
 *
 * Lleva la caducidad en `data-new-until` porque la sección de vídeo la escribe el SSG:
 * comprobada solo en el build, seguiría visible hasta el siguiente despliegue.
 * `removeExpiredBadges` la quita en el navegador cuando llega la fecha.
 * @param {BadgeFields} item
 * @returns {string}
 */
export function getNewBadgeHTML(item) {
    if (!isBadgeActive(item)) return '';

    const expiry = item.isNew ? null : getBadgeExpiry(item);
    const untilAttr = expiry ? ` data-new-until="${expiry.toISOString()}"` : '';

    return `<div class="badge-latest pointer-events-none"${untilAttr}>Nuevo</div>`;
}

/**
 * Quita las etiquetas «Nuevo» ya caducadas que dejó escritas el SSG.
 * @param {ParentNode} [root=document]
 * @param {Date} [now]
 */
export function removeExpiredBadges(root = document, now = new Date()) {
    root.querySelectorAll('[data-new-until]').forEach(badge => {
        const until = new Date(badge.getAttribute('data-new-until'));
        if (!isNaN(until.getTime()) && now > until) badge.remove();
    });
}
