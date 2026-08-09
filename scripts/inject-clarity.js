import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '../');

const CLARITY_ID = 'xcdx7c8sub';

// Clarity se carga en idle (o al primer gesto del usuario), nunca durante la carga
// inicial: el tag abre tres orígenes —clarity.ms, scripts.clarity.ms y z.clarity.ms—
// y era el recurso más lento de la ruta crítica. Misma estrategia que AnalyticsService.
// El stub c[a] encola las llamadas, así que nada se pierde mientras el tag no ha llegado.
const CLARITY_SCRIPT = `    <!-- Clarity tracking code for https://narbossalon.com/ -->
    <script>
        (function(c,l,a,r,i){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            var done=false;
            var load=function(){
                if(done)return;
                done=true;
                var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                l.head.appendChild(t);
            };
            var idle=function(){
                if(c.requestIdleCallback){c.requestIdleCallback(load,{timeout:4000});}else{c.setTimeout(load,4000);}
            };
            // El idle se espera al evento load: el navegador concede huecos ociosos
            // entre frames aunque queden recursos críticos en vuelo, y ahí es justo
            // donde Clarity le robaría ancho de banda a la imagen LCP.
            if(l.readyState==="complete"){idle();}else{c.addEventListener("load",idle,{once:true});}
            var events=['pointerdown','keydown','scroll','touchstart'];
            for(var n=0;n<events.length;n++){c.addEventListener(events[n],load,{once:true,passive:true});}
        })(window, document, "clarity", "script", "${CLARITY_ID}");
    </script>`;

// Localiza el bloque completo de Clarity (comentario + script) ya presente en el HTML.
const CLARITY_BLOCK_RE = /[ \t]*<!-- Clarity tracking code[\s\S]*?<\/script>/;

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
 * Sustituye un bloque de Clarity ya presente por la versión vigente del snippet.
 * Permite que el script sea idempotente y sirva también para migrar snippets antiguos.
 *
 * @param {string} content Contenido HTML original.
 * @returns {string|null} Contenido actualizado, o null si el bloque ya está al día.
 */
const migrateClarityInContent = (content) => {
    const match = content.match(CLARITY_BLOCK_RE);
    if (!match || match[0] === CLARITY_SCRIPT) return null;
    return content.replace(CLARITY_BLOCK_RE, CLARITY_SCRIPT);
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
            const migrated = migrateClarityInContent(content);
            if (!migrated) return 'SKIPPED';
            fs.writeFileSync(filePath, migrated, 'utf8');
            return 'MIGRATED';
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
    let migratedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(ROOT_DIR, filePath);
        const result = processHtmlFile(filePath);

        if (result === 'UPDATED') {
            console.log(`✅ Clarity inyectado en: ${relativePath}`);
            updatedCount++;
        } else if (result === 'MIGRATED') {
            console.log(`♻️  Snippet actualizado en: ${relativePath}`);
            migratedCount++;
        } else if (result === 'SKIPPED') {
            skippedCount++;
        } else if (result === 'FAILED') {
            failedCount++;
        }
    });

    console.log('\n📊 Resumen del proceso:');
    console.log(`- Archivos actualizados: ${updatedCount}`);
    console.log(`- Snippets migrados a la versión vigente: ${migratedCount}`);
    console.log(`- Archivos omitidos (ya estaban al día): ${skippedCount}`);
    console.log(`- Archivos con error: ${failedCount}`);
    console.log(`- Total procesados: ${htmlFiles.length}`);
};

run();
