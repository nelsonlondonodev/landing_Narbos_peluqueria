import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '../');

const CLARITY_ID = 'xcdx7c8sub';

const CLARITY_SCRIPT = `    <!-- Clarity tracking code for https://narbossalon.com/ -->
    <script>
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
    </script>`;

// Carpetas que deben ignorarse en la búsqueda de archivos HTML
const EXCLUDED_DIRS = ['node_modules', 'dist', '.git', '.gemini', 'scratch', 'images', 'video', 'css', 'js'];

/**
 * Obtiene recursivamente todos los archivos con la extensión indicada.
 * 
 * @param {string} dir Directorio de inicio.
 * @param {string} ext Extensión deseada (ej. '.html').
 * @param {string[]} fileList Lista acumuladora de rutas de archivos.
 * @returns {string[]} Lista de rutas absolutas de archivos encontrados.
 */
const getFiles = (dir, ext, fileList = []) => {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!EXCLUDED_DIRS.includes(file)) {
                getFiles(filePath, ext, fileList);
            }
        } else if (path.extname(file) === ext) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
};

/**
 * Valida si el string de contenido HTML ya contiene la firma del script de Clarity.
 * 
 * @param {string} content Contenido HTML del archivo.
 * @returns {boolean} True si ya contiene Clarity, false de lo contrario.
 */
const hasClarity = (content) => {
    return content.includes(CLARITY_ID);
};

/**
 * Inyecta el script de seguimiento de Clarity inmediatamente después de la etiqueta de apertura <head>.
 * 
 * @param {string} content Contenido HTML original.
 * @returns {string} Contenido HTML modificado.
 * @throws {Error} Si no se encuentra la etiqueta <head>.
 */
const injectClarityIntoContent = (content) => {
    const headMatch = content.match(/<head\b[^>]*>/i);
    if (!headMatch) {
        throw new Error('No se encontró la etiqueta <head> en el documento.');
    }
    
    const headTag = headMatch[0];
    return content.replace(headTag, `${headTag}\n${CLARITY_SCRIPT}`);
};

/**
 * Lee, procesa e inyecta el script de Clarity en un archivo HTML específico.
 * 
 * @param {string} filePath Ruta absoluta del archivo a procesar.
 * @returns {string} Resultado del proceso: 'UPDATED', 'SKIPPED', o 'FAILED'.
 */
const processHtmlFile = (filePath) => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        if (hasClarity(content)) {
            return 'SKIPPED';
        }

        const updatedContent = injectClarityIntoContent(content);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        return 'UPDATED';
    } catch (error) {
        const relativePath = path.relative(ROOT_DIR, filePath);
        console.error(`❌ Error al procesar ${relativePath}: ${error.message}`);
        return 'FAILED';
    }
};

/**
 * Orquestador principal del proceso de inyección de Microsoft Clarity.
 */
const run = () => {
    console.log('🔍 Iniciando escaneo de archivos HTML...');
    const htmlFiles = getFiles(ROOT_DIR, '.html');
    console.log(`📂 Se encontraron ${htmlFiles.length} archivos HTML para analizar.`);

    let updatedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(ROOT_DIR, filePath);
        const result = processHtmlFile(filePath);

        if (result === 'UPDATED') {
            console.log(`✅ Clarity inyectado en: ${relativePath}`);
            updatedCount++;
        } else if (result === 'SKIPPED') {
            skippedCount++;
        } else if (result === 'FAILED') {
            failedCount++;
        }
    });

    console.log('\n📊 Resumen del proceso:');
    console.log(`- Archivos actualizados: ${updatedCount}`);
    console.log(`- Archivos omitidos (ya tenían el script): ${skippedCount}`);
    console.log(`- Archivos con error: ${failedCount}`);
    console.log(`- Total procesados: ${htmlFiles.length}`);
};

run();
