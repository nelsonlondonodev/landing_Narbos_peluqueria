import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Carga las variables de entorno desde el .env de la raíz, si existe.
 * En CI las variables ya vienen inyectadas por el workflow y no se sobrescriben.
 */
export function loadEnv() {
    const envPath = path.join(__dirname, '../.env');
    if (!fs.existsSync(envPath)) return;

    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const separator = trimmed.indexOf('=');
        if (separator < 1) return;

        const key = trimmed.slice(0, separator).trim();
        let val = trimmed.slice(separator + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);

        // El entorno real (CI) tiene prioridad sobre el .env local.
        if (process.env[key] === undefined) process.env[key] = val;
    });
}
