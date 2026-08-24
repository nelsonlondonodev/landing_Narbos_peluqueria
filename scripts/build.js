import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import esbuild from 'esbuild';
import htmlMinifier from 'html-minifier';
import { loadEnv } from './load-env.js';
const { minify } = htmlMinifier;

loadEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = util.promisify(exec);

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const SRC_DIR = path.join(__dirname, '../');

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m"
};

const log = (msg, color = colors.blue) => console.log(`${color}[BUILD] ${msg}${colors.reset}`);

/**
 * Valida la existencia de directorios críticos antes de empezar.
 */
const validateEnvironment = () => {
    const required = ['css', 'js', 'images', 'scripts'];
    required.forEach(dir => {
        if (!fs.existsSync(path.join(SRC_DIR, dir))) {
            throw new Error(`Directorio crítico ausente: ${dir}`);
        }
    });
};

const getFileHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(fileBuffer).digest('hex').substring(0, 8);
};

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const getFiles = (dir, ext, fileList = []) => {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['node_modules', 'dist', '.git', '.gemini'].includes(file)) {
                getFiles(filePath, ext, fileList);
            }
        } else if (path.extname(file) === ext) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const clean = async () => {
    log('Cleaning dist...', colors.yellow);
    if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true, force: true });
    ensureDir(DIST_DIR);
};

const buildCSS = async () => {
    log('Building CSS (Tailwind v4)...');
    ensureDir(path.join(DIST_DIR, 'css'));
    await execPromise('node ./node_modules/@tailwindcss/cli/dist/index.mjs -i ./css/input.css -o ./dist/css/styles.css --minify');
};

const buildJS = async () => {
    log('Bundling JS (esbuild)...');
    const entryPoints = [
        'js/main.js', 'js/service-page.js', 'js/hair-page.js', 'js/nails-page.js', 'js/makeup-page.js'
    ].map(e => path.join(SRC_DIR, e));

    await esbuild.build({
        entryPoints,
        bundle: true,
        splitting: true,
        minify: true,
        format: 'esm',
        outdir: path.join(DIST_DIR, 'js'),
        target: 'es2020'
    });
};

const buildHTML = async () => {
    log('Minifying HTML...');
    const htmlFiles = getFiles(SRC_DIR, '.html').filter(f => !f.includes('template.html'));
    const options = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true
    };
    
    for (const file of htmlFiles) {
        const destPath = path.join(DIST_DIR, path.relative(SRC_DIR, file));
        ensureDir(path.dirname(destPath));
        try {
            const content = fs.readFileSync(file, 'utf8');
            const minified = minify(content, options);
            fs.writeFileSync(destPath, minified, 'utf8');
        } catch (e) {
            console.error(`Error al minificar ${file}, copiando sin minificar:`, e);
            fs.copyFileSync(file, destPath);
        }
    }
};

const copyAssets = async () => {
    log('Copying assets...');
    const assets = [
        'images', 'video', 'fonts', 'lang', 'blog/articles/images', 'legal', 
        'robots.txt', 'sitemap.xml', 'llms.txt', '.htaccess'
    ];
    assets.forEach(asset => {
        const src = path.join(SRC_DIR, asset);
        if (fs.existsSync(src)) fs.cpSync(src, path.join(DIST_DIR, asset), { recursive: true });
    });

    // Copiar de forma dinámica archivos de verificación SEO de la raíz
    try {
        const files = fs.readdirSync(SRC_DIR);
        files.forEach(file => {
            const isIndexNow = /^[a-f0-9]{32}\.txt$/.test(file);
            const isGoogle = /^google[a-f0-9]+\.html$/.test(file);
            const isBing = /^BingSiteAuth\.xml$/.test(file);

            if (isIndexNow || isGoogle || isBing) {
                fs.copyFileSync(path.join(SRC_DIR, file), path.join(DIST_DIR, file));
                log(`Archivo de verificación SEO copiado: ${file}`, colors.green);
            }
        });
    } catch (err) {
        log(`Error al copiar archivos de verificación SEO: ${err.message}`, colors.red);
    }
};

// Importaciones estáticas de un módulo ESM ya empaquetado: `from"./x.js"` e
// `import"./x.js"`. Deja fuera los `import("./x.js")` dinámicos, que son lazy a
// propósito y no deben precargarse.
const STATIC_IMPORT_RES = [/\bfrom\s*["']\.\/([^"']+)["']/g, /\bimport\s*["']\.\/([^"']+)["']/g];

// Sin flag /g: se reutiliza para test() y replace() sin arrastrar lastIndex.
const CLOSING_HEAD_RE = /<\/head>/i;

// El grafo de un entry es el mismo para todas las páginas que lo cargan; sin cachear,
// los ~5 entry points se recorrerían una vez por cada una de las 45 páginas.
const staticGraphCache = new Map();

/**
 * Recorre el grafo de imports estáticos de un entry point y devuelve todos los
 * chunks que hacen falta antes de que la app arranque, en orden de descubrimiento.
 *
 * @param {string} entryName Nombre del archivo entry dentro de dist/js.
 * @returns {string[]} Nombres de chunk, sin incluir el propio entry.
 */
const collectStaticGraph = (entryName) => {
    if (staticGraphCache.has(entryName)) return staticGraphCache.get(entryName);

    const jsDir = path.join(DIST_DIR, 'js');
    const seen = new Set([entryName]);
    const ordered = [];
    const queue = [entryName];

    while (queue.length) {
        const current = queue.shift();
        const filePath = path.join(jsDir, current);
        if (!fs.existsSync(filePath)) continue;

        const code = fs.readFileSync(filePath, 'utf8');
        STATIC_IMPORT_RES.forEach(re => {
            re.lastIndex = 0;
            let match;
            while ((match = re.exec(code)) !== null) {
                const dep = match[1].split('?')[0];
                if (seen.has(dep)) continue;
                seen.add(dep);
                ordered.push(dep);
                queue.push(dep);
            }
        });
    }

    staticGraphCache.set(entryName, ordered);
    return ordered;
};

/**
 * Inyecta <link rel="modulepreload"> para el grafo estático de cada página.
 *
 * Sin esto el navegador descubre los chunks en cascada: primero baja el entry, lo
 * parsea, y solo entonces pide sus imports. Son round-trips en serie que en 4G lenta
 * cuestan cientos de ms cada uno antes de que se ejecute una sola línea de la app.
 *
 * Se ejecuta antes de versionAssets, así que usa los nombres sin hashear: el paso de
 * versionado reescribe estos href igual que el resto de referencias.
 */
const injectModulePreloads = async () => {
    log('Injecting modulepreload hints...', colors.magenta);
    staticGraphCache.clear();
    const htmlFiles = getFiles(DIST_DIR, '.html');
    let patched = 0;

    for (const file of htmlFiles) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('rel="modulepreload"')) continue;
        if (!CLOSING_HEAD_RE.test(content)) continue;

        // Una página puede cargar varios entries (p. ej. main.js + hair-page.js);
        // se precarga la unión de sus grafos, sin repetir chunks compartidos.
        const scriptTags = content.match(/<script\b[^>]*\btype=["']module["'][^>]*>/gi) || [];
        const hrefs = new Set();

        for (const tag of scriptTags) {
            const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i);
            if (!srcMatch) continue;

            const src = srcMatch[1];
            const prefix = src.slice(0, src.lastIndexOf('/') + 1);
            const entryName = path.basename(src.split('?')[0]);

            collectStaticGraph(entryName).forEach(chunk => hrefs.add(`${prefix}${chunk}`));
        }

        if (!hrefs.size) continue;

        const links = [...hrefs]
            .map(href => `<link rel="modulepreload" href="${href}">`)
            .join('');

        // Al final del <head>: el preload scanner lo ve igual en el primer parseo,
        // y así la imagen LCP —precargada arriba— conserva el primer turno de red.
        fs.writeFileSync(file, content.replace(CLOSING_HEAD_RE, `${links}</head>`), 'utf8');
        patched++;
    }

    log(`modulepreload inyectado en ${patched} páginas.`, colors.green);
};

const versionAssets = async () => {
    log('Versioning assets (Cache Busting)...', colors.magenta);
    const jsDir = path.join(DIST_DIR, 'js');
    const jsFiles = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).filter(f => f.endsWith('.js')) : [];
    const assets = [{ dir: 'css', name: 'styles.css' }, ...jsFiles.map(name => ({ dir: 'js', name }))];
    const mappings = {};

    assets.forEach(asset => {
        const filePath = path.join(DIST_DIR, asset.dir, asset.name);
        if (fs.existsSync(filePath)) {
            const hash = getFileHash(filePath);
            const ext = path.extname(asset.name);
            const newName = `${path.basename(asset.name, ext)}.${hash}${ext}`;
            fs.renameSync(filePath, path.join(DIST_DIR, asset.dir, newName));
            mappings[`${asset.dir}/${asset.name}`] = `${asset.dir}/${newName}`;
        }
    });

    const timestamp = Date.now();
    const targetFiles = [...getFiles(DIST_DIR, '.html'), ...getFiles(path.join(DIST_DIR, 'js'), '.js')];

    targetFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        Object.entries(mappings).forEach(([oldRel, newRel]) => {
            const oldName = path.basename(oldRel).replace('.', '\\.');
            const newName = path.basename(newRel);
            const regex = new RegExp(`(['"])([^'"]*\\/)?${oldName}(\\?[^'"]*)?(['"])`, 'g');
            
            if (regex.test(content)) {
                content = content.replace(regex, `$1$2${newName}?v=${timestamp}$4`);
                changed = true;
            }
        });

        if (changed) fs.writeFileSync(file, content, 'utf8');
    });
};

const runBuild = async () => {
    const start = Date.now();
    try {
        validateEnvironment();
        await clean();
        await Promise.all([buildCSS(), buildJS(), buildHTML(), copyAssets()]);
        
        log('Running SSG...');
        await execPromise('node scripts/ssg.js');

        log('Injecting Secrets...', colors.magenta);
        // Clave WEB: viaja en el bundle público, por eso va restringida por referrer.
        // Sin clave se inyecta cadena vacía y el cliente cae al horario del build.
        // Nunca incrustar una clave literal aquí.
        const apiKey = process.env.GOOGLE_MAPS_API_KEY_WEB || '';
        if (!apiKey) {
            log('⚠️  GOOGLE_MAPS_API_KEY_WEB ausente: el badge usará solo el horario estático.', colors.yellow);
        }
        const distJsFiles = getFiles(path.join(DIST_DIR, 'js'), '.js');
        distJsFiles.forEach(file => {
            let content = fs.readFileSync(file, 'utf8');
            if (content.includes('___GOOGLE_MAPS_API_KEY___')) {
                content = content.replace(/___GOOGLE_MAPS_API_KEY___/g, apiKey);
                fs.writeFileSync(file, content, 'utf8');
                log(`Clave inyectada en: ${path.basename(file)}`, colors.green);
            }
        });

        await injectModulePreloads();
        await versionAssets();
        log(`Build successful in ${((Date.now() - start) / 1000).toFixed(2)}s! 🚀`, colors.green);
    } catch (e) {
        console.error(colors.red + 'Build Failed!' + colors.reset, e);
        process.exit(1);
    }
};

runBuild();

