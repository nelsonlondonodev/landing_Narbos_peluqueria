import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const packageJsonPath = path.join(ROOT_DIR, 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const NEW_VERSION = pkg.version;


/**
 * Función recursiva para obtener todos los archivos .html del proyecto,
 * excluyendo node_modules, dist y carpetas ocultas.
 */
function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.') && file !== 'video' && file !== 'images') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else {
            if (file.endsWith('.html')) {
                fileList.push(path.relative(ROOT_DIR, filePath));
            }
        }
    });
    return fileList;
}

const FILES_TO_UPDATE = getAllHtmlFiles(ROOT_DIR);

console.log(`🚀 Iniciando Cache Buster v${NEW_VERSION}...`);

FILES_TO_UPDATE.forEach(relativePath => {
    const fullPath = path.join(ROOT_DIR, relativePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Archivo no encontrado: ${relativePath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Regex para encontrar ?v=X.X.X y reemplazarlo por la nueva versión
    // Busca tanto ?v=2.2.0, ?v=2.3.0, etc.
    const updatedContent = content.replace(/\?v=[0-9.]+/g, `?v=${NEW_VERSION}`);

    if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent, 'utf8');
        console.log(`✅ Actualizado: ${relativePath}`);
    } else {
        console.log(`ℹ️ Sin cambios (ya al día o sin tags): ${relativePath}`);
    }
});

console.log('✨ Proceso completado con éxito.');
