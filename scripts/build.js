const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

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
    red: "\x1b[31m"
};

const log = (msg, color = colors.blue) => console.log(`${color}[BUILD] ${msg}${colors.reset}`);

/**
 * Helper to create directory if it doesn't exist
 */
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

/**
 * Helper to get all files recursively with a specific extension
 */
const getFiles = (dir, ext, fileList = []) => {
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
    log('Building Tailwind CSS...');
    ensureDir(path.join(DIST_DIR, 'css'));
    // Using the CLI command defined in package.json context
    await execPromise('npx tailwindcss -i ./css/input.css -o ./dist/css/styles.css --minify');
};

/**
 * Task: Build JS (Copy & Minify recursively for Modules)
 */
const buildJS = async () => {
    log('Processing JavaScript (Modules)...');
    const jsSrcDir = path.join(SRC_DIR, 'js');
    const jsFiles = getFiles(jsSrcDir, '.js');

    for (const file of jsFiles) {
        // Calculate relative path to maintain structure (e.g., components/Navbar.js)
        const relativePath = path.relative(SRC_DIR, file);
        const destPath = path.join(DIST_DIR, relativePath);
        
        ensureDir(path.dirname(destPath));

        // Minify with Terser
        // We use -c (compress) and -m (mangle)
        try {
            await execPromise(`npx terser "${file}" -o "${destPath}" -c -m`);
        } catch (error) {
            console.error(`Error minifying ${file}:`, error);
            // Fallback: copy file if minification fails
            fs.copyFileSync(file, destPath);
        }
    }
};

/**
 * Task: Build HTML (Find all HTMLs and Minify)
 */
const buildHTML = async () => {
    log('Processing HTML files...');
    const htmlFiles = getFiles(SRC_DIR, '.html');

    for (const file of htmlFiles) {
        const relativePath = path.relative(SRC_DIR, file);
        const destPath = path.join(DIST_DIR, relativePath);
        
        ensureDir(path.dirname(destPath));

        // HTML Minifier options
        const options = '--collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true';
        
        await execPromise(`npx html-minifier "${file}" -o "${destPath}" ${options}`);
    }
};

/**
 * Task: Copy Assets (Images, Videos, Lang, etc.)
 */
const copyAssets = async () => {
    log('Copying static assets...');
    
    const assetsToCopy = [
        { src: 'images', dest: 'images' },
        { src: 'video', dest: 'video' },
        { src: 'lang', dest: 'lang' },
        { src: 'blog/articles/images', dest: 'blog/articles/images' },
        { src: 'robots.txt', dest: 'robots.txt' },
        { src: 'sitemap.xml', dest: 'sitemap.xml' }
    ];

    for (const asset of assetsToCopy) {
        const srcPath = path.join(SRC_DIR, asset.src);
        const destPath = path.join(DIST_DIR, asset.dest);

        if (fs.existsSync(srcPath)) {
            // fs.cpSync is available in Node > 16.7.0
            // If running on older node, we might need a fallback, but assuming modern env.
            fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
            console.warn(`Warning: Asset source not found: ${asset.src}`);
        }
    }
};

/**
 * Main Build Function
 */
const runBuild = async () => {
    const startTime = Date.now();
    try {
        await clean();
        
        // Run parallel tasks where possible
        await Promise.all([
            buildCSS(),
            buildJS(),
            buildHTML(),
            copyAssets()
        ]);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`Build completed successfully in ${duration}s! 🚀`, colors.green);
        
    } catch (error) {
        console.error(colors.red + 'Build Failed!' + colors.reset, error);
        process.exit(1);
    }
};

runBuild();
