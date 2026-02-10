import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Promisify exec for async/await usage
const execPromise = util.promisify(exec);

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const SRC_DIR = path.join(__dirname, '../');

// Colors for console output
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
 * Helper to get hash of file content
 */
const getFileHash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex').substring(0, 8); // Short 8-char hash
};

/**
 * Helper to ensure dir exists
 */
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

/**
 * Helper to get all files recursively
 */
const getFiles = (dir, ext, fileList = []) => {
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== '.git' && file !== '.gemini') {
                getFiles(filePath, ext, fileList);
            }
        } else {
            if (path.extname(file) === ext) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
};

/**
 * Task: Clean Dist Directory
 */
const clean = async () => {
    log('Cleaning dist directory...', colors.yellow);
    if (fs.existsSync(DIST_DIR)) {
        fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }
    ensureDir(DIST_DIR);
};

/**
 * Task: Build CSS (Tailwind)
 */
const buildCSS = async () => {
    log('Building Tailwind CSS (v4)...');
    ensureDir(path.join(DIST_DIR, 'css'));
    await execPromise('npx @tailwindcss/cli -i ./css/input.css -o ./dist/css/styles.css --minify');
};

/**
 * Task: Run PurgeCSS (Post-SSG)
 * Vital for mobile menu preservation. Runs AFTER components are injected into HTML.
 */
const runPurgeCSS = async () => {
    log('Running PurgeCSS (Post-SSG stabilization)...', colors.magenta);
    try {
        await execPromise(`npx purgecss --css ./dist/css/styles.css --content ./dist/**/*.html ./dist/**/*.js --output ./dist/css/styles.css`);
        log('✅ PurgeCSS completed. CSS is now optimized and stable.', colors.green);
    } catch(err) {
         console.warn('⚠️ PurgeCSS warning:', err);
    }
};

/**
 * Task: Build JS (Bundle with esbuild)
 */
const buildJS = async () => {
    log('Bundling JavaScript with esbuild...');
    
    // Define entry points
    const entryPoints = [
        path.join(SRC_DIR, 'js/main.js'),
        path.join(SRC_DIR, 'js/service-page.js')
    ];

    try {
        await execPromise(`npx esbuild ${entryPoints.map(e => `"${e}"`).join(' ')} --bundle --minify --format=esm --outdir="${path.join(DIST_DIR, 'js')}" --target=es2020`);
        log('✅ JS Bundling complete (main.js, service-page.js).', colors.green);
    } catch (error) {
        console.error('❌ ESBuild failed:', error);
        throw error;
    }
};

/**
 * Task: Build HTML (Just Minify, no hashing here yet)
 */
const buildHTML = async () => {
    log('Processing HTML files...');
    const htmlFiles = getFiles(SRC_DIR, '.html');
    
    for (const file of htmlFiles) {
        if (file.includes('template.html')) continue;

        const relativePath = path.relative(SRC_DIR, file);
        const destPath = path.join(DIST_DIR, relativePath);
        
        ensureDir(path.dirname(destPath));

        const options = '--collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true';
        
        try {
            await execPromise(`npx html-minifier "${file}" -o "${destPath}" ${options}`);
        } catch (error) {
            console.error(`Error minifying HTML ${file}:`, error);
            fs.copyFileSync(file, destPath);
        }
    }
};

/**
 * Task: Copy Assets
 */
const copyAssets = async () => {
    log('Copying static assets...');
    const assetsToCopy = [
        { src: 'images', dest: 'images' },
        { src: 'video', dest: 'video' },
        { src: 'lang', dest: 'lang' },
        { src: 'blog/articles/images', dest: 'blog/articles/images' },
        { src: 'robots.txt', dest: 'robots.txt' },
        { src: 'sitemap.xml', dest: 'sitemap.xml' },
        { src: '.htaccess', dest: '.htaccess' }
    ];

    for (const asset of assetsToCopy) {
        const srcPath = path.join(SRC_DIR, asset.src);
        const destPath = path.join(DIST_DIR, asset.dest);

        if (fs.existsSync(srcPath)) {
            fs.cpSync(srcPath, destPath, { recursive: true });
        }
    }
};

/**
 * Task: Versioning / Cache Busting
 * Renames assets with Hash and updates all references in dist HTML
 */
const versionAssets = async () => {
    log('Applying Cache Busting (Versioning)...', colors.magenta);
    
    const assetsToVersion = [
        { dir: 'css', name: 'styles.css' },
        { dir: 'js', name: 'main.js' },
        { dir: 'js', name: 'service-page.js' }
    ];

    const mappings = {};

    for (const asset of assetsToVersion) {
        const filePath = path.join(DIST_DIR, asset.dir, asset.name);
        if (fs.existsSync(filePath)) {
            const hash = getFileHash(filePath);
            const ext = path.extname(asset.name);
            const base = path.basename(asset.name, ext);
            
            const newName = `${base}.${hash}${ext}`;
            const newPath = path.join(DIST_DIR, asset.dir, newName);

            fs.renameSync(filePath, newPath);
            mappings[`${asset.dir}/${asset.name}`] = `${asset.dir}/${newName}`;
            
            log(`- Versioned: ${asset.name} -> ${newName}`, colors.green);
        }
    }

    const distHtmlFiles = getFiles(DIST_DIR, '.html');
    const timestamp = Date.now();
    
    for (const file of distHtmlFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        Object.keys(mappings).forEach(originalPath => {
            const newPath = mappings[originalPath];
            const originalFilename = path.basename(originalPath); 
            const newFilename = path.basename(newPath);
            
            const regex = new RegExp(`(href="|src=")([^"]*\\/)?${originalFilename.replace('.', '\\.')}(\\?[^"]*)?(")`, 'g');
            
            if (regex.test(content)) {
                content = content.replace(regex, `$1$2${newFilename}?v=${timestamp}$4`);
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
        }
    }

    const distJsFiles = getFiles(path.join(DIST_DIR, 'js'), '.js');
    for (const file of distJsFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        Object.keys(mappings).forEach(originalPath => {
            const newPath = mappings[originalPath]; 
            const originalFilename = path.basename(originalPath);
            const newFilename = path.basename(newPath);

            const regex = new RegExp(`(['"])([^'"]*\\/)?${originalFilename.replace('.', '\\.')}(\\?[^'"]*)?(['"])`, 'g');
            
            if (regex.test(content)) {
                content = content.replace(regex, `$1$2${newFilename}?v=${timestamp}$4`);
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
        }
    }
    
    log(`✅ Cache busting complete with timestamp: ${timestamp}`);
};

/**
 * Main Build Function
 * REORDERED for stability: Build -> Inject (SSG) -> Purge -> Version
 */
const runBuild = async () => {
    const startTime = Date.now();
    try {
        await clean();
        
        // 1. Build Base Assets (Initial CSS, minified, without purge yet)
        await Promise.all([
            buildCSS(),
            buildJS(),
            buildHTML(),
            copyAssets()
        ]);

        // 2. SSG Injection (Updates HTML structure with Navbar, Grid, etc.)
        log('Running SSG Injection (Content Hydration)...');
        try {
            await execPromise('node scripts/ssg.js');
        } catch (error) {
            console.error("❌ Error in SSG step:", error);
            throw error;
        }

        // 3. PurgeCSS (Post-Hydration)
        // Now PurgeCSS will see all the classes injected by SSG (like max-md:hidden)
        await runPurgeCSS();

        // 4. Versioning (Final step: hash the optimized files)
        await versionAssets();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`Build completed successfully in ${duration}s! 🚀`, colors.green);
        
    } catch (error) {
        console.error(colors.red + 'Build Failed!' + colors.reset, error);
        process.exit(1);
    }
};

runBuild();
