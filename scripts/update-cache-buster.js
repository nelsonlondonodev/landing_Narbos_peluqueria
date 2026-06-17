import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const OLD_VERSION = '2.8.8';
const NEW_VERSION = '2.8.15';

/**
 * Obtiene recursivamente todos los archivos con extensión .html
 */
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Ignorar directorios de control y compilación
            if (!['node_modules', 'dist', '.git', '.gemini', '_templates'].includes(file)) {
                getHtmlFiles(filePath, fileList);
            }
        } else if (path.extname(file) === '.html') {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function updateCacheBusters() {
    console.log(`🚀 Iniciando actualización de Cache Buster: ?v=${OLD_VERSION} ➡️ ?v=${NEW_VERSION}`);
    try {
        const htmlFiles = getHtmlFiles(PROJECT_ROOT);
        let updatedCount = 0;
        
        const oldQuery = `?v=${OLD_VERSION}`;
        const newQuery = `?v=${NEW_VERSION}`;

        htmlFiles.forEach(filePath => {
            let content = fs.readFileSync(filePath, 'utf8');
            if (content.includes(oldQuery)) {
                // Reemplazo preciso
                const updatedContent = content.replaceAll(oldQuery, newQuery);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                
                const relativePath = path.relative(PROJECT_ROOT, filePath);
                console.log(`✅ Actualizado: ${relativePath}`);
                updatedCount++;
            }
        });

        console.log(`\n🎉 Proceso finalizado con éxito.`);
        console.log(`📊 Total de archivos HTML escaneados: ${htmlFiles.length}`);
        console.log(`✏️ Total de archivos HTML modificados: ${updatedCount}`);
    } catch (error) {
        console.error('❌ Error durante la actualización:', error.message);
        process.exit(1);
    }
}

updateCacheBusters();
