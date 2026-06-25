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
 * Obtiene recursivamente todos los archivos con la extensión indicada
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

const run = () => {
    console.log('🔍 Iniciando escaneo de archivos HTML...');
    const htmlFiles = getFiles(ROOT_DIR, '.html');
    console.log(`📂 Se encontraron ${htmlFiles.length} archivos HTML para analizar.`);

    let updatedCount = 0;
    let skippedCount = 0;

    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(ROOT_DIR, filePath);
        let content = fs.readFileSync(filePath, 'utf8');

        // Verificar si ya tiene el script de Clarity
        if (content.includes(CLARITY_ID)) {
            // console.log(`⏭️  Ignorado (ya tiene Clarity): ${relativePath}`);
            skippedCount++;
            return;
        }

        // Buscar la etiqueta <head>
        const headMatch = content.match(/<head\b[^>]*>/i);
        if (headMatch) {
            const headTag = headMatch[0];
            // Insertamos el script justo después de la etiqueta <head>
            const replacement = `${headTag}\n${CLARITY_SCRIPT}`;
            content = content.replace(headMatch[0], replacement);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Clarity inyectado en: ${relativePath}`);
            updatedCount++;
        } else {
            console.warn(`⚠️  Advertencia: No se encontró la etiqueta <head> en: ${relativePath}`);
        }
    });

    console.log('\n📊 Resumen del proceso:');
    console.log(`- Archivos actualizados: ${updatedCount}`);
    console.log(`- Archivos omitidos (ya tenían el script): ${skippedCount}`);
    console.log(`- Total procesados: ${htmlFiles.length}`);
};

run();
