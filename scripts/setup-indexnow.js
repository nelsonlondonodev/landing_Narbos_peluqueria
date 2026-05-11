import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

// 1. Generar clave si no existe o usar una nueva
const apiKey = crypto.randomBytes(16).toString('hex');
const fileName = `${apiKey}.txt`;

// 2. Crear archivo de verificación
fs.writeFileSync(path.join(PROJECT_ROOT, fileName), apiKey, 'utf8');

console.log('--------------------------------------------------');
console.log('✅ IndexNow: Archivo de verificación creado');
console.log(`Clave: ${apiKey}`);
console.log(`Archivo: ${fileName}`);
console.log('--------------------------------------------------');

// 3. Crear el script de envío (lo haré en un paso separado para que sea reutilizable)
