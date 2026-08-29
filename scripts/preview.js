import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const PORT = Number(process.env.PORT || process.argv[2] || 8080);

/**
 * Servidor de revisión para `dist/`.
 *
 * No vale un `http.server` cualquiera: dist enlaza con URLs limpias —`./nosotros`, no
 * `./nosotros.html`— porque en producción las resuelve el `.htaccess`. Un servidor
 * estático a secas devuelve 404 en cuanto se pulsa el primer enlace del navbar.
 *
 * Tampoco vale el preview del repo con Live Server para todo lo que genera el SSG
 * —heroes, badges del hero, ItemList de vídeos—: eso solo existe en dist.
 */

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.mp4': 'video/mp4',
    '.webmanifest': 'application/manifest+json'
};

/**
 * Réplica de las reglas del `.htaccess`, la misma que usa `resolveUrlToFile` en el SSG:
 * una ruta con barra final busca su `index.html` y una sin extensión busca el `.html`
 * homónimo. Incluye el 301 de `/servicios/` a la raíz, para revisarlo aquí y no en
 * producción, que es donde se descubrió el 403.
 *
 * @returns {{redirect: string}|{file: string}|null}
 */
function resolver(ruta) {
    if (/^\/servicios\/?$/.test(ruta)) return { redirect: '/' };

    const limpia = decodeURIComponent(ruta).replace(/^\//, '');

    if (limpia === '') return { file: path.join(DIST_DIR, 'index.html') };

    const candidatos = limpia.endsWith('/')
        ? [path.join(DIST_DIR, limpia, 'index.html')]
        : [
            path.join(DIST_DIR, limpia),                 // asset con extensión
            path.join(DIST_DIR, `${limpia}.html`),       // URL limpia
            path.join(DIST_DIR, limpia, 'index.html')    // directorio sin barra
        ];

    for (const candidato of candidatos) {
        // Nada fuera de dist, aunque la ruta traiga `..`.
        if (!path.resolve(candidato).startsWith(path.resolve(DIST_DIR))) continue;
        if (fs.existsSync(candidato) && fs.statSync(candidato).isFile()) return { file: candidato };
    }

    return null;
}

if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ No existe dist/. Corre `pnpm build` antes de previsualizar.');
    process.exit(1);
}

http.createServer((req, res) => {
    const ruta = req.url.split(/[?#]/)[0];
    const resuelto = resolver(ruta);

    if (!resuelto) {
        const notFound = path.join(DIST_DIR, '404.html');
        res.writeHead(404, { 'Content-Type': MIME['.html'] });
        res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'No encontrado');
        return;
    }

    if (resuelto.redirect) {
        res.writeHead(301, { Location: resuelto.redirect });
        res.end();
        return;
    }

    res.writeHead(200, { 'Content-Type': MIME[path.extname(resuelto.file)] || 'application/octet-stream' });
    fs.createReadStream(resuelto.file).pipe(res);
}).listen(PORT, () => {
    console.log(`\n👀 Revisando dist en http://localhost:${PORT}`);
    console.log('   URLs limpias y el 301 de /servicios/, como en producción.');
    console.log('   Ctrl+C para parar.\n');
});
