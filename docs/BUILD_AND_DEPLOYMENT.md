# Build y despliegue

## Pipeline de `pnpm build`

`pnpm build` ejecuta, en este orden (ver script `build` en `package.json`):

1. **`scripts/apply-version.js`** — lee `version` de `package.json` y la escribe en `js/config.js` (`siteConfig.version`), para que el footer y el cache-busting queden sincronizados con el número de release.
2. **`pnpm generate:hours`** (`scripts/sync-google-hours.js`) — consulta la Google Places API (`PLACE_ID` hardcodeado del negocio) y regenera `js/data/business-hours.js` con los horarios reales, incluyendo festivos colombianos.
3. **`pnpm generate:reviews`** (`scripts/sync-google-reviews.js`) — igual, pero regenera `js/data/google-reviews.js` con las reseñas más recientes de Google.
4. **`pnpm generate:blog`** (`scripts/generate-blog.js`) — genera/actualiza las páginas de `blog/articles/` a partir de `js/data/articles.js`.
5. **`pnpm generate:sitemap`** (`scripts/generate-sitemap.js`) — escanea todos los `.html` del proyecto (excluyendo `node_modules`, `dist`, `css`, `js`, `images`, `scripts`, etc.) y regenera `sitemap.xml` con prioridades por tipo de página.
6. **`scripts/build.js`** — el build final:
   - `validateEnvironment()`: verifica que existan `css/`, `js/`, `images/`, `scripts/`.
   - `clean()`: borra y recrea `dist/`.
   - En paralelo: `buildCSS()` (Tailwind v4 minificado), `buildJS()` (esbuild: bundling + code-splitting + minify de `js/main.js`, `service-page.js`, `hair-page.js`, `nails-page.js`, `makeup-page.js`), `buildHTML()` (minifica todos los `.html` excepto `_templates/*.template.html`), `copyAssets()` (copia `images/`, `video/`, `lang/`, `blog/articles/images/`, `legal/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `.htaccess`, y archivos de verificación SEO tipo IndexNow/Google/Bing).
   - **SSG** (`node scripts/ssg.js`): pre-renderiza HTML de componentes críticos directamente en los archivos de `dist/` (ver [ARCHITECTURE.md](ARCHITECTURE.md#generación-estática-ssg-scriptsssgjs)).
   - **Inyección de secretos**: reemplaza el placeholder `___GOOGLE_MAPS_API_KEY___` en el JS bundleado por `process.env.GOOGLE_MAPS_API_KEY`.
   - **Cache busting** (`versionAssets()`): renombra `styles.css` y cada bundle JS con un hash MD5 de su contenido (`styles.<hash>.css`), reescribe las referencias en HTML/JS, y además añade `?v=<timestamp>` a cada referencia para forzar invalidación de caché en cada build.

El resultado final a desplegar es siempre `dist/` — nunca se sirve el código fuente directamente en producción.

## Variables de entorno

| Variable | Dónde se usa | Notas |
|---|---|---|
| `GOOGLE_MAPS_API_KEY` | Inyectada en el JS bundleado en build time | Local: `.env` (ver `.env.example`). CI: GitHub Secret `GOOGLE_MAPS_API_KEY`. Debe estar **restringida por dominio/referrer** en Google Cloud Console. |
| `GOOGLE_CLOUD_PROJECT_ID`, `GOOGLE_BUSINESS_LOCATION_ID`, `GOOGLE_OAUTH_REFRESH_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Reservadas para el futuro orquestador de Google Business Profile | Ver [GMB_ORCHESTRATOR_PLAN.md](GMB_ORCHESTRATOR_PLAN.md) — **no implementado aún** |

`scripts/sync-google-hours.js` y `scripts/sync-google-reviews.js` cargan `.env` manualmente con un parser propio (no usan una librería tipo `dotenv`).

> ⚠️ **Nota de seguridad**: `scripts/build.js` tiene una API key de Google Maps hardcodeada como *fallback* si `GOOGLE_MAPS_API_KEY` no está definida en el entorno. Si esa clave no está restringida por dominio en Google Cloud Console, considera rotarla y eliminar el fallback — un secreto no debería vivir en el código fuente, ni siquiera como valor por defecto.

## CI/CD: `.github/workflows/deploy.yml`

- **Trigger:** push a `main`.
- **Pasos:** checkout → instalar pnpm v11 → Node 22 (con caché de pnpm) → `pnpm install --frozen-lockfile` → `pnpm run build` (con `GOOGLE_MAPS_API_KEY` desde GitHub Secrets) → deploy de `./dist/` a Hostinger vía FTPS (`SamKirkland/FTP-Deploy-Action`).
- **Secrets requeridos en GitHub:** `GOOGLE_MAPS_API_KEY`, `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
- El flag `dangerous-clean-slate: false` evita que el deploy borre archivos existentes en el servidor que no estén en `dist/` — importante si hay archivos gestionados manualmente en el hosting.

## Flujo recomendado para una release

1. Trabajar en `develop` (o una rama de feature).
2. Antes de mergear a `main`: bump de `version` en `package.json`, correr `pnpm build` localmente para validar que no hay errores.
3. Merge/push a `main` → GitHub Actions construye y despliega automáticamente.
4. Opcional: `pnpm index-now` para notificar a Bing/Yandex sobre URLs nuevas o actualizadas sin esperar su rastreo natural.

## Post-despliegue: indexación

`scripts/index-now.js` implementa el protocolo [IndexNow](https://www.indexnow.org/) contra tres endpoints (IndexNow global, Bing, Yandex). Detecta automáticamente la clave API buscando un archivo `<32-hex>.txt` en la raíz del proyecto (el mismo que Bing pide alojar para verificar propiedad del dominio).
