import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '../');

const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

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
    try {
        // 1. Leer versión de package.json
        const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
        const newVersion = packageJson.version;
        
        if (!newVersion) {
            throw new Error('No se encontró el campo "version" en package.json');
        }

        console.log(`🚀 Iniciando actualización automática de Cache Buster a v${newVersion}...`);
        const htmlFiles = getHtmlFiles(PROJECT_ROOT);
        let updatedCount = 0;
        
        // Expresión regular para buscar cualquier ?v=d.d.d en los links (CSS, JS)
        const versionRegex = /\?v=\d+\.\d+\.\d+/g;
        const newQuery = `?v=${newVersion}`;

        htmlFiles.forEach(filePath => {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Verificamos si hay coincidencias diferentes a la versión actual
            let hasMatchesToUpdate = false;
            const matches = content.match(versionRegex);
            if (matches) {
                for (const match of matches) {
                    if (match !== newQuery) {
                        hasMatchesToUpdate = true;
                        break;
                    }
                }
            }

            if (hasMatchesToUpdate) {
                // Reemplazamos todos los ?v=X.Y.Z por la nueva versión de package.json
                const updatedContent = content.replaceAll(versionRegex, newQuery);
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
