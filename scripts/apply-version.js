import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración
const NEW_VERSION = "2.5.0";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const FILES_TO_UPDATE = [
    'index.html',
    'nosotros.html',
    'servicios/peluqueria/tratamientos-capilares.html',
    'servicios/peluqueria/color-tinturas-cabello.html',
    'servicios/estetica/index.html',
    'servicios/estetica/cejas-y-pestanas.html',
    'servicios/estetica/limpieza-facial.html',
    'servicios/estetica/depilacion-corporal.html',
    'blog/index.html'
];

// Opcionalmente buscar todos los .html en blog/articles/
const blogArticlesDir = path.join(ROOT_DIR, 'blog', 'articles');
if (fs.existsSync(blogArticlesDir)) {
    const articles = fs.readdirSync(blogArticlesDir)
        .filter(file => file.endsWith('.html'))
        .map(file => `blog/articles/${file}`);
    FILES_TO_UPDATE.push(...articles);
}

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
