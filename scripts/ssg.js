import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getNavbarHTML } from '../js/components/Navbar.js';
import { getFooterHTML } from '../js/components/Footer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

// Configuración de colores para consola
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m"
};

const log = (msg, color = colors.blue) => console.log(`${color}[SSG] ${msg}${colors.reset}`);

/**
 * Recursive function to get all HTML files in a directory
 */
const getHtmlFiles = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else {
            if (path.extname(file) === '.html') {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
};

/**
 * Main SSG Injection Function
 */
const injectComponents = async () => {
    log('Iniciando inyección estática de componentes (SSG)...', colors.yellow);

    const htmlFiles = getHtmlFiles(DIST_DIR);

    if (htmlFiles.length === 0) {
        log('No se encontraron archivos HTML en dist/. Asegúrate de que el build haya copiado los archivos primero.', colors.red);
        process.exit(1);
    }

    let processedCount = 0;

    for (const filePath of htmlFiles) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Determinar la ruta relativa (basePath) para los assets
        // Ejemplo: dist/index.html -> './'
        // Ejemplo: dist/servicios/peluqueria.html -> '../'
        // Ejemplo: dist/blog/articles/post.html -> '../../'
        const relativePathFromDist = path.relative(DIST_DIR, path.dirname(filePath));
        const depth = relativePathFromDist === '' ? 0 : relativePathFromDist.split(path.sep).length;
        const basePath = depth === 0 ? './' : '../'.repeat(depth);

        // Determinar si es la home
        const isHome = path.basename(filePath) === 'index.html' && depth === 0;

        // Inyectar Navbar
        if (content.includes('<div id="navbar-root"></div>')) {
            const navbarHTML = getNavbarHTML(basePath, isHome);
            // Mantenemos el ID para que los scripts del cliente (si los hay) sigan funcionando, 
            // pero rellenamos el contenido.
            content = content.replace('<div id="navbar-root"></div>', `<div id="navbar-root">${navbarHTML}</div>`);
        }

        // Inyectar Footer
        if (content.includes('<div id="footer-root"></div>')) {
            const footerHTML = getFooterHTML(basePath);
            content = content.replace('<div id="footer-root"></div>', `<div id="footer-root">${footerHTML}</div>`);
        }

        fs.writeFileSync(filePath, content);
        processedCount++;
    }

    log(`✅ Componentes inyectados exitosamente en ${processedCount} archivos HTML.`, colors.green);
};

// Ejecutar
injectComponents().catch(err => {
    console.error(colors.red + 'Fatal Error in SSG:' + colors.reset, err);
    process.exit(1);
});
