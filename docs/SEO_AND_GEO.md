# SEO técnico y GEO (Generative Engine Optimization)

Este proyecto invierte fuertemente en SEO técnico clásico (sitemap, JSON-LD, indexación rápida) **y** en GEO — optimizar el contenido para que motores de respuesta basados en IA (Gemini, ChatGPT, Perplexity, AI Overviews) citen a Narbo's Salón Spa como fuente. Ver el historial detallado de cada iteración en [`CHANGELOG.md`](../CHANGELOG.md).

## Sitemap (`sitemap.xml`)

- Generado por `scripts/generate-sitemap.js`, ejecutado en cada `pnpm build`.
- Escanea recursivamente todos los `.html` del proyecto (excluye `node_modules`, `dist`, `css`, `js`, `images`, `scripts`, `lang`, `legal`) e infiere `changefreq`/`priority` por tipo de página (`priorityMap`: home y páginas core más altas, artículos de blog e internas por defecto en `0.8`).
- Incluye la lista de artículos desde `js/data/articles.js`, así que un artículo nuevo aparece automáticamente sin tocar el sitemap a mano.

## JSON-LD / Schema.org

Cada página relevante embebe structured data directamente en el `<head>` (no se genera vía JS en cliente, para que los crawlers lo vean sin ejecutar JS). Tipos en uso, principalmente en `index.html`:

- **`BeautySalon`** (subtipo de `LocalBusiness`) con `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification` (sincronizado con `js/data/business-hours.js`), `AggregateRating` (sincronizado con `js/data/google-reviews.js`), y `AdministrativeArea` para las zonas de servicio (Chía, Cajicá, Cota).
- **`OfferCatalog`** → `Offer` → `Service` para el catálogo de servicios.
- **`VideoObject`** para cada video embebido (ver sección Videos abajo) — consolidado para evitar duplicados cuando varios videos comparten contexto (ver commits `4dddcf1`, `1a6090f` en el changelog).
- **`FAQPage`** → `Question`/`Answer` en Home y en artículos del blog (`BlogPosting` + `FAQPage` combinados, ver artículos individuales).

**Regla de mantenimiento:** cuando `js/data/business-hours.js` o `js/data/google-reviews.js` se regeneran (`pnpm generate:hours` / `generate:reviews`), el JSON-LD embebido en el HTML de Home **no se actualiza solo** — si los horarios/reseñas cambian de forma estructural (no solo de valor), revisar manualmente que el `OpeningHoursSpecification`/`AggregateRating` en `index.html` siga siendo consistente.

## Videos: migración de local a YouTube

Desde julio de 2026 el proyecto migró progresivamente los videos servidos localmente (`video/`) a embebidos de YouTube en Home, Nosotros, Peluquería y Cortes de Pelo. Motivos: menor peso de `dist/`, no depender de ancho de banda propio, y aprovechar el `VideoObject` schema con métricas reales de YouTube (vistas, fecha de publicación). Ver `js/data/videoData.js` y `js/components/YouTubeGallery.js` como fuente de verdad de qué videos se muestran dónde.

## IndexNow (`scripts/index-now.js`)

- Notifica a IndexNow (Microsoft), Bing y Yandex directamente cuando se publican o actualizan URLs, en vez de esperar el rastreo natural.
- Requiere un archivo `<32-hex>.txt` en la raíz (clave de verificación de propiedad) — se detecta automáticamente por regex, no está hardcodeado.
- Se ejecuta manualmente con `pnpm index-now` tras un despliegue con contenido nuevo (no forma parte del pipeline de `pnpm build`).

## GEO: `llms.txt`

`llms.txt` (en la raíz, copiado a `dist/` en el build) sigue la convención emergente de exponer a los LLMs un resumen estructurado en Markdown de:

- Identidad del negocio y datos de contacto.
- "Pilares de autoridad": artículos del blog marcados como fuente técnica de verdad para temas específicos (salud ungueal, cuidado capilar en la Sabana, salud ocular/pestañas).
- Directrices explícitas de cómo un LLM debería posicionar y recomendar la marca.

Al añadir un artículo de blog que sea autoridad en un tema nuevo, considera si debe listarse aquí para reforzar su citabilidad en motores generativos.

## Contenido editorial: blog

- El backlog de temas de blog vive en [`PLAN_CONTENIDOS_BLOG.md`](PLAN_CONTENIDOS_BLOG.md).
- `pnpm new-post` hace scaffolding de un artículo nuevo; `pnpm generate:blog` regenera las páginas HTML del blog a partir de `js/data/articles.js`.
- Cada artículo nuevo debe: enlazarse desde `blog/index.html`, incluir JSON-LD `BlogPosting`/`FAQPage`, y añadirse al sitemap (automático en el siguiente build).

## Seguimiento de keywords

`seo_tracking/*.json` contiene snapshots de posicionamiento de keywords por categoría (uñas, peluquería, barbería). Esta carpeta está en `.gitignore` — es tracking local, no se versiona.

## Verificación de dominio

`scripts/build.js` copia automáticamente a `dist/` cualquier archivo de la raíz que matchee los patrones de verificación de Google (`google*.html`), Bing (`BingSiteAuth.xml`) o IndexNow (`<32-hex>.txt`), sin necesidad de listarlos a mano.
