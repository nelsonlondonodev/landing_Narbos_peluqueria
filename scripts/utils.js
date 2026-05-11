import fs from 'fs';
import path from 'path';

/**
 * Busca recursivamente archivos HTML excluyendo directorios innecesarios
 */
export function getHtmlFiles(dir, fileList = [], rootDir = dir) {
    const files = fs.readdirSync(dir);
    const excludedDirs = ['node_modules', 'dist', '.git', '_templates', 'css', 'js', 'images', 'video', 'scripts', 'lang', 'fidelizacion', 'legal'];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!excludedDirs.includes(file)) {
                getHtmlFiles(filePath, fileList, rootDir);
            }
        } else if (path.extname(file) === '.html') {
            let relativePath = path.relative(rootDir, filePath);
            relativePath = relativePath.split(path.sep).join('/');
            
            if (!relativePath.includes('google') && !relativePath.includes('.template.')) {
                fileList.push(relativePath);
            }
        }
    });
    return fileList;
}

/**
 * Limpia y normaliza una ruta de archivo para convertirla en URL
 */
export function normalizeUrlPath(file) {
    let urlPath = file;
    if (urlPath === 'index.html') {
        urlPath = '/';
    } else {
        urlPath = urlPath.replace('/index.html', '/').replace('index.html', '');
        if (urlPath.endsWith('.html')) {
            urlPath = urlPath.slice(0, -5);
        }
    }
    if (!urlPath.startsWith('/')) {
        urlPath = '/' + urlPath;
    }
    return urlPath;
}
