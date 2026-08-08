/**
 * En CI el fallback estático no es aceptable: el deploy publicaría datos rancios
 * (horarios y reseñas congelados) marcando el build como exitoso, que es
 * justo como el Place ID caducado pasó meses inadvertido.
 *
 * En local sí se tolera, para poder trabajar sin la clave BUILD en el .env.
 *
 * @param {{source: string}} data Objeto sincronizado, con su campo `source`.
 * @param {string} label Nombre legible del sync, para el mensaje de error.
 */
export function assertSyncedInCI(data, label) {
    if (!process.env.CI) return;
    if (!data.source.includes('Static Fallback')) return;

    console.error(`\n❌ ${label}: el sync cayó al fallback estático durante el build de CI.`);
    console.error('   El deploy se aborta para no publicar datos desactualizados.');
    console.error('   Revisa el secret GOOGLE_MAPS_API_KEY_BUILD:');
    console.error('   debe ser una clave sin restricción de referrer y con Places API (New) habilitada.');
    process.exit(1);
}
