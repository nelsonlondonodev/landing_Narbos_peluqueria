import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

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
    await execPromise('npx @tailwindcss/cli -i ./css/input.css -o ./dist/css/styles.css --minify');
};

const buildJS = async () => {
    log('Bundling JS (esbuild)...');
    const entryPoints = [
        'js/main.js', 'js/service-page.js', 'js/hair-page.js', 'js/nails-page.js', 'js/makeup-page.js'
    ].map(e => path.join(SRC_DIR, e));

    await execPromise(`npx esbuild ${entryPoints.map(e => `"${e}"`).join(' ')} --bundle --splitting --minify --format=esm --outdir="${path.join(DIST_DIR, 'js')}" --target=es2020`);
};

const buildHTML = async () => {
    log('Minifying HTML...');
    const htmlFiles = getFiles(SRC_DIR, '.html').filter(f => !f.includes('template.html'));
    const options = '--collapse-whitespace --remove-comments --remove-redundant-attributes --minify-css true --minify-js true';
    
    for (const file of htmlFiles) {
        const destPath = path.join(DIST_DIR, path.relative(SRC_DIR, file));
        ensureDir(path.dirname(destPath));
        try {
            await execPromise(`npx html-minifier "${file}" -o "${destPath}" ${options}`);
        } catch (e) {
            fs.copyFileSync(file, destPath);
        }
    }
};

const copyAssets = async () => {
    log('Copying assets...');
    const assets = [
        'images', 'video', 'lang', 'blog/articles/images', 'fidelizacion', 'legal', 
        'robots.txt', 'sitemap.xml', '.htaccess'
    ];
    assets.forEach(asset => {
        const src = path.join(SRC_DIR, asset);
        if (fs.existsSync(src)) fs.cpSync(src, path.join(DIST_DIR, asset), { recursive: true });
    });
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

        await versionAssets();
        log(`Build successful in ${((Date.now() - start) / 1000).toFixed(2)}s! 🚀`, colors.green);
    } catch (e) {
        console.error(colors.red + 'Build Failed!' + colors.reset, e);
        process.exit(1);
    }
};

runBuild();

