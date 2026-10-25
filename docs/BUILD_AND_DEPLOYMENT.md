# Build y despliegue

## Pipeline de `pnpm build`

`pnpm build` ejecuta, en este orden (ver script `build` en `package.json`):

1. **`scripts/apply-version.js`** — lee `version` de `package.json` y la escribe en `js/config.js` (`siteConfig.version`), para que el footer y el cache-busting queden sincronizados con el número de release.
2. **`pnpm generate:hours`** (`scripts/sync-google-hours.js`) — consulta la Google Places API (el `PLACE_ID` vive en `js/data/place-config.js`) y regenera `js/data/business-hours.js` con los horarios reales, incluyendo festivos colombianos.
3. **`pnpm generate:reviews`** (`scripts/sync-google-reviews.js`) — igual, pero regenera `js/data/google-reviews.js` con la nota, el total y las reseñas más recientes de Google.
   - Si la API falla, los dos syncs caen a un fallback estático. En local se tolera; en CI `scripts/assert-synced.js` aborta el build para no publicar horarios ni reseñas rancios.
4. **`pnpm generate:video-dates`** (`scripts/sync-video-dates.js`) — sincroniza con YouTube las fechas de publicación de los videos de `js/data/videoData.js`.
5. **`pnpm generate:video-schema`** (`scripts/generate-video-schema.js`) — escribe el JSON-LD `VideoObject` de cada página a partir de `videoData.js` y `pagesData.js`.
6. **`pnpm generate:blog`** (`scripts/generate-blog.js`) — genera/actualiza las páginas de `blog/articles/` a partir de `js/data/articles.js`.
7. **`pnpm generate:sitemap`** (`scripts/generate-sitemap.js`) — recorre los `.html` del proyecto (sin `legal/` ni `404.html`), añade los artículos de `js/data/articles.js` y regenera `sitemap.xml` con prioridades por tipo de página.
8. **`scripts/build.js`** — el build final:
   - `validateEnvironment()`: verifica que existan `css/`, `js/`, `images/`, `scripts/`.
   - `clean()`: borra y recrea `dist/`.
   - En paralelo: `buildCSS()` (Tailwind v4 minificado), `buildJS()` (esbuild: bundling + code-splitting + minify de `js/main.js`, `service-page.js`, `hair-page.js`, `nails-page.js`, `makeup-page.js`), `buildHTML()` (minifica todos los `.html` excepto `_templates/*.template.html`), `copyAssets()` (copia `images/`, `fonts/`, `vendor/`, `blog/articles/images/`, `legal/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `.htaccess`, y archivos de verificación SEO tipo IndexNow/Google/Bing).
   - **SSG** (`node scripts/ssg.js`): pre-renderiza HTML de componentes críticos directamente en los archivos de `dist/` (ver [ARCHITECTURE.md](ARCHITECTURE.md#generación-estática-ssg-scriptsssgjs)).
   - **Inyección de secretos**: reemplaza el placeholder `___GOOGLE_MAPS_API_KEY___` en el JS bundleado por `process.env.GOOGLE_MAPS_API_KEY_WEB`. Si falta, queda vacío y el badge de horario usa solo el horario estático.
   - **Cache busting** (`versionAssets()`): renombra `styles.css` y cada bundle JS con un hash MD5 de su contenido (`styles.<hash>.css`), reescribe las referencias en HTML/JS, y además añade `?v=<timestamp>` a cada referencia para forzar invalidación de caché en cada build.

El resultado final a desplegar es siempre `dist/` — nunca se sirve el código fuente directamente en producción.

## Variables de entorno

| Variable | Dónde se usa | Notas |
|---|---|---|
| `GOOGLE_MAPS_API_KEY_WEB` | Inyectada en el JS bundleado en build time | Va al navegador: debe estar **restringida por referrer** a `narbossalon.com` y `www.narbossalon.com`. |
| `GOOGLE_MAPS_API_KEY_BUILD` | Scripts de sync (`sync-google-hours.js`, `sync-google-reviews.js`) | Node no envía referrer, así que se restringe solo a «Places API (New)». Nunca en el navegador. |

Local: `.env` (ver `.env.example`). CI: GitHub Secrets con el mismo nombre. Los scripts cargan `.env` con `scripts/load-env.js`, un parser propio compartido (no usan `dotenv`).

## CI/CD: `.github/workflows/deploy.yml`

- **Trigger:** push a `main`.
- **Pasos:** checkout → instalar pnpm v11 → Node 22 (con caché de pnpm) → `pnpm install --frozen-lockfile` → `pnpm run build` (con las dos claves desde GitHub Secrets) → deploy de `./dist/` a Hostinger con **rsync por SSH**.
- **Secrets requeridos en GitHub:** `GOOGLE_MAPS_API_KEY_WEB`, `GOOGLE_MAPS_API_KEY_BUILD` y `SSH_PRIVATE_KEY_B64` (la llave privada del deploy en base64).
- rsync va sin `--delete`: no borra del servidor los archivos que ya no estén en `dist/`. Quitar algo del repo no lo quita de producción.

## Flujo recomendado para una release

1. Trabajar en `develop` (o una rama de feature).
2. Antes de mergear a `main`: bump de `version` en `package.json`, correr `pnpm build` localmente para validar que no hay errores.
3. Merge/push a `main` → GitHub Actions construye y despliega automáticamente.
4. Opcional: `pnpm index-now` para notificar a Bing/Yandex sobre URLs nuevas o actualizadas sin esperar su rastreo natural.

## Post-despliegue: indexación

`scripts/index-now.js` implementa el protocolo [IndexNow](https://www.indexnow.org/) contra tres endpoints (IndexNow global, Bing, Yandex). Detecta automáticamente la clave API buscando un archivo `<32-hex>.txt` en la raíz del proyecto (el mismo que Bing pide alojar para verificar propiedad del dominio).
