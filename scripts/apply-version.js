import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');
const CONFIG_JS_PATH = path.join(PROJECT_ROOT, 'js/config.js');

/**
 * Sincroniza la versión de package.json con js/config.js
 */
function applyVersion() {
    try {
        console.log('🔄 Sincronizando versión del proyecto...');

        // 1. Leer versión de package.json
        const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
        const newVersion = packageJson.version;

        if (!newVersion) {
            throw new Error('No se encontró el campo "version" en package.json');
        }

        // 2. Leer js/config.js
        let configContent = fs.readFileSync(CONFIG_JS_PATH, 'utf8');

        // 3. Reemplazar la versión usando Regex
        // Busca: version: "x.x.x"
        const versionRegex = /version:\s*["'][^"']+["']/;
        const updatedConfigContent = configContent.replace(versionRegex, `version: "${newVersion}"`);

        if (configContent === updatedConfigContent) {
            console.log('⚠️ No se encontró el campo version en js/config.js o ya está actualizado.');
        } else {
            // 4. Guardar cambios
            fs.writeFileSync(CONFIG_JS_PATH, updatedConfigContent, 'utf8');
            console.log(`✅ Versión actualizada a v${newVersion} en js/config.js`);
        }

    } catch (error) {
        console.error('❌ Error al sincronizar la versión:', error.message);
        process.exit(1);
    }
}

applyVersion();
