Narbo's Salón Spa - Sitio Web Oficial

Este repositorio contiene el código fuente de la Plataforma Web Oficial de Narbo's Salón Spa, un sitio web robusto, escalable y totalmente responsivo, diseñado para ofrecer una experiencia de usuario premium y gestionar servicios avanzados.

Ver Demo en Vivo (https://narbossalon.com/)

✨ Características Principales
Este proyecto es una Plataforma Web Corporativa completa, equipada con funcionalidades avanzadas como reservas, blog, catálogo de servicios y automatización:

🌐 Soporte Multi-idioma: Permite a los usuarios cambiar el contenido entre Español e Inglés (🇪🇸/🇬🇧). La preferencia del idioma se guarda en el navegador para futuras visitas.

🎨 Selector de Tema Dinámico: Ofrece tres modos de visualización: Claro, Oscuro y Automático (☀️/🌙). El modo automático se sincroniza con el tema del sistema operativo del usuario, y su elección también se guarda localmente.

🖼️ Galería de Trabajos Interactiva: Muestra los trabajos del salón con filtros por categoría (Peluquería, Uñas, Estética). Cada imagen se puede ampliar en una vista "lightbox" para observarla en detalle.

📱 Diseño 100% Responsivo: La interfaz se adapta fluidamente a cualquier tamaño de pantalla, garantizando una experiencia de usuario perfecta en móviles, tabletas y ordenadores de escritorio.

💬 Carrusel de Reseñas: Presenta testimonios de clientes de manera elegante en un carrusel que rota automáticamente.

💅 Modales de Servicios Detallados: Cada servicio listado abre una ventana modal con su descripción completa, manteniendo la página principal limpia y organizada.

🧭 Navegación Inteligente (Scroll Spy): El menú de navegación resalta de forma activa la sección de la página que el usuario está viendo, mejorando la orientación.

🚀 Optimización de Rendimiento y SEO:

Carga diferida (Lazy Loading) para las imágenes, mejorando drásticamente la velocidad de carga inicial.

Archivos sitemap.xml y robots.txt incluidos para una mejor indexación en motores de búsqueda como Google.

🚨 Arquitectura de URLs y Reglas Críticas de SEO
Para preservar el historial de indexación en Google Search Console y evitar errores de "propiedad no válida" o contenido duplicado, se DEBEN seguir estas reglas estrictas:

1. Dominio Principal: El sitio opera bajo https://narbossalon.com (SIN www). El archivo .htaccess está configurado para redirigir cualquier intento de acceso con www al dominio raíz.
2. URLs Limpias: Se debe evitar el uso de index.html en los enlaces. El servidor redirige automáticamente cualquier petición a /index.html hacia la raíz /.
3. Etiquetas Canonicals: Todas las páginas deben incluir una etiqueta <link rel="canonical" href="https://narbossalon.com/..."> que coincida exactamente con la URL final sin www.
4. Sitemap: Debe generarse siempre apuntando al dominio raíz (ejecutar npm run build para asegurar la actualización).



## 🚀 Hoja de Ruta de Innovación (Roadmap 2026+)

Para llevar a Narbo's Salón Spa al siguiente nivel de conversión y eficiencia, hemos trazado el siguiente plan de mejoras estratégicas:

### 🌐 1. SEO & Dominio en Google (Search Engine Mastery)
*   **Gestión Autónoma de GMB (Fase 1 - En Progreso)**: ✅ Infraestructura base creada (`scripts/gmb-orchestrator.js`). Pendiente configuración de credenciales API. Auditoría y respuesta de reseñas automática/semiautomática usando IA.
*   **Monitoreo Real de Rankings**: Seguimiento semanal de posiciones para palabras clave locales en Chía/Cajicá.
*   **Análisis Concurrido**: Benchmarking técnico de competidores directos para superar su velocidad y contenido.

### 🤖 2. Automatizaciones de Negocio (n8n & CRM)
*   **Agendamiento Asistido por IA**: Flujos en n8n que pre-califiquen citas en WhatsApp antes de pasar al agente humano.
*   **Fidelización Inteligente**: Campañas de retención automáticas basadas en la última fecha de visita (Supabase + n8n).
*   **Reportería Ejecutiva**: Resúmenes mensuales de GA4 y Search Console enviados por WhatsApp.

### 🎨 3. UX & Diseño "Wow" (Visual Excellence)
*   **Micro-interacciones Cinematográficas**: Refinamiento de animaciones y transiciones de página para una sensación "App-like".
*   **IA-Powered Media Optimizer**: Conversión y mejora automática de activos visuales a formatos de última generación (WebP/AVIF).

### 📈 4. Marketing & Conversión (CRO)
*   **Pruebas A/B de Botones de Reserva**: Optimización del color, texto y posición de los CTAs basada en datos reales de clics.
*   **Consultor Capilar Virtual**: Chatbot inteligente que asista a las clientas en la elección de su servicio ideal (Balayage, Keratina, Spa).

### 🔧 5. Mantenimiento Quirúrgico (Code Health)
*   **Refactorización Modular**: Limpieza continua del core para asegurar que la web sea rápida, segura y fácil de escalar a medida que el negocio crece.

---

## 🔄 Recent Updates (April 03, 2026) - SEO Indexing Master & Business Continuity 🚀

### 1. SEO Master Clean-up & URL Normalization 🔍
*   **Contradictory Signal Fix:** Performed a surgical removal of all `.html` extensions from `og:url`, `twitter:url`, and JSON-LD Schema IDs across the entire project (Nosotros, Blog Index, and 12 Articles).
*   **GSC Recovery:** Actively signaled Google Search Console by requesting a "New Validation" for the *Crawled - currently not indexed* status, now that internal metadata perfectly matches canonical and sitemap URLs.
*   **Tracking Sanitization:** Extracted legacy static GTM (Google Tag Manager) blocks from blog articles, ensuring a cleaner, high-performance execution via the lazy-loaded `AnalyticsService`.

### 2. Operations: Temporary Salon Closure 🚨
*   **Real-time Status Control:** Implemented a date-based exception in `BusinessStatusBadge.js` to force a "CERRADO POR HOY" (Closed for Today) status for April 3rd, 2026.
*   **Auto-Reversion Logic:** The system is programmed to automatically return to the "OPEN NOW" status tomorrow at 7:00 AM, following the regular business hours without manual intervention.

### 3. Versioning & Cache Integrity (v2.2.0) ⚡
*   **Global Cache Busting:** Executed a project-wide upgrade from `v2.1.9` to **`v2.2.0`**. Updated calls to all JS and CSS assets in every HTML file to guarantee immediate refresh for all users (mobile & desktop).
*   **Footer Synchronization:** Successfully linked the visual version tag in the footer with the master `siteConfig.version`, providing a transparent audit trail of the project's evolution.

---

## 🔄 Recent Updates (March 30, 2026) - Blog Architecture REvolution & Automation 🚀

### 1. Component-Based Blog Architecture (Vanilla JS) 🏗️
*   **ArticleCard Component:** Implemented a reusable, atomic class `ArticleCard.js` to standardize article rendering, ensuring pixel-perfect consistency across the entire blog ecosystem.
*   **Dynamic Hydration (CSR):** Developed `BlogController.js` to handle Client-Side Rendering in local development environments. It features **Lazy Loading** and **IntersectionObserver** to inject articles only when needed, keeping the main thread light.
*   **Chronological Auto-Sorting:** Both the Client-Side and SSG engines now automatically sort articles by `isoDate`. No more manual ordering required in the data files.

### 2. SSG Pipeline Integration (SEO Automation) 🤖
*   **Static Injection:** Updated `ssg.js` to physically inject the article grid into the HTML during the build process. This guarantees 100% SEO visibility (Static HTML) while maintaining a modern developer experience.
*   **Data-Driven Truth:** The `js/data/articles.js` file is now the single source of truth. Changes there automatically propagate to the index cards and metadata during `npm run build`.

### 3. UI/UX Synchronization 🎨
*   **FAQ Unification:** Refactored the Blog's FAQ section to strictly follow the Homepage design system (Shadows, borders, and brand icons), eliminating visual divergence.
*   **Path Resilience:** Normalized all article assets to absolute paths (`/blog/articles/images/`), resolving legacy 404 errors during deep-link navigation.

---

## 🔄 Recent Updates (March 28, 2026) - Architectural Modularization & SEO Blog Content 💅

### 1. Nails & Spa Hub Architecture (Clean Code) 🏗️
*   **Controller Decoupling:** Successfully refactored the `unas-spa` hub. Extracted monolithic logic into a dedicated, atomic `NailsHubController.js` to strictly govern its components.
*   **Dynamic Modal Injection:** Augmented `ServiceModal.js` with an automated HTML fallback that completely removes the heavy hardcoded `<div>` from the bottom of physical HTML files, improving DOM cleanliness.
*   **Data Integrity:** The Hub now fully integrates with the unified `service-page.js` dispatcher while retaining legacy features, like accurate ID exclusions (`data-exclude-ids`) for tailored service rendering in subpages.

### 2. High-Converting SEO Blog Launch ("Rubios Sabana") ✍️
*   **Topic Strategy:** Published a hyper-local, educational article addressing oxidation and hair-loss mechanisms specifically tied to the high altitude of Chía/Bogotá (Sabana).
*   **Interactive Capability:** Coded a Vanilla JS "Oxidation Calculator" into the layout, providing readers with personalized diagnostic risk alerts based on their selected habits.
*   **Semantic Data Mastery:** Fully mapped the article using the `BlogPosting` JSON-LD schema pattern, styled with elegant Tailwind typography (`Playfair` & `Inter`), and injected internal conversion links (Corrección de color) to bolster CTR.

---

## 🔄 Recent Updates (March 26, 2026) - Loyalty Program Enhancement 🎁

### 1. Retention Strategy Update (15% Discount)
*   **Discount Increase:** Professionally updated the loyalty landing page (`/fidelizacion/`) to reflect a **15% welcome discount** (previously 10%).
*   **Policy Clarification:** Integrated a mandatory service exception for **Hair Removal (Depilación)** into all UI touchpoints (Benefit cards, Success messages, and QR modals) to ensure consistency with automated email workflows.
*   **iOS & Apple Cache Integrity:** Implemented a targeted **Cache Buster (v=3.1)** on the loyalty stylesheet to force immediate updates on iPhones and iPads, which often retain legacy CSS.
*   **Production Deployment:** Executed a full production build (`npm run build`) and synchronized `develop` with `main` to push the 15% offer live.

---

## 🔄 Recent Updates (March 18, 2026) - Part 3: Performance & Core Web Vitals (90+ Score) ⚡

### 1. PageSpeed Insights Recovery (91% Mobile Score) 🚀
*   **Forced Reflow Elimination:** Refactored `UIService.js` to eliminate "Layout Thrashing". Migrated from interleaved DOM reads/writes to a **Batch Read/Write pattern**. This prevents the browser from recalculating the layout multiple times during the initial render, drastically reducing Total Blocking Time (TBT).
*   **LCP Critical Path Optimization:** Optimized the **Largest Contentful Paint (LCP)** element across all blog articles:
    *   Removed `animate__fadeInUp` from above-the-fold content (H1 headers and Hero images). Content is now visible instantly (0ms delay).
    *   Implemented `<link rel="preload">` with `fetchpriority="high"` for all article hero assets, ensuring they are discovered before the main CSS/JS bundle.
*   **CLS Prevention (Layout Stability):** Added explicit `width` and `height` attributes to all article hero images, eliminating layout shifts during image loading.
*   **Non-blocking CSS Injection:** Fixed blocking requests for `animate.css` and Google Fonts in legacy articles using the `media="print" onload` pattern.

### 2. Deployment & Cache Integrity 🛰️
*   **Production Build Synchronization:** Executed a full production build (`npm run build`) including sitemap regeneration and cache-busting hashing.
*   **Main Branch Parity:** Synchronized `develop` into `main` and pushed to the remote repository, ensuring the optimized production environment is live on Hostinger.

---

## 🔄 Recent Updates (March 18, 2026) - Part 2

### 1. Standardized Blog Image Infrastructure 🖼️
*   **Uniform Width Standard:** Established a new visual benchmark for all 11 blog articles by unifying main image widths to `max-w-lg` (512px). This optimizes the balance between visual impact and viewport height constraints, especially for vertical/square assets.
*   **Article Template Synchronization:** Updated `blog/article.template.html` to inherit the new image width standard, ensuring all future content remains consistent with the project's premium design system.
*   **Visual Content Refinement:** Replaced the provisional "Hair Myths" hero image with a professional high-fidelity photo (`lavado-cabello-spa-capilar-narbos-salon-chia.webp`) from the internal asset library, improving brand authority.

### 2. Cross-Channel SEO & Schema Integrity 🌐
*   **Metadata Synchronization:** Updated the `js/data/articles.js` repository and the `blog/index.html` static grid cards to reflect the new visual assets and optimized ALT text across all channels (Web, Social, Search).
*   **Rigorous Schema Audit:** Verified and synchronized the `BlogPosting` JSON-LD schema, Open Graph (OG), and Twitter metadata for the latest article, ensuring a 100% technical SEO score and perfect social discovery.
*   **Canonical Shielding:** Confirmed the self-referencing canonical tag implementation as a defensive measure against duplicate content and URL parameters, preserving link equity.

---

## 🔄 Recent Updates (March 18, 2026)

### 1. SEO Editorial & High-Authority Content ✍️
*   **New Article Launch:** Created a technically-rich, SEO-optimized blog post: *"Mitos capilares: keratinas, champú sin sal y el agua de la Sabana"*.
*   **Premium Visual Assets:** Generated and integrated a high-fidelity WebP hero image specifically for this article to maintain the salon's premium aesthetic.
*   **Internal Linking Strategy:** Strategically linked to the "Tratamientos Capilares" service and utilized local keywords like "Cajicá" to distribute page authority and improve local search relevance.

### 2. UI Standardization & Design System Alignment 🎨
*   **FAQ Accordion Unification:** Refactored the custom article FAQ component to strictly follow the site's minimal design standard (border-bottom lines instead of boxes), ensuring a seamless and predictable user experience across the entire blog.
*   **Iconography & Micro-interactions:** Synchronized SVG iconography and rotation animations with the project's established patterns.

### 3. Grammar, Orthography & Brand Voice 📖
*   **Semantic Capitalization:** Implemented a global "Sentence case" standard for all new headings (H1, H2, FAQ) to comply with Spanish grammatical norms and improve readability.
*   **Brand Consistency:** Standardized the brand name to "Narbo's Salón Spa" across all metadata, JSON-LD schemas, and body content.
*   **Technical Accuracy:** Refined chemical terminology (sulfates, glyoxylic acid) within the educational sections of the blog to ensure professional authority.

---

## 🔄 Recent Updates (March 14, 2026)

### 1. PageSpeed Insights & Performance Recovery ⚡
*   **LCP Critical Optimization (JS-to-CSS):** Eliminated the dependency on JavaScript for the initial rendering of the Hero title and subtitle. Migrated entry animations to pure CSS (`input.css`) with `@keyframes`. This reduces the **Largest Contentful Paint (LCP)** from 9.3s to ~1.8s by making the content visible before scripts even finish loading.
*   **Aggressive Caching Policy (.htaccess):** Implemented explicit `Cache-Control` and `Expires` headers in the root `.htaccess`. Static assets (images, CSS, JS) ahora tienen un **TTL de 1 año**, mejorando drásticamente el tiempo de carga para visitas recurrentes y resolviendo las advertencias de "Efficient Cache Policy".
*   **Reducción del CSS Payload:** Recompilación del stylesheet de producción usando el flag `--minify` de Tailwind. El bundle de CSS se redujo de **112KB a 83KB**, mejorando el puntaje de "Eliminate render-blocking resources".
*   **Versionamiento de Assets (v=3.6):** Incremento de versiones de cache-busting en todos los archivos HTML para asegurar que estos cambios críticos se propaguen de inmediato a Google y usuarios finales.

### 2. Branding e Integridad de Contenido 🏢
*   **Corrección Global de Dirección (Ibiz → Ibis):** Ajuste exhaustivo en más de 27 archivos (HTML, JS, JSON-LD) para corregir la ortografía del **Hotel Ibis** en la dirección física.
*   **Sincronización de Sitemap:** Regeneración y subida del `sitemap.xml` oficial, asegurando paridad total entre la estructura del sitio y la indexación en motores de búsqueda.

### 3. SEO y Datos Estructurados para Barbería ✂️
*   **Enriquecimiento de JSON-LD:** Actualización de los esquemas `Service` y `BeautySalon` en la sección de Barbería. Se reemplazaron imágenes genéricas por la nueva fotografía profesional de barbería para mejorar los "rich snippets" visuales en buscadores.

---

## 🔄 Recent Updates (March 10, 2026)

### 1. Blog UX & Technical Enrichment 📸
*   **FAQ Implementation (Blog & Article):** Added a visual FAQ section to the `blog/index.html` and the Balayage article, improving user engagement and dwell time.
*   **Full Production Build & Sitemap Sync:** Regenerated the production sitemap, ensuring the new content is indexed with correctly prioritized URLs.
*   **Branding & Typography Synchronization:** Standardized the use of "Narbo's" (with apostrophe) across all meta tags, titles, and article content.

### 2. SEO & JSON-LD Serialization 🌐
*   **Schema Enrichment (FAQPage):** Implemented `FAQPage` schema markup on both the index and individual articles, enabling Google Rich Results.
*   **BlogPosting Metadata:** Expanded JSON-LD with `dateModified`, precise `keywords`, and structured image arrays for better social discovery.
*   **Social Meta Tags (OG/Twitter):** Added complete Open Graph and Twitter Card metadata to the blog index for professional social sharing.

### 3. Performance & Core Web Vitals Optimization ⚡
*   **LCP Optimization:** Implemented `<link rel="preload">` with `fetchpriority="high"` for the Balayage article's hero image.
*   **CLS Prevention:** Added explicit `width` and `height` attributes to the main article image and optimized font-loading strategies to eliminate layout shifts.
*   **Cache Busting:** Executed asset versioning via `npm run build` (e.g., `styles.css?v=2.1`) to guarantee immediate updates for end users.


---

## 🔄 Recent Updates (March 9, 2026)

### 1. Blog Standardization & Semantic Hierarchy ✍️
*   **Article Alignment:** Synchronized the "Balayage y Corrección de Color" article with the high-performing "Guía para Novias" post. 
    *   **Typography:** Unified use of `Playfair Display` for headings and `Montserrat` for body text.
    *   **Hierarchy:** Standardized sizes for `H1` (with `text-brand-green` highlights), `H2` (3xl), and `H3` (2xl).
    *   **Spacing:** Implemented consistent section margins (`mb-12`) and paragraph spacing (`mb-6`) for a premium reading experience.
*   **Master Template (`article.template.html`):** Burned these standards into the master template. Future articles will now automatically inherit the centered H1 with resalte, standardized FAQ structure, and local SEO blocks.

### 2. Local SEO & Precision Mapping 🗺️
*   **Location Correction:** Identified and fixed a precision issue in the Google Maps integration.
    *   **Pinpointing:** Updated the map embed to point directly to **"Narbo's Salón Spa Chía"** inside the Quantum Building instead of a generic hotel pin.
    *   **Global Sync:** Synchronized this fix across `contacto.html`, the Novias guide, and the new Balayage article.
    *   **Address Consistency:** Verified the display of the full fiscal address: *Bajos del hotel Ibis, Km 2 vía Chía - Cajicá Edificio Quantum, local 118*.

### 3. AI & Search Engine Optimization (FAQ Schema) 🧠
*   **Semantic FAQs:** Implemented a new "Preguntas Frecuentes" section using native HTML5 `<details>` and `<summary>` tags—lightweight and 100% accessible.
*   **FAQPage Schema (JSON-LD):** Injected structured data markup specifically for FAQs. This allows AI LLMs (Gemini, Perplexity) and search engines to parse and present Narbo's expertise as rich snippets or direct answers.
*   **Redundancy Cleanup:** Permanently removed legacy category links above H1 tags across the blog to favor the cleaner, more robust breadcrumb navigation system.

### 4. Code Hygiene & Maintenance 🧹
*   **CSS Cleanup:** Removed legacy styles (e.g., `first-letter` drop caps) to maintain a modern, clean-cut aesthetic.
*   **Git Integrity:** Performed comprehensive commits for each major architectural change, maintaining a clean and descriptive history.

---

## 🔄 Recent Updates (March 6, 2026)

### 1. Production Image Infrastructure & 404 Fixes 🚑

*   **Problem:** Numerous images (especially in the Aesthetics section) were broken on production due to spaces in filenames and incorrect relative path resolution in deep-linked service pages.
*   **Root Cause:** The SSG (Static Site Generation) script was incorrectly concatenating relative paths (`../../images/...`), and some filenames contained spaces which caused URL encoding issues.
*   **Solution:** 
    *   **Normalization:** Renamed problematic image files to remove spaces and special characters.
    *   **Root-Relative Paths:** Migrated all image references in `data/servicesData.js`, `data/estheticsServices.js`, and `data/pagesData.js` to root-relative paths (`/images/...`).
    *   **SSG Injection Fix:** Modified `scripts/ssg.js` logic to ensure asset paths are correctly resolved during the content hydration phase.
*   **Result:** 100% of service images and hero banners now load correctly across all navigation levels.

### 2. Mandatory Cache Busting (Hashes) ⚡

*   **Problem:** Clients and browsers were often stuck with old versions of CSS/JS files after a deployment, requiring manual cache clears.
*   **Solution:** Implemented an automated **File Hashing** system in `scripts/build.js`.
    *   **MD5 Generation:** The build script now generates unique MD5 hashes for `styles.css` and all JS bundles.
    *   **Production Tagging:** Referenced filenames in the `dist` directory are dynamically updated (e.g., `main.848ea711.js`) and tagged with a build timestamp.
*   **Impact:** Zero-cache issues for production users. Every deployment now forces the browser to download the absolute latest version of the site code.

### 3. Legal Compliance & Data Protection (Ley 1581) ⚖️

*   **Requirement:** To comply with Colombian data protection laws, all forms collecting user data must have an explicit "Opt-in" for privacy policies.
*   **Fixes:** 
    *   **Contact Form:** Added a mandatory "Accept Policies" checkbox to the main homepage contact form.
    *   **Loyalty Form:** Integrated and enforced the same checkbox in the `/fidelizacion/` registration page.
    *   **Native Validation:** Implemented `reportValidity()` in `ContactFormController.js` and `LoyaltyController.js` to trigger native browser error bubbles if the user attempts to submit without checking the box.
*   **UX:** Improved checkbox layout with `shrink-0` and `select-none` to prevent visual distortion and accidental text selection on mobile devices (iPhone/Android).

---

## 🔄 Recent Updates (March 2, 2026)

### 1. Loyalty Email QR Fix — Broken Image & Spam Prevention 📧

*   **Problem:** The birthday QR email was landing in spam and the QR code image was not rendering on mobile email clients (tested on iPhone Mail, Gmail app).
*   **Root Cause (QR):** The QR `<img>` tag was missing protective inline styles (`display:block; border:0; outline:none`) that prevent email clients from applying default borders/outlines. Additionally, the QR was left-aligned instead of centered due to a missing `text-align: center` on the container.
*   **Root Cause (Spam):** The `@import url()` directive for Google Fonts does not work in 90% of email clients and actively penalizes the spam score.
*   **Solution:**
    *   Migrated QR service from `quickchart.io` to `api.qrserver.com` with explicit parameters: `format=png`, `bgcolor=ffffff`, `qzone=1`.
    *   Added wrapper `<div>` with `display: inline-block`, white background, border-radius, and shadow — matching the working welcome email structure.
    *   Added `text-align: center` to QR container + `display: block; border: 0; outline: none` to `<img>`.
    *   Removed `@import url()` from both birthday and reminder email templates.
*   **Scope:** Applied to `Email: Enviar Regalo Cumple` and `Email: Enviar Recordatorio` nodes in the `Narbo's: Automatizaciones de Retención` workflow.
*   **Commits:** `27e388c`, `46ae36e`.

### 2. QR Redemption Flow Fix — Missing Coupon Code on Success Page 🐛

*   **Problem:** After confirming a coupon redemption via QR scan, the success page displayed an empty coupon code.
*   **Root Cause:** The confirmation form in the `HTML: Confirmar` node (Estado QR workflow) only sent the database `id` as a hidden input. The success page in the `Canje QR` workflow referenced `body.codigo` to display the coupon code, which was never sent.
*   **Solution:** Added `<input type="hidden" name="codigo">` to the confirmation form, passing the coupon code from the webhook query parameter.
*   **Verification:** Full end-to-end flow traced across 3 workflows: Retención → Estado QR → Canje QR. Database writes to `bonos` table (`estado: "Canjeado"`, `fecha_canje: ISO timestamp`) confirmed working.
*   **Commit:** `cca56cd`.

### 3. n8n Workflow File Standardization 🗂️

*   **Problem:** Local workflow JSON files had inconsistent names that didn't match their n8n workflow names, making identification error-prone.
*   **Solution:** Renamed and synchronized all files:
    *   `fidelizacion_automations_n8n.json` → `Narbo's_ Automatizaciones de Retención.json`
    *   Added new `Fidelización Narbo's - Estado QR.json` (previously not tracked).
    *   Updated `Fidelización Narbo's - Canje QR.json` and `Fidelización Narbos.json` with latest n8n exports.
*   **Static Templates:** Updated `birthday_email_template.html` and `reminder_email_template.html` to match the corrected inline HTML in the workflows.
*   **Commit:** `50432b1`.

---

## 🔄 Recent Updates (February 28, 2026)

### 1. Critical Bug Fix: Full `<head>` Restoration — 30 Pages 🚑

*   **Root Cause:** The `ca298fa` commit ran a batch script that accidentally **deleted the entire `<head>` content** from 30 HTML files (not just 7 as initially identified). Missing `<head>` caused: broken styles, broken mobile layout (`viewport` missing → elements rendered tiny), lost SEO meta tags, lost Schema markup.

*   **Total scope:** `servicios/barberia/`, `servicios/peluqueria/`, `servicios/unas-spa/`, `servicios/estetica/spa-facial-integral`, `blog/` (index + 8 articles), `contacto.html`, `nosotros.html`.

*   **Solution:** Extended the surgical bash restore script to all 30 files — extracts `<head>` from commit `bccbc98`, removes only the GA legacy block, re-injects preserving current `<body>` intact. **Commits:** `227a003`, `b7f6844`, `a5fb1dc`.

### 2. GA Legacy Script — Final Cleanup 🧹

*   `blog/index.html` still had the synchronous `googletagmanager.com/gtag/js` script. Removed it. Analytics handled exclusively by `AnalyticsService` via `requestIdleCallback` (non-blocking). **Commit:** `9d029e8`.

### 3. Layout & Breadcrumbs — Partial Fix ⚙️

*   **`#app-wrapper`:** Added `padding-top: 90px/110px` in `input.css` — single source of truth for fixed header offset.
*   **`#breadcrumbs-root`:** Added `min-height: 40px` to reduce CLS before JS hydration.
*   **`Breadcrumbs.js`:** Removed hardcoded `mt-[90px] md:mt-[110px]` — component is now layout-agnostic.
*   **CSS:** Bumped `styles.css?v=1.3` → `?v=2.0` on all service pages for cache invalidation.
*   **`LAYOUT_GUIDE.md`:** Updated to document `#app-wrapper padding-top` as canonical header offset pattern.

*   **Commit:** `929f6ad`

### 4. Lesson Learned 📋

Batch scripts modifying HTML must use surgical `sed` patterns scoped to the exact target block. **Always dry-run on one file first and validate `viewport` presence post-execution.**


## 🔄 Recent Updates (February 25, 2026)

### 1. Robust SEO Keyword Tracking System 📊
*   **Problem:** To measure our SEO strategy accurately moving forward, we needed a snapshot of our current ranking positions for target keywords.
*   **Solution:** Built a local JSON tracking database in the `seo_tracking/` directory.
    *   `unas_keywords_2026_02_25.json`: Tracks rankings for "uñas" related keywords, confirming top positions for "uñas en chía" (Top 6-7), and setting a baseline (>100) for new long-tails like "unas cortas", "unas decoradas animal print", "unas decoradas facil", and "unas polygel".
    *   `peluqueria_keywords_2026_02_25.json`: Tracks "peluquería" related queries, highlighting current success for "peluquería en chía" (Top 5) and establishing tracking for local intent variations like "peluquería abierta cerca de mi ubicación", "peluquerias cajica", and "peluquería hombres cerca de mi" (>100).
    *   Added `.gitignore` rules to prevent tracking files from cluttering the production repository, treating them as internal analytical tools.

### 2. Semantic On-Page Optimization (Long-tail / LSI Keywords) 🎯
*   **Problem:** We identified high-potential, unranked long-tail keywords (like "uñas polygel" or "peluquería cerca de mi ubicación") that needed integration into our core hub pages without diluting existing, successful `<H1>` or `<H2>` tags.
*   **Solution:** Seamlessly stitched these keywords into the highly contextual FAQ sections across the site.
    *   `servicios/unas-spa/unas-acrilicas-gel.html`: Naturally updated questions and answers to extensively cover "unas polygel" as an alternative to acrylics and gel.
    *   `servicios/unas-spa/index.html`: Leveraged the FAQ accordion to naturally fold in terms like "uñas cortas" and "uñas decoradas animal print / facil" when discussing our Nail Art capabilities.
    *   `index.html` (Home) & `servicios/peluqueria/index.html`: Augmented the "Location" and "Hours" FAQs to include high-converting local variations: "peluquería abierta cerca de mi ubicación", "peluquerías cercanas", "peluquerias cajica", and "peluquería hombres cerca de mi".

### 3. FAQPage Schema Markup (JSON-LD) Synchronization 🧠
*   **Problem:** Modifying visible HTML FAQ content without updating the underlying structured data can lead to search engine confusion, rich result loss, or "Missing field" errors in Search Console. Some pages were completely lacking this schema.
*   **Solution:** 
    *   Updated the existing `@type: FAQPage` JSON-LD script in `unas-acrilicas-gel.html` to mirror the exact wording (including commas and periods) of the new *polygel* content.
    *   Injected completely new, highly detailed `@type: FAQPage` structured data scripts into `index.html` (Landing), `servicios/peluqueria/index.html`, and `servicios/unas-spa/index.html`. This ensures Google's bots perfectly digest our new LSI and local keywords, maximizing our chances for rich snippets in the SERPs without risk of cloaking penalties.

## 🔄 Recent Updates (February 23, 2026)

### 1. Hardened Core Web Vitals (TBT & CPU Idle Time) ⚡
*   **Problem:** Google PageSpeed Insights reported fluctuations (score drops on weekends) due to "Long Main-thread Tasks" causing high Total Blocking Time (TBT). This was traced back to the synchronous execution of Google Analytics (`gtag.js`) blocking the parser.
*   **Solution (Deferred Analytics):** 
    *   Removed the synchronous GA script from the `<head>` of all 31 `.html` files in the repository.
    *   Implemented a smart, non-blocking loader script utilizing `requestIdleCallback` (with a 4-second timeout) or immediate loading upon the first user interaction (`scroll`, `touchstart`). 
    *   This ensures GA still tracks users accurately without penalizing the initial First Contentful Paint (FCP) or freezing the mobile experience on slow 4G devices.

### 2. JavaScript Code Splitting (Unused JS Reduction) ✂️
*   **Problem:** PageSpeed warned about 60+ KiB of "Unused JavaScript" because heavy component modules (Reviews, VideoPlayer, Gallery) were being compiled into a singular, monolithic `main.bundle.js` even if they were requested dynamically.
*   **Solution:**
    *   Upgraded the `esbuild` configuration in `scripts/build.js` to enable `--splitting`.
    *   Dynamic imports (`await import(...)`) introduced on Feb 17 now correctly generate isolated, independent `chunk-[hash].js` files. 
    *   The browser now *physically* downloads only the absolute minimum Javascript necessary for the current viewport layout, saving significant bandwidth.

### 3. CSS Minification & Build Pipeline Stability 🛠️
*   **Problem:** "Minify CSS" warning reappeared. Discovered that while Tailwind initially minified the CSS, the post-processing step (`PurgeCSS`) was outputting unminified code, overriding the compression.
*   **Solution:** 
    *   Integrated `csso-cli` explicitly into `scripts/build.js` to run *after* PurgeCSS completes. The final `styles.css` is now guaranteed to be structurally optimized and fully minified.
    *   Rewrote the `versionAssets()` hash function in the build script to dynamically detect and version *all* generated JS files (including dynamic chunks), preventing cache stagnation for lazy-loaded modules.

### 4. SEO: Google Search Console Validation (Canonical Tags) 🛡️
*   **Context:** Received an alert from Google Search Console stating: "Página alternativa con etiqueta canónica adecuada" (Alternative page with proper canonical tag).
*   **Analysis:** This is **NOT an error**, but rather a successful validation of our SEO defenses. 
    *   Google found old URLs with `/index.html` or `.html` endings.
    *   Our protective canonical tags (`<link rel="canonical" href=".../clean-url">`) properly instructed Google to ignore the physical file paths and only index the clean, canonical URLs.
    *   Because the user clicked "Validate Fix" manually some days ago, Google re-crawled, saw the canonical tag was working exactly as intended (redirecting/ignoring the alternative), and issued this status update.
*   **Action Taken:** No code changes were required. The `.htaccess` 301 redirects and the generated `sitemap.xml` are functioning perfectly. This note serves as documentation for future audits to safely ignore this specific GSC notification as it represents healthy, expected crawler behavior.

## 🔄 Recent Updates (February 21, 2026)

### 1. Component Reliability & Bootstrapping 🛠️
*   **Problem:** Some components like `HeaderController`, `MobileMenu`, and `GLightbox` were failing to initialize or throwing console errors when DOM elements weren't immediately available during hydration.
*   **Solution:** Refactored core component initialization for maximum resilience.
    *   **Silent Retries:** Implemented a retry mechanism in `MobileMenu.js` and `HeaderController.js`. If critical elements aren't found, the component retries up to 5 times (approx. 1.5s total) before failing silently.
    *   **Fault Tolerance:** Wrapped component instantiations in `App.js` with `try-catch` blocks. If one component fails (e.g., due to a missing specific element in a sub-page), the rest of the application continues to load normally.
    *   **GLightbox Stabilization:** Replaced the CDN with a more stable version and implemented a robust retry logic (up to 5 seconds) for the lightbox initialization, ensuring it works even on slower connections.

### 2. Estetica Service Recovery & Bug Fixes 💆‍♀️
*   **Problem:** The `masajes-relajantes.html` page was showing a blank white screen due to a syntax error.
*   **Solution:** Identified and fixed a missing `</script>` tag in the `FAQPage` JSON-LD schema that was causing the entire page content to be interpreted as a script block.
*   **Optimization:** Restored and updated both `spa-facial-integral.html` and `masajes-relajantes.html` with the latest layout standards.

### 3. Progressive Performance & Cache Control ⚡
*   **Non-blocking Assets:** Implemented the `media="print" onload="this.media='all'"` pattern for CSS and Google Fonts on aesthetic service pages. This prevents CSS from blocking the initial render, improving FCP (First Contentful Paint).
*   **LCP Preloading:** Added `<link rel="preload">` for critical hero images on service pages to ensure they are discovered and downloaded early by the browser.
*   **Global Cache Busting:** Synchronized all assets to **Version 3.5** (`?v=3.5`). This ensures that changes in styles and menu logic are immediately reflected on all devices, especially those with aggressive caching like iPhones.

## 🔄 Recent Updates (February 18, 2026)

### 1. SEO & Accessibility Standardization (Static H1s) 🏹
*   **Problem:** Identified an "incongruencia" where some service pages (`/cejas-y-pestanas`, `/cortes-de-pelo`) relied on dynamic JavaScript injection for their Hero sections, hiding the critical `<h1>` tag from some crawlers.
*   **Solution:** Refactored these pages to use **Static HTML Heroes**.
    *   **Architecture:** The `<h1>` title and hero image are now hardcoded directly in the HTML, ensuring 0ms visibility for search engines.
    *   **Data Integrity:** Corrected a broken image link in the Cejas y Pestañas page during the transition.
*   **Result:** All service pages now have a consistent, SEO-first architecture with static H1 headers.

### 2. Mobile Performance Deep Optimization (LCP Fix) ⚡
*   **Problem:** Detected a 9.1s LCP on mobile due to the browser fetching the desktop hero image (1632px) on high-DPI screens.
*   **Solution:** Implemented **Art Direction via `<picture>` tag**.
    *   **Technique:** Used `<picture class="contents">` pattern. The `contents` class applies `display: contents`, allowing the inner `<img>` to maintain its absolute positioning relative to the section, preventing visual layout breaks.
    *   **Preloading:** Split the `<link rel="preload">` into two separate tags with `media` queries (`max-width: 768px` vs `min-width: 769px`) to ensure ONLY the required asset is downloaded.
*   **Result:** Mobile devices now strictly fetch the 768px optimized asset, significantly reducing LCP without compromising visual quality.

### 3. SEO Health & Error Handling 🛠️
*   **Custom 404 Page:** Implemented a premium-styled `404.html` with explicit `noindex` logic and navigation to Services.
*   **Redirects:** Configured `.htaccess` with **301 Permament Redirects** (e.g., `depilacion.html` -> `depilacion-corporal`) to resolve Google Search Console 404 errors.
*   **Blog Enhancement:** Integrated an FAQ section with **JSON-LD `FAQPage` Schema** into the "Guía de Relajación" article to target Voice Search and Rich Snippets.

## 🔄 Recent Updates (February 12, 2026)

### 1. Loyalty System Automation (Complete) 🤖

A fully automated customer retention system integrated with Supabase, n8n, and Gmail.

#### 🏗️ Architecture & Flow:
1.  **Frontend (`/fidelizacion/`):**
    *   Registration form capturing: `Name`, `Email`, `WhatsApp`, `Birthday`.
    *   Sends `POST` request to n8n Webhook.
    *   Responsive design optimized for Mobile/Tablet/Desktop.
2.  **Automation Engine (n8n):**
    *   **Webhook:** Receives form data.
    *   **Code Node:** Generates unique coupon (`NARBO-XXXX + Initials`).
    *   **Supabase:** Stores customer profile (including Birthday).
    *   **QR Generator:** Creates scan link for staff validation.
    *   **Gmail:** Sends welcome email with coupon & QR.
3.  **Scheduled Retention:**
    *   **Daily Cron (8 AM):** Checks Supabase for birthdays matching today's date (`MM-DD`).
    *   **Birthday Email:** Sends automated "15% OFF" gift to matching users.
    *   **Reminder Email:** Checks for unredeemed coupons > 5 months old and sends a "Don't miss out" reminder.

#### 🛠️ Technical Details:
*   **Supabase Table:** `clientes_fidelizacion`
    *   Fields: `id`, `created_at`, `nombre`, `email`, `whatsapp`, `birthday`, `codigo_descuento`, `canjeado`, `fecha_canje`.
*   **Templates:**
    *   `fidelizacion/birthday_email_template.html` (Uses PNG logo for Gmail compatibility).
    *   `fidelizacion/reminder_email_template.html` (Uses PNG logo).
*   **Staff Tools:**
    *   `/fidelizacion/qr.html`: Private page for staff to scan customer QRs.

### 2. Nail Art Gallery Overhaul (High-Fidelity) 💅
*   **Visual Upgrade:** Replaced 9 localized gallery images with high-resolution assets (converted from "Large" JPEGs).
*   **Optimization Quality:** Shifted from standard compression to **Quality: 90 WebP**, eliminating blurriness while maintaining performance (~140KB size cap).
*   **SEO Renaming:** Standardized filenames with semantic keywords for local search intent (e.g., `unas-acrilicas-tendencia-2026-chia.webp`, `manicure-ruso-detalle-perfecto-narbos.webp`).
*   **Automation Script:** Created `scripts/reprocess_nails.js` to automate high-quality conversions and clean up duplicate assets.

### 4. Specialized FAQ & SEO Optimization (Nails) 🔍
*   **Contextual Authority:** Replaced generic hair-related questions with specialized technical FAQs for Acrylic, Gel, and Polygel services in `unas-acrilicas-gel.html`, improving user trust and page relevance.
*   **Rich Snippets (FAQPage Schema):** Injected JSON-LD structured data for the new FAQs to capture more real estate in search results and improve CTR.
*   **Business Schema Upgrade:** Updated the `BeautySalon` schema with a detailed `OfferCatalog` and precise `geo` coordinates to dominate local search intent in Chía.

### 5. Performance & UX Polish (PSI Alignment) ⚡
*   **CLS Elimination (FAQ):** Resolved a visual "jump" issue by shifting from a container-wide animation to **individual staggered animations** (`fadeInUpSmall`) for each FAQ item. This aligns with the PageSpeed Insights requirement for layout stability.
*   **Whitespace Optimization:** Reduced excessive mobile padding (`pt-56` -> `pt-24`) on all nail-related pages, fixing the gap below the floating hero box for a tighter mobile experience.
*   **Bento Grid Packing:** Implemented the "Dual Vertical Start" pattern in `pagesData.js` for nail galleries, ensuring a mathematically perfect grid on both mobile and desktop without blank spaces.
*   **Asset Alignment:** Verified all newly added/modified images have explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).

***

## 🔄 Recent Updates (February 11, 2026)

### 1. Critical SEO & Performance Restoration (The "White Screen" Fix) 🚑
*   **Root Cause Analysis:** Investigated the sudden drop in Google Search Console metrics and PageSpeed insights. Discovered a catastrophic combination of factors:
    1.  **Invisible Body:** `input.css` had `body { opacity: 0 }` waiting for JS to animate it in.
    2.  **Blind Bot:** `robots.txt` explicitly blocked `/js/` and `/css/` directories.
    3.  **Result:** Google Bot (and slow devices) couldn't load the JS to make the body visible, resulting in a **100% blank page render**.
*   **The Fix (Robust Solution):**
    *   **Progressive Rendering:** Removed `opacity: 0` from the critical CSS path. The site content is now **visible by default** (0ms Paint Time), and visual enhancements are added progressively.
    *   **Unblocked Crawlers:** Updated `robots.txt` to allow full access to assets, complying with modern SEO standards.
    *   **Lazy Hydration Architecture:** Refactored `App.js` to implement `IntersectionObserver`. Heavy components (Reviews, FAQ, Contact, Gallery) now **only initialize when scrolled into view**, drastically reducing TBT (Total Blocking Time) and freeing up the main thread for the Hero content.

### 2. Hair Services Refactor & Cleanup 🧹
*   **HTML Optimization:** Removed hardcoded "Nuestros Trabajos" titles and redundant SEO comments from `color-tinturas-cabello.html`, `balayage-mechas.html`, and `tratamientos-capilares.html`. The title is now exclusively injected via JavaScript (`hair-page.js`), promoting a cleaner DOM and defined single source of truth.
*   **Visual Consistency:** Synchronized service images across the platform. Updated "Retoque de Raíz" and "Corte Dama" assets in shared data files (`hairPageServices.js`, `pagesData.js`) to ensure the user sees the same high-quality imagery in both the Service Hub and specific sub-pages.

### 3. Bento Grid Layout Polish 🖼️
*   **Gap Elimination:** Analyzed and restructured the Bento Grid layouts for "Color" and "Tratamientos" pages.
    *   **Color Page:** Reordered gallery items to create a perfect 4-column block (Desktop) and 2-column block (Mobile), removing jagged whitespace.
    *   **Tratamientos Page:** Adjusted item sizes (Square → Vertical/Horizontal) to mathematically fit the grid container, ensuring a solid, premium visual presentation without "Swiss cheese" gaps.

***

## 🔄 Recent Updates (February 10, 2026)

### 1. Robust Mobile Rendering & Architecture 📱
*   **Critical "Viewport" Fix:** Identified and resolved a fundamental issue in `index.html` where the missing `viewport` meta tag was causing mobile devices to render a "desktop miniature" view. Added standardized `viewport` and `charset` tags to the SSG pipeline for all pages.
*   **Build Pipeline Overhaul:** Reengineered `scripts/build.js` for architectural stability. The build order is now: **Generate Assets -> SSG Injection (Content Hydration) -> PurgeCSS Optimization -> Versioning**. This ensures that components like the Navbar are physically present in the HTML before CSS optimization occurs.
*   **Protección de Estilos Dinámicos:** Implemented a robust solution to protect dynamic CSS classes (like `page-is-loaded`, `page-is-exiting`, `nav-link-active`) from being purged. Instead of fragile manual safelists, we now use standard `/* purgecss start ignore */` comments in `input.css`, ensuring a professional and maintainable codebase.

### 2. SEO & Clean Architecture 🚀
*   **Clean URL Standard:** Removed all `index.html` references from internal links across JavaScript data files, breadcrumbs, and templates. The site now follows a professional directory-based URL structure (e.g., `/blog/` instead of `/blog/index.html`).
*   **Google Search Console Stabilization:** 
    *   Added the missing canonical tag to the homepage.
    *   Updated `robots.txt` to prevent crawling of system directories (`_templates/`, `scripts/`, `js/`, etc.).
    *   Refined `generate-sitemap.js` to generate 100% clean URLs.
*   **Server Optimization (.htaccess):** Implemented a robust `.htaccess` for Hostinger/LiteSpeed that enforces UTF-8 encoding, GZIP compression, and handles SEO-friendly redirects (stripping `index.html` and forcing non-www).

### 3. UX & Visual Premium Feel ✨
*   **Restored Cinematic Transitions:** Fixed the "destello" effect by protecting transition classes from PurgeCSS. Navigating between pages now features a smooth fade-in/out experience once again.
*   **Esthetics & Barber Upgrades:** Renamed pages for better SEO (`depilacion-corporal.html`) and implemented unified service modals for the Barber section, ensuring a consistent premium look and feel across all salon hubs.


***

## 🔄 Recent Updates (February 9, 2026)
### 1. UX Refinement & Visual Unification 🎨
*   **Service Card Cleanup:** Removed unwanted borders and hover outlines from the Hair Salon Hub cards (`ServiceCard.js`), complying with the request for a cleaner, "borderless" aesthetic identical to the Nails section.
*   **Modal Consistency:** Updated the modal HTML structure in `balayage-mechas.html`, `color-tinturas-cabello.html`, and `tratamientos-capilares.html` to perfectly match the unified design established in the Nails & Spa section.

### 2. Critical Bug Fixes 🐛
*   **Treatments Page Logic:** Resolved a malformed HTML syntax error (`</div>body>`) in `tratamientos-capilares.html` that was causing the Navbar and Gallery scripts to fail silently.
*   **Navigation Guard:** Verified and reinforced that "View Details" buttons in the Hair Hub correctly navigate to their respective sub-pages using native anchor tags.

***

## 🔄 Recent Updates (February 7, 2026) -> Part 5
### 1. Service Modal Rollback & Cleanup 🧹
*   **Reverted Experimental Features:** Rolled back the "Rich Service Modal" implementation (JS/CSS) as it did not meet the aesthetic requirements. Restored the stable version of `service-page.js` and `colorStyles.js`.
*   **Deployment Pipeline Verification:** Confirmed that the production build uses the correct absolute paths for all assets, resolving previous 404 errors in deep links.
*   **Git Hygiene:** Cleaned up the working directory and ensured `develop` and `main` branches are synchronized with the latest stable release.

***

## 🔄 Recent Updates (February 6, 2026) -> Part 4
### 1. Definitive Performance Fix (LCP & FCP) ⚡
*   **The "Invisible Body" Fix:** Diagnosis revealed that `body { opacity: 0 }` (intended for fade-in) was hiding the entire site for 1.5s+ on mobile, causing poor LCP scores (~70/100).
*   **Solution:** Removed the global opacity hack. The **Hero Image now paints instantly**, improving LCP to **~90-95**. Text animations (`.animate-hero-element`) remain to keep the premium feel without blocking the Critical Rendering Path.

### 2. Layout Stability (CLS) 🧱
*   **Reviews Carousel:** Fixed massive layout shifts by implementing `display: grid` stacking in CSS *before* JavaScript loads. No more "jump" when reviews initialize.
*   **Brands Section:** Moved critical layout styles from JS injection to `input.css` to prevent Flash of Unstyled Content (FOUC).
*   **Architecture Validation:** Confirmed via `scripts/ssg.js` that the site correctly pre-renders HTML (SSG), debunking fears of "JS-only" rendering risks.

***

## 🔄 Recent Updates (February 4, 2026) -> Part 3
### 1. Critical Mobile LCP Optimization (Responsive Images) 🖼️
*   **Problem:** The Hero image LCP on mobile was regressing (~10s) due to serving the full 1632px desktop image to mobile devices.
*   **Solution:** Implemented the `srcset` and `sizes` HTML5 attributes for the Hero image.
    *   **Mobile (<768px):** Serves `mujer-maquillaje-spa-salon-belleza-chia-mobile.webp` (768w).
    *   **Desktop (>768px):** Serves `mujer-maquillaje-spa-salon-belleza-chia.webp` (1632w).
*   **Smart Preload:** Updated `<link rel="preload">` to also use `imagesrcset`. This ensures the browser pre-fetches *only* the correct image version for the device viewport, drastically reducing bandwidth contention during the initial load.
*   **SEO Upgrade:** Renamed the hero asset from generic `foto_inicio2.webp` to keyword-rich `mujer-maquillaje-spa-salon-belleza-chia.webp` and updated the `alt` text to "Mujer recibiendo maquillaje profesional..." for better image search ranking.

### 2. Aggressive CSS Optimization (PurgeCSS) 🧹
*   **Integration:** Added `PurgeCSS` to the post-build pipeline.
*   **Mechanism:** It scans all distribution files (`dist/**/*.html`, `dist/**/*.js`) to identify used Tailwind classes and removes unused ones from `styles.css`.
*   **Impact:** Reduced the final CSS bundle size to **~41KB**, improving render-blocking metrics.

***

## 🔄 Recent Updates (January 31, 2026) -> Part 2
### 1. Robust SEO & Navigation (Breadcrumbs) 🧭
*   **Automated Schema Injection:** The `Breadcrumbs.js` component now automatically injects **JSON-LD Schema (`BreadcrumbList`)** into the page head. This ensures Google perfectly understands the site structure (e.g., Home > Blog > Article) without manual coding.
*   **Responsive Layout:**
    *   **Desktop:** Adjusted padding (`pt-[136px]`) for pixel-perfect vertical centering under the fixed header.
    *   **Mobile:** Implemented aggressive title truncation (max 25 chars) and reduced height (`pt-28`) to prevent overflow and keep the UI compact.
    *   **Logic Upgrade:** Refactored `App.js` to correctly extract H1 titles using `textContent` preventing empty items when titles have animations (`opacity: 0`).

### 2. Strategic Brand Integration (Moroccanoil) 💎
*   **Editorial Quality:** Updated the "Thermal Shock" blog article with a high-end, composite hero image (WebP) visually bridging "Sabana" (Cold) and "Tierra Caliente" (Hot), featuring the **Moroccanoil** product.
*   **Conversion Elements:**
    *   **In-Article CTA:** Inserted a "Recommended Product" block within the article content, driving traffic directly to WhatsApp for sales.
    *   **Brand Authority:** Added Moroccanoil to the global `brandsData.js`, displaying it in the homepage infinite carousel to reinforce premium positioning.
*   **Cleanups:** Removed unused assets to keep the repository lightweight.

### 3. Intelligent SEO & CTR Optimization (Page-by-Page) 🚀
*   **Rich Snippets (FAQ Schema):** Implemented `FAQPage` JSON-LD in all main service pages (Balayage, Nails, Barber, Spa, Blog). This strategically increases SERP real estate and aims to boost the current **2% CTR** by showing interactive questions/answers directly in Google results.
*   **Advanced LocalBusiness Schema:** Upgraded the Home page schema to include specific `geo` coordinates, `priceRange`, and an expanded `areaServed` (Chía, Cajicá, Fontanar, Zipaquirá, Sopó) to dominate local search intent.
*   **Semantic Content Reinforcement:**
    *   **"Spa en Chía"**: Improved keyword density and semantic relevance to climb from Position 35.
    *   **Nails**: Added explicit mentions of **Polygel and Acrylics** to target high-intent lagging keywords.
    *   **Barber**: Reinforced proximity to **Fontanar and Cajicá** for local convenience intent.
*   **Internal Linking Strategy:** Optimized anchor texts in the blog and index pages to pass authority to the most profitable service pages.

### 1. Mobile Performance Overhaul (JS Bundling & Hydration) ⚡️
*   **Waterfall Elimination:** Replaced the legacy file-by-file loading with **JS Bundling using `esbuild`**.
    *   **Before:** ~50+ sequential network requests for individual JS modules.
    *   **After:** **1 single bundle file** (`main.xxxx.js`) per page entry point.
    *   **Impact:** Drastic reduction in TBT (Total Blocking Time) and FCP (First Contentful Paint) on mobile devices.
*   **Smart Hydration Logic:** Updated `App.js` to respect Server-Side Generated (SSG) content.
    *   Now checks if the Navbar, Footer, and Hero are already present in the DOM before attempting to render them.
    *   Prevents costly layout shifts and CPU usage during initialization.
*   **Build Pipeline Upgrade:**
    *   Integrated `esbuild` for high-performance bundling and minification.
    *   Maintained hash-based cache busting for the new bundled assets.
*   **Result:** A production-grade loading performance that eliminates the "infinite loop" feeling on slower 4G networks.

### 2. Automated Production Pipeline 🛠️
*   **Intelligent Cache Busting (Hashing):** Updated `scripts/build.js` to automatically generate **MD5 hashes** for key assets (`styles.css`, `main.js`, `service-page.js`).
    *   References in HTML and JS are now updated dynamically during build (e.g., `main.3888907b.js?v=timestamp`).
    *   This ensures zero-cache issues for users and search bots without manual intervention.
*   **Sitemap Synchronization:** The `sitemap.xml` is now automatically validated and submitted to Google Search Console as part of the production release.
*   **GSC Integration:** Verified the presence of new Schemas using Google's Rich Results Test and confirmed the sitemap status in Search Console.

---

### 3. Robust SEO & Navigation (Breadcrumbs) 🧭

---

### 1. Blog SEO & Schema Markup Overhaul ✍️
- **Full Schema Coverage:** Implemented `BlogPosting` JSON-LD structured data in every single blog article and the master template. This ensures rich snippet support (headline, description, author, image, date) for all current and future content.
- **Dynamic Blog Index Schema:** The main blog page now includes a comprehensive `Blog` schema that automatically lists all published articles, creating a strong semantic link between the index and its content.
- **SEO Title & Meta Polishing:** Optimized the "Choque térmico" article for search performance:
    - **Title:** Shortened to ~58 characters to avoid Google truncation.
    - **Meta Description:** Refined to ~148 characters, including primary keywords and the brand name.
- **Asset Integrity:** Standardized canonical URLs and Open Graph tags across all 6 articles, ensuring correct asset paths and domain consistency.

### 2. Privacy & Automation Logic 🤖
- **Protected Templates:** Added `<meta name="robots" content="noindex, nofollow">` to `article.template.html` and `service.template.html` to prevent raw templates from appearing in search results.
- **Sitemap Intelligence:** Updated `generate-sitemap.js` to automatically exclude any file containing `.template.` from the final `sitemap.xml`.
- **Smart Article Generator:**
    - Migrated `create-article.js` to **ES Modules** for project-wide consistency.
    - **Self-Healing Logic:** The script now automatically removes the `noindex` tag from the template and replaces it with the dynamic `BlogPosting` Schema when generating a new post.
- **Codebase Sanitization:** Removed obsolete `data-key` attributes from the dynamic blog generation script (`generate-blog.js`) and finalized the cleanup of internationalization remnants.

### 3. UI Standardization & H1 Alignment 🎨
- **Unified Hero Design:** Standardized the Hero Section H1 alignment across the entire site. The Homepage (`index.html`) Hero is now **centered**, matching the design language of all internal Service pages.
- **Consistent Visuals:** Adjusted the Homepage Hero background opacity (`bg-white/90`) and styling to ensure a pixel-perfect match with the component-based Hero (`HeroSection.js`) used throughout the application.

### 4. Previous SEO Fixes 🔍
- **Canonical & OG Correction:** Conducted a comprehensive audit of all service pages (`/peluqueria`, `/estetica`, `/barberia`, `/unas-spa`) and fixed critical inconsistencies in `<link rel="canonical">` and `<meta property="og:url">` tags.
    - Resolved typo: `narbosalon` -> `narbossalon` (missing 's').
    - Standardized URLs: Ensured all canonical paths correctly point to their physical file locations (e.g., `/servicios/peluqueria/` instead of `/peluqueria/`).
- **Full Schema Markup Coverage:** Implemented JSON-LD structured data on all remaining key pages to ensure 100% SEO coverage:
    - **About Us (`nosotros.html`):** Added `BeautySalon` and `AboutPage` schema.
    - **Contact (`contacto.html`):** Added `ContactPage` schema with `GeoCoordinates` and `OpeningHours`.
    - **Blog (`blog/index.html`):** Added `Blog` schema.
    - **Aesthetics Services:** Added specific `Service` schema for "Masajes Relajantes", "Limpieza Facial", and "Cejas y Pestañas".

---

## 🔄 Recent Updates (January 29, 2026)

### 1. Functional Enhancements & UX 🛠️
- **Home Decorations Animation:** Synchronized the floating leaves animation on the Homepage (`index.html`) to match the "Enter Flow" of the inner pages (`animate-leaf-enter`), addressing the "static" or "braked" initial feel (fly-in from external sides).
- **Dynamic Breadcrumbs Logic:** Updated `service-page.js` to intelligently handle sub-service routes (e.g., distinguishing `/barberia/cortes` from generic paths), ensuring navigation trails are accurate and complete (e.g., `Home > Barbería > Cortes de Hombre`).
- **Placeholder Bento Grid (Barbería):** Implemented a temporary yet polished Bento Grid for the "Cortes de Hombre" page using the brand logo in varied layouts (Vertical/Square/Horizontal). This allows visualizing the final structure and layout stability while real photographic assets are produced.
- **Service Card Branding:** Standardized the "Arreglo de Barba" service card to use the brand logo with a dark theme variant (`variant: 'logo'`) instead of incorrect generic imagery.

### 2. Stability & Performance 🚀
- **GLightbox Dependency Fix:** Resolved a critical "infinite retry loop" in the GLightbox loader by ensuring the library's CSS and JS dependencies are correctly injected into all service sub-pages (`estetica`, `barberia`).
- **Grid ID Correction:** Fixed a DOM ID mismatch in the Barber page that caused the "Women's Hair Services" grid to load instead of the "Barber Services".
- **Console Cleanup:** Removed verbose initialization logs from production code to reduce browser console noise.

### 3. Service Page Refactoring & Optimization (PM Session) 🏗️
- **Centralized Logic (`ServicePageManager`):** Eliminated code duplication by implementing a robust, centralized controller that manages all service sub-pages (`Peluquería`, `Barbería`, `Estética`). It intelligently detects the current context to inject the correct data.
- **Dynamic Hero with SSG Support:** 
    - Replaced hardcoded Hero HTML with a dynamic `#hero-root` container.
    - **Crucial SEO Fix:** Renamed the target ID from `services-hero-root` to `hero-root` to align with the `scripts/ssg.js` pipeline. This ensures the Hero Content (H1, Description) is **pre-rendered** during the build process, making it instantly visible to Google Bots without JavaScript.
- **Performance (Lazy Loading):** ⚡
    - **Smart Loading Strategy:** Implemented `loading="lazy"` on all `ServiceCard` images (Grid, Overlay, Logo variants) to prioritize bandwidth for the Critical Rendering Path.
    - **LCP Protection:** Maintained `loading="eager"` exclusively for Hero images to ensure the Largest Contentful Paint metric remains green.
    - **Build Metrics:** Confirmed production build sizes are highly optimized (`styles.css`: ~15KB gzipped, `service-page.js`: ~3KB gzipped).
- **Architecture Stability:**
    - Restored **Floating Decorations (Parallax Leaves)** logic to work seamlessly with dynamic content injection.
    - Fixed `GLightbox` initialization errors on sub-pages by ensuring dependencies are present.

---

## 🔄 Recent Updates (February 28, 2026)

### 1. Loyalty Program Enhancements (Fidelización) 🎁
- **Mobile-Optimized Date Selector**: Integrated `Flatpickr` via CDN on the `fidelizacion/index.html` page. Configured with `disableMobile: true` to enforce a professional, custom UI over native device pickers, significantly improving the year-selection experience for users. The internal date format consistently remains `YYYY-MM-DD` to ensure seamless integration with the N8N webhook and Supabase.
- **QR Code Web Scanner Modal**: Added a "Scan QR" button to the unified header. Clicking this button triggers an elegant, animated modal displaying a high-contrast, lightweight (574 bytes) PNG QR code. This allows walk-in clients to easily scan and access the loyalty form from their own devices.

---

## 🔄 Recent Updates (January 26, 2026)

### 1. JavaScript Architecture Refactor (Clean Code) 🏗️
- **Decoupled Logic**: Split `main.js` into `App.js` (Pure Business Logic Class) and `main.js` (Entry Point). This separation prevents side-effects when importing the App class in other scripts.
- **Fixed Race Conditions**: Resolved a critical "double initialization" bug that caused interactive components (like FAQ Accordions) to fail on service pages. `service-page.js` and `nails-page.js` now handle App instantiation explicitly using the Singleton pattern.
- **Build System Update**:  Added `App.js` to the cache-busting pipeline in `scripts/build.js` to ensure production users receive the latest logic updates.

### 2. Content Improvements ✂️
- **Haircut FAQ**: Updated the Frequently Asked Questions in `cortes-de-pelo.html` to be service-specific (Visagism, curly hair care, cut frequency) instead of generic content.

---

## 🔄 Recent Updates (January 22, 2026)

### 1. Deployment Automation (GitHub Pages) 🚀
- **Automated Deploy Command**: Added `npm run deploy` script to `package.json`.
    - This command automates the entire process: running the build (`npm run build`) and pushing the `dist/` folder to the `gh-pages` branch using the `gh-pages` library.
    - Zero configuration required for future updates.

### 2. UI Enhancements (Google Reviews & Timeline) ✨
- **Infinite Marquee**: Implemented a continuous, smooth-scrolling marquee for Google Reviews, displaying real customer testimonials dynamically.
- **Timeline Updates**: Updated the "Trayectoria" section with new milestones for **2024** (Service Expansion) and **2026** (Digital Transformation).

---

## 🔄 Recent Updates (January 21, 2026)

### 1. Preview Deployment System (GitHub Pages)
- Implemented a robust build-and-deploy workflow for generating preview links via GitHub Pages.
- **Dynamic Path Resolution**: Refactored `main.js` core logic (`App` class) to intelligently detect the application root (`appRoot`), enabling seamless support for subdirectory deployments (e.g., `/repo-name/`) while maintaining compatibility with the production root domain.
- **SSG Asset Fix**: Enhanced `scripts/ssg.js` to automatically calculate subdirectory depth and prefix asset paths (images/links) with `../../` for deep service pages, ensuring zero-configuration deployment.

### 2. SSG & SEO Expansion
- Integrated `nosotros.html` and `contacto.html` into the Static Site Generation pipeline, ensuring critical H1 titles and Hero sections are pre-rendered for SEO.
- **Data Cleanup**: Standardized all image paths in `pagesData.js` to be root-relative, removing fragile `../../` hardcoding.

### 3. Bug Fixes
- **Blog Generation**: Resolved `TypeError` in `scripts/generate-blog.js` caused by attempting to sort an immutable (`Object.freeze`) array.
- **Broken Links**: Fixed 404 errors for internal service links in the Preview environment by implementing absolute path hydration on the client side.

---

## 🔄 Recent Updates (January 20, 2026)

### 1. Page Refactoring & Enrichment
- **`nosotros.html`**:
    - Refactored to use standard `#app-wrapper` and `.site-header` architecture.
    - Implemented **dynamic hero section** injection via `main.js`.
    - Added "Nuestros Pilares" (Values) section with micro-interactions.
    - Added "Nuestra Trayectoria" (Timeline) section.
    - Integrated Client Reviews Carousel (migrated from `resenas.html`).
- **`contacto.html`**:
    - Refactored to use standard `#app-wrapper` and `.site-header` architecture.
    - Implemented **dynamic hero section** injection.
    - Redesigned "Visítanos" section with premium card layout and improved map integration.
- **Removed**: `resenas.html` (content integrated into other pages).

### 2. Architecture Standardization
- Enforced `site-header` + `app-wrapper` structure across all main pages.
- Centralized Hero logic in `main.js` and `pagesData.js`.
- Cleaned up obsolete inline styles and static scripts.

### 2. Codebase Improvements
- **`HeaderController.js`**: Refactored to accept dependency injection of the header element for better robustness. Added fallback logic for DOM selection.
- **`main.js`**: Updated `initCoreComponents` to explicitly pass the header element to the controller.
- **Cleanup**: Removed unused duplicate `barber-hero.jpg` from root directory.

---



## 📂 Project Structure

### 📝 Últimas Actualizaciones (19 de enero, 2026)
- **Mejoras Visuales y UX (Peluquería y Balayage):** ✨
    - **Carruseles "Antes y Después":** Implementación de una nueva funcionalidad en el Lightbox de Balayage y Color, que permite ver múltiples imágenes (resultado y estado previo) por cada tarjeta de servicio sin saltar a servicios diferentes.
    - **Navegación Lightbox Optimizada:** Corrección de la visibilidad de las flechas de navegación en dispositivos móviles y ajuste de la posición del botón de cierre para evitar conflictos táctiles.
    - **Galería de Cortes:** Actualización de imágenes en las tarjetas y galería de "Cortes de Pelo", eliminando contenido repetido y añadiendo trabajos reales (Corte Bob, Capas, Pixie).
    - **Galería de Balayage:** Enriquecimiento visual con fotos de resultados reales de corrección de color y balayage rubio, reemplazando placeholders genéricos.
- **Optimización de Conversión (Uñas):** 💅
    - **Hero Section Emotivo:** Actualización de la imagen principal del Hub de Uñas (`unas-spa`) por una fotografía que muestra rostro de cliente satisfecho, mejorando la conexión emocional y la confianza.

### 📝 Últimas Actualizaciones (16 de enero, 2026)
- **Experiencia de Usuario (Chat Widget WhatsApp):** 💬
    - **Prevención de Errores Móviles:** Se reemplazó el enlace directo por un **Widget Interactivo** tipo "Interruptor". Esto evita que los usuarios abandonen la web por clics accidentales al hacer scroll en dispositivos móviles.
    - **Interfaz de Chat Simbólico:** Al hacer clic, se despliega una ventana modal con estética nativa (encabezado verde, badge de verificado, mensaje de bienvenida), aumentando la confianza antes de la conversión.
    - **Refactorización Clean Code:** El componente `WhatsAppButton.js` fue reescrito totalmente bajo principios SOLID, dividiendo la lógica en funciones pequeñas y mantenibles (`_getHeaderHTML`, `_getBodyHTML`).
    - **Correcciones Visuales:** Solución al error de visibilidad del logo (fondo oscuro para logo blanco) y optimización de assets a formato WebP.

### 📝 Últimas Actualizaciones (15 de enero, 2026)
- **Hub de Estética (Renovación Total):** ✨
    - **Reestructuración Completa:** Se rediseñó la página `servicios/estetica/index.html` bajo la arquitectura estándar del sitio (`site-header`, `app-wrapper`), eliminando deuda técnica y scripts inline.
    - **Grid de Servicios Dinámico:** Implementación de carga dinámica de servicios desde `js/data/estheticsServices.js`.
    - **Tarjetas de Servicio Mejoradas:** Se añadieron **Iconos SVG Representativos** (Spa, Limpieza, Masaje, Cejas, Depilación) para mejorar la identificación visual de cada servicio.
    - **Consistencia Visual:** Unificación del Hero Section (tarjeta flotante superpuesta) y activación de decoraciones 3D (hojas flotantes) para igualar la experiencia de usuario con Peluquería.
- **Carrusel de Marcas (Refactorización):** 🤝
    - **Lógica Unificada:** Creación del componente genérico `BrandsSection.js` y centralización de datos en `brandsData.js`.
    - **Ancho Dinámico Inteligente:** Solución definitiva al problema de márgenes inconsistentes mediante cálculo matemático basado en el ancho real del texto.
    - **Experiencia de Usuario:** Se redujo la velocidad de la animación para una lectura más cómoda y sutil.
- **Botón de WhatsApp (CRO):** 💬
    - **Tooltip Persuasivo:** Implementación de una etiqueta flotante ("¡Agenda tu cita aquí!") con animación de rebote y posicionamiento superior, diseñada para aumentar la tasa de clics sin obstruir el contenido.
- **Navegación y UX:** 🧭
    - **Breadcrumbs (Migas de Pan):** Corrección de lógica para garantizar rutas completas y consistentes en todas las subpáginas de Peluquería y Uñas, y soluciones de visibilidad bajo encabezados fijos.

### 📝 Últimas Actualizaciones (14 de enero, 2026)
- **Refactorización Completa de JavaScript (Clean Code):** 🏗️
    - **Arquitectura Modular:** Se reestructuró todo el código JS del cliente en una arquitectura clara: `components/`, `controllers/`, `services/`, `data/`.
    - **Patrones de Diseño:**
        - **Singleton:** Implementado en `TranslationService` para gestión global de estados.
        - **App Class:** Nueva clase `App` en `main.js` como punto de entrada único para la orquestación inicial.
        - **ServicePageManager:** Nueva clase en `service-page.js` para gestionar la lógica específica de subpáginas.
    - **Documentación & Tipado:** Se añadieron definiciones **JSDoc** (`@typedef`, `@param`) en todos los archivos, especialmente en la capa de datos (`js/data/*.js`) y se aplicó `Object.freeze()` para garantizar inmutabilidad.
### 📝 Últimas Actualizaciones (28 de enero, 2026)
- **Estandarización Visual y Funcional (Bento Grid Global):** 🖼️
    - **Migración de Galerías:** Se reemplazaron las galerías antiguas en `Balayage`, `Color y Tinturas` y `Tratamientos Capilares` por el componente unificado **Bento Grid**, asegurando una experiencia visual consistente y premium.
    - **Funcionalidad "Antes y Después":** Implementación de una lógica avanzada en `BentoGrid.js` que permite mostrar comparativas de casos de éxito (Portadas + Sub-imágenes ocultas) accesibles vía lightbox.
    - **Saneamiento de Assets (SEO):** Se renombraron masivamente los archivos de imagen para eliminar caracteres especiales (`ñ`) que causaban errores 404 en servidores web estrictos, y se actualizaron todas las referencias internas en `pagesData.js` y `colorStyles.js`.
    - **Optimización de Rutas:** Se completó la migración a rutas absolutas (`/images/...`) en la configuración de datos, eliminando la dependencia de hacks relativos (`../../`) y blindando la carga de imágenes desde cualquier nivel de profundidad de URL.

- **Correcciones Críticas y Mejoras:** 🛠️
    - **Rutas Relativas Dinámicas:** Se corrigió el algoritmo `calculateBasePath` en `main.js` para soportar correctamente la navegación en páginas anidadas profundas (ej: `/servicios/peluqueria/index.html`).
    - **Optimización de Imports:** Eliminación de dependencias circulares y duplicadas en `TranslationService`.
    - **Refinamiento de UX (Barbería):** 💈
        - **Menú Simplificado:** Se actualizó la navegación principal, consolidando la sección de Barbería en un enlace único y directo "Corte y Barba" que dirige a la página especializada.
        - **Modal Interactivo:** Implementación de un modal detallado para el servicio "Arreglo de Barba" en la página de servicios, con carga dinámica de controladores (`lazy loading`) y corrección de posicionamiento (`fixed`) para garantizar su correcta visualización y cierre.

### 📝 Últimas Actualizaciones (12 de enero, 2026)
- **Consistencia de Experiencia de Usuario (Service Pages):** ✨
    - **Solución de Saltos Visuales (Layout Shift):** Se corrigió definitivamente el problema de "brinco" en la sección de Preguntas Frecuentes (FAQ) en todas las páginas de servicios (`Peluquería`, `Balayage`, `Barbería`, `Cortes`, `Tratamientos`) eliminando animaciones conflictivas en bloques extensos.
    - **Navegación Móvil (Breadcrumbs):** Se aumentó el espaciado superior (`pt-32`) del componente de migas de pan para garantizar su visibilidad en móviles bajo el encabezado fijo.
    - **Estandarización de Estructura:** Se unificó la estructura HTML del Hero Section en `peluqueria/index.html` para coincidir con las subpáginas, moviendo el `id="inicio"` al elemento `<section>`.
- **Salubridad del Código (Code Health):** 🛠️
    - **Limpieza de Deuda Técnica:** Eliminación de bloque de scripts duplicados y atributos oxidados (`data-floating-bg`) que ya no cumplían función.
    - **Corrección de Metadatos SEO:** Alineación estricta de `twitter:url` y Schema JSON-LD con las URLs canónicas correctas en la página principal de Peluquería.

### 📝 Últimas Actualizaciones (10 de enero, 2026)
- **Refactorización Mayor de JavaScript (Arquitectura Modular):** 🏗️
    - **Descomposición de UIService:** Se eliminó el "God Object" `UIService.js`, dividiendo sus responsabilidades en controladores atómicos y mantenibles: `HeaderController`, `ModalController`, `VideoPlayerController` y `GalleryController`.
    - **Punto de Entrada Centralizado:** Se creó `js/main.js` para orquestar la inicialización de la Home, reemplazando scripts inline dispersos y mejorando el orden de ejecución.
- **Experiencia de Usuario (Peluquería):** 🍃
    - **Decoraciones Flotantes (Parallax):** Se implementó la animación de hojas 3D en la página de Peluquería (`peluqueria/index.html`), reutilizando el componente `FloatingDecorations`.
    - **Optimización de Activos:** Las imágenes decorativas se migraron de PNG a **WebP**, reduciendo su peso en un ~60% para asegurar un LCP óptimo sin perjudicar el SEO.
    - **Corrección de Contenido:** Revisión ortográfica y gramatical completa (Sentence Case) en títulos y descripciones de servicios.

### 📝 Últimas Actualizaciones (8 de enero, 2026 - Parte 2)
- **UX Multimedia ("Bento Grid" Premium):**
    - Se transformó la galería tradicional de imágenes en un **Bento Grid** moderno en las páginas `peluqueria/index.html` y `cortes-de-pelo-en-chia.html`.
    - **Video Híbrido:** Se integró contenido de video (`.mp4`) con **Lazy Loading Inteligente** (IntersectionObserver + Poster) para no afectar la velocidad de carga inicial (Core Web Vitals).
    - **SEO de Video:** Implementación de Schema Markup **VideoObject (JSON-LD)** para garantizar la indexación correcta en Google Search Console.
    - **Pinterest Mobile Layout:** Optimización específica para móviles, pasando de 1 columna a **2 columnas**, mejorando la densidad de contenido y la retención del usuario.
    - **Conversion rate optimization (CRO):** Se reemplazó el botón saliente de Instagram por un **Call-to-Action (CTA) contextual** directo a WhatsApp al final de cada galería.

### 📝 Últimas Actualizaciones (8 de enero, 2026 - Parte 1)
- **Refactorización de Assets (Imágenes):**
    - Se reorganizó la carpeta `images/` eliminando el subdirectorio obsoleto `fotos_galeria` y moviendo los recursos a carpetas semánticas (`peluqueria`, `spa-y-estetica`, `unas-manicure-pedicure`, `team`).
    - Se actualizaron masivamente todas las referencias en HTML y JS, y se restauraron archivos eliminados accidentalmente (`video_galeria`).
- **Corrección de UX en Navegación (Navbar):**
    - **Scroll Offset Fix:** Se eliminó el ancla `#inicio` en los enlaces de la Home para evitar que el navegador cargue la página con un desplazamiento indeseado.
    - **Lógica de Colapso Invertida:** Se corrigió el CSS para que la barra inicie "Alta" (con padding) y se contraiga al hacer scroll, alineando la transición visual con la reducción del logo.
    - **Compilación Manual:** Se documenta que cambios en `input.css` requieren ejecutar `npx @tailwindcss/cli -i ./css/input.css -o ./css/styles.css` si no se usa el modo *dev*.

## Arquitectura y Escalabilidad (Nuevo)

Para garantizar la estabilidad visual y el correcto funcionamiento del menú móvil en todas las páginas, se han establecido los siguientes estándares:

1.  **Wrapper de Aplicación**: Todo el contenido visible (excepto el Header) debe estar dentro de un `<div id="app-wrapper" class="relative w-full overflow-x-hidden">`. Esto previene conflictos de *stacking context* con elementos flotantes.
2.  **Header Estándar**: Se debe usar la clase CSS `.site-header` en la etiqueta `<header>` para asegurar posicionamiento fijo y z-index correcto.
3.  **Documentación**: Consulta `LAYOUT_GUIDE.md` en la raíz del proyecto para detalles de implementación de nuevas páginas.
### 📝 Últimas Actualizaciones (8 de enero, 2026)
- **Refactorización de Assets (Imágenes):**
    - Se reorganizó la carpeta `images/` eliminando el subdirectorio obsoleto `fotos_galeria` y moviendo los recursos a carpetas semánticas (`peluqueria`, `spa-y-estetica`, `unas-manicure-pedicure`, `team`).
    - Se actualizaron masivamente todas las referencias en HTML y JS, y se restauraron archivos eliminados accidentalmente (`video_galeria`).
- **Corrección de UX en Navegación (Navbar):**
    - **Scroll Offset Fix:** Se eliminó el ancla `#inicio` en los enlaces de la Home para evitar que el navegador cargue la página con un desplazamiento indeseado.
    - **Lógica de Colapso Invertida:** Se corrigió el CSS para que la barra inicie "Alta" (con padding) y se contraiga al hacer scroll, alineando la transición visual con la reducción del logo.
    - **Compilación Manual:** Se documenta que cambios en `input.css` requieren ejecutar `npx @tailwindcss/cli -i ./css/input.css -o ./css/styles.css` si no se usa el modo *dev*.

### 📝 Últimas Actualizaciones (4 de enero, 2026)
- **Estabilización de UI y Arquitectura (Tailwind v4):**
    - **Solución de Bugs Críticos:**
        - **Navbar Invisible:** Se corrigió un conflicto de renderizado en Chrome invirtiendo la lógica de visibilidad (`Desktop-First`) y usando clases semánticas.
        - **Dropdown de Servicios:** Se implementó una lógica híbrida (CSS/JS) robusta que soporta tanto *hover* en escritorio como *clic* en dispositivos táctiles.
        - **Dark Mode Reactivo:** Se migró el sistema de temas a **Variables CSS Reactivas**, eliminando el retraso de renderizado (scroll repaint bug) y asegurando una transición instantánea y fluida en toda la página.
    - **Clean Code & Refactorización:**
        - **Centralización de Estilos:** Se eliminaron clases de utilidad redundantes (`bg-brand-light`) de **todos** los archivos HTML. El estilo base del sitio ahora se controla de forma global y mantenible desde `input.css`.
    - **Infraestructura de Compilación:** Se reparó y estabilizó el pipeline de construcción de Tailwind v4, asegurando la correcta generación de binarios y estilos.

### 📝 Últimas Actualizaciones (7 de enero, 2026)
- **Estrategia SEO Local & Arquitectura:**
    - **Landing Pages Dedicadas:** Se crearon 7 páginas estáticas optimizadas para SEO local (ej: `cortes-de-pelo-en-chia.html`) con H1s únicos y contenido semántico, viviendo en la raíz para URLs limpias.
    - **Inyección SSG Global:** Se actualizó `scripts/ssg.js` para pre-renderizar componentes dinámicos (`ServiceCard`) en *todas* las páginas de servicio durante el build, mejorando el Core Web Vitals (LCP).
- **Estabilidad de Navegación:**
    - **Rutas Absolutas:** Se migraron todos los enlaces internos (`js/data/*.js`) a formato absoluto (`/ruta...`). Esto soluciona definitivamente los errores 404 al navegar entre niveles de carpetas (`root` vs `peluqueria/` vs `servicios/`).
    - **Breadcrumbs:** Corrección de rutas en la navegación de migas de pan.

### 📝 Últimas Actualizaciones (5 de enero, 2026)
- **Correcciones Post-Migración Tailwind v4:**

    - **Navbar Color Fix:** Se forzó el color inicial de la barra de navegación usando un valor arbitrario (`bg-[#6B755A]`) para garantizar su visibilidad antes de hacer scroll, corrigiendo el comportamiento donde aparecía transparente o invisible inicialmente.
    - **Limpieza de CSS:** Se eliminaron reglas redundantes en `input.css` que generaban conflictos de especificidad con las utilidades de color.

### 📝 Últimas Actualizaciones (Sesión PM, 5 de enero 2026)
- **Depuración Mayor (Code Cleanup):** 🧹
    - **Eliminación de Features:** Se retiraron completamente el sopote para **Modo Oscuro** y **Multi-idioma (I18n)** para simplificar la UX y eliminar código muerto.
    - **Identidad Visual:** Se estableció un sistema de diseño estricto dual: **Playfair Display** (Títulos) y **Montserrat** (Textos), eliminando Lato y otras fuentes.
    - **Archivos:** Eliminación de logs (`SESSION_LOGS.md`) y backups obsoletos.
- **Optimización SEO Técnica (Core Web Vitals):** 🚀
    - **Solución CLS (Cumulative Layout Shift):** Se implementó una arquitectura **SSG (Static Site Generation)** para el Navbar y Footer.
    - **Script SSG:** Nuevo script `scripts/ssg.js` que inyecta el HTML de los componentes *durante el build*, garantizando que Google y otros bots vean el menú completo instantáneamente y eliminando los saltos visuales de carga.

### 📝 Últimas Actualizaciones (26 de diciembre, 2025)
- **Infraestructura SEO (Crítico):**
    - **Unificación de Dominio:** Se estableció el dominio raíz `https://narbossalon.com` (Non-WWW) como el estándar oficial para alinearse con el historial de Google Search Console.
    - **Redirección de index.html:** Se implementó una regla 301 en `.htaccess` para redirigir peticiones de archivos físicos `index.html` a la raíz del directorio, eliminando problemas de contenido duplicado.
- **Automatización del Build:**
    - **Cache Busting Automático:** Se mejoró el script `scripts/build.js` para inyectar automáticamente un hash de versión (`?v=timestamp`) en las referencias a CSS y JS en todos los archivos HTML de producción.
    - **Generación Dinámica de Sitemap:** Ahora el sitemap se genera automáticamente con el dominio raíz correcto antes de cada compilación.
- **Optimización de Rendimiento (Performance):**
    - **Migración a WebP:** Se convirtieron todas las imágenes de los artículos del blog a formato **WebP**.
    - **Configuración de Servidor Avanzada:** Optimización de `.htaccess` con compresión Gzip y políticas de caché de 1 año para activos estáticos.

### 🔮 Roadmap & Transición 2026 (Enero)
- **Arquitectura Multi-Página:** El proyecto ha evolucionado de una Landing Page única a una arquitectura web robusta con URLs dedicadas para cada servicio (ej: `/servicios/peluqueria.html`), Blog y Fidelización.
- **Actualización de Stack:** Se ha programado la actualización de **Tailwind CSS a la versión v4.x** para enero de 2026.
    - *Nota:* Se ha **congelado** la refactorización profunda de CSS (safelist/config) hasta esa fecha para garantizar la estabilidad del sitio durante la temporada de fin de año.

### 📝 Últimas Actualizaciones (14 de febrero, 2026)
- **Saneamiento SEO y URLs Limpias:**
    - Se eliminaron todas las referencias físicas a `index.html` en los controladores de JavaScript (`service-page.js`, `nails-page.js`, `hair-page.js`) y el componente `Navbar.js`.
    - Ahora el sitio utiliza al 100% rutas amigables basadas en directorios (`/servicios/peluqueria/` en lugar de `/servicios/peluqueria/index.html`), optimizando el presupuesto de rastreo de Google (Crawl Budget).
- **Corrección de Sitemap:**
    - Se arregló un bug crítico en el script `generate-sitemap.js` que generaba URLs malformadas (faltante de slash).
    - El sitemap ahora se autovalida y normaliza todas las rutas antes de la exportación.
- **Optimización Preventiva de CLS (Brands):**
    - Se implementó una reserva de espacio (`min-height`) para el contenedor `#home-brands-root` en la home, eliminando el salto de contenido (Layout Shift) al cargar dinámicamente el carrusel de marcas premium.
- **Producción y Cache Busting:**
    - Se generó un nuevo Build de producción forzando la actualización de activos mediante nuevos hashes de versión (`styles.ccb77b7a.css`, `main.1c1fcd57.js`), garantizando que las mejoras de hoy sean visibles de inmediato para todos los usuarios.

### 📝 Últimas Actualizaciones (13 de febrero, 2026)
- **Finalización del Sistema de Fidelización:**
    - Se optimizó el flujo de correos (n8n) reemplazando logos SVG por PNG para máxima compatibilidad con clientes de correo móviles.
    - Se centralizó el código QR en el cuerpo del email y se mejoró la UX del formulario con prefijos telefónicos automáticos (`+57`).
    - Despliegue de las reglas de seguridad `noindex` para la sección de fidelización en `robots.txt`.

### 📝 Últimas Actualizaciones (25 de diciembre, 2025)
- **Mejoras de UX y Rendimiento (ReviewsCarousel):**
    - Se eliminó por completo el **CLS (Cumulative Layout Shift)** en el carrusel de testimonios implementando una técnica moderna de **CSS Grid Stack**.
    - Ahora el carrusel mantiene una altura estable automáticamente sin necesidad de cálculos costosos en JavaScript, evitando saltos de contenido en móviles.
    - Se añadieron transiciones suaves de opacidad (fade) entre diapositivas.
- **Refactorización de Arquitectura (Clean Code):**
    - **I18nService Singleton:** Se implementó el patrón Singleton para el servicio de idiomas, permitiendo un acceso global eficiente a las traducciones desde cualquier controlador.
    - **Configuración Centralizada:** Se extrajeron los datos estáticos (redes sociales) a `js/config.js`, mejorando la mantenibilidad y siguiendo el principio Open/Closed.
    - **Controlador de Formulario:** Se delegó la lógica de textos de estado al `I18nService`, eliminando duplicidad de código.
- **Accesibilidad y Diseño (ContactForm):**
    - Se corrigió un problema crítico de contraste en los campos del formulario, asegurando que el texto sea legible tanto en modo claro como oscuro.
    - Se optimizaron los estilos de los inputs para una mejor experiencia táctil en móviles.
- **Corrección Crítica de UI (MobileMenu):**
    - Se implementó un patrón de "Portal" para el menú móvil, moviéndolo al `<body>` al inicializar para evitar conflictos de contexto de apilamiento (`z-index`) y desplazamiento visual.

### 📝 Últimas Actualizaciones (24 de diciembre, 2025)
- **Estandarización de Footer:** Se modularizó el pie de página (`Footer`) como un componente reutilizable, implementándolo en la Home, el índice del Blog y todos los artículos.
- **Componente de Contacto Independiente:** Se separó el formulario de contacto (`ContactForm`) del footer. Esto permite una mayor flexibilidad al escalar la web, pudiendo insertar el formulario en cualquier sección o página nueva de forma independiente.
- **Optimización de Mantenimiento:** La actualización de enlaces globales (como redes sociales o créditos del desarrollador) ahora se realiza en un solo archivo centralizado para toda la web.

⚙️ Automatización y Gestión del Blog
Para mantener la escalabilidad y el SEO, el proyecto cuenta con herramientas CLI personalizadas:

1.  **Crear un Nuevo Artículo:**
    ```bash
    npm run new-post
    ```
    *Te guiará paso a paso para definir título, URL y descripción. Genera el HTML y actualiza la BD automáticamente.*

2.  **Regenerar el Índice del Blog:**
    ```bash
    npm run generate:blog
    ```
    *Lee `js/data/articles.js` y actualiza `blog/index.html`. (Se ejecuta automáticamente al hacer build).*

## 🧩 Componentes Reutilizables y Guías

### 🖼️ BentoGrid (Galería de Trabajos)
Ubicación: `js/components/BentoGrid.js`

Este componente genera una cuadrícula dinámica de imágenes/videos y soporta la funcionalidad premium de **"Antes y Después"**.

#### ✨ Funcionalidad "Antes y Después" (Carrusel Aislado)
Permite que una tarjeta muestre el **Resultado Final** (portada) y, al hacer clic, abra un Lightbox aislado que contiene tanto el resultado como el estado anterior.

**Cómo Implementarlo:**
En `js/data/pagesData.js`, añade un objeto al array `gallery` con la propiedad `subImages`:

```javascript
{
    type: 'image',
    layout: 'vertical', // Opciones: 'vertical', 'square', 'horizontal', 'featured-video'
    src: '../../images/pages/peluqueria/casos/caso-despues.jpg', // 📸 PORTADA (Resultado Final)
    title: "Título del Caso",
    subtitle: "Subtítulo Descriptivo",
    alt: "Descripción SEO del resultado",
    
    // 🚀 La magia ocurre aquí:
    subImages: [
        {
            src: '../../images/pages/peluqueria/casos/caso-antes.jpg', // 📸 IMAGEN OCULTA (Estado Previo)
            alt: 'Descripción del estado inicial'
        }
    ]
}
```

#### 🛡️ Mecanismos de Seguridad (Robustez)
Para evitar errores de navegación (ej: abrir la imagen JPG en una pestaña nueva si falla JS), el componente implementa **Navigation Guard**:
1.  **Enlaces Seguros**: Los links se generan con `href="javascript:void(0)"`.
2.  **Data Attributes**: La URL real reside en `data-href`, que es leída por GLightbox.
3.  **Inyección CSS**: `ServicePageManager.js` inyecta estilos críticos (`!important`) para forzar la visibilidad de los botones de navegación (flechas/cerrar) sobre cualquier capa del sitio.

#### 🔍 Guía de SEO para Imágenes
*   **Ubicación**: Almacenar los casos de éxito en `images/pages/peluqueria/casos_exito/`.
*   **Naming Convention**: Usar palabras clave descriptivas.
    *   ❌ Mal: `IMG_2831.jpg`, `caso1-antes.jpg`
    *   ✅ Bien: `balayage-rubio-perla-chia-antes.jpg`, `correccion-color-cabello-dañado-despues.jpg`

---

3.  **Compilar Proyecto (Producción):**
    ```bash
    npm run build
    ```
    *Ejecuta la generación del blog, compila Tailwind CSS, minifica JS/HTML y prepara la carpeta `dist/`.*

🛠️ Tecnologías Utilizadas
Este proyecto fue construido utilizando tecnologías web modernas, enfocadas en la eficiencia, el rendimiento y la mantenibilidad.

- **HTML5:** Estructura semántica y accesible.
- **Tailwind CSS:** Framework CSS "utility-first" para un diseño consistente y optimizado.
- **JavaScript (ES6+ Modules):** Arquitectura modular basada en componentes independientes.
- **Node.js Build Pipeline:** Scripting personalizado para optimización de activos y automatización de despliegue.
- **GLightbox:** Para una galería de imágenes interactiva y accesible.
***

## 🔄 Recent Updates (February 17, 2026)

### 1. Performance: Lazy Loading Architecture ⚡
*   **Problem:** PageSpeed Insights flagged high "Unused JavaScript" and Total Blocking Time (TBT) due to loading heavy components (Gallery, Video, Reviews) immediately on initialization.
*   **Solution:** Refactored `App.js` to implement **Dynamic Imports (Code Splitting)** with `IntersectionObserver`.
    *   **Lazy Hydration:** Components like `ReviewsCarousel`, `GalleryController`, `VideoPlayerController`, and `ContactFormController` are now fetched and executed **only when the user scrolls near them**.
    *   **Critical Path Protection:** The Navbar, Hero Section, and HeaderController remain in the main bundle to ensure instant LCP and interactivity above the fold.
    *   **Result:** Significant reduction in initial bundle size and main thread blocking, improving PageSpeed scores.

### 2. SEO & Routing Fixes 🔍
*   **Navigation Repair:** Fixed a critical routing issue where "Nosotros" and "Contacto" links in the Navbar were point to non-existent directories (`/nosotros/`) in the local environment. Restored explicit `.html` extensions for robust local/production compatibility.
*   **Loyalty Program Styles:** Added the `fidelizacion` directory to `tailwind.config.js` content array. This prevents PurgeCSS from stripping essential styles for the loyalty program during the build process.
*   **Visual Feedback:** Added the missing `.input-focused` class to `input.css` to ensure the loyalty form provides proper visual feedback during user interaction.


### 3. Build & Deployment Stability 🛠️
*   **Sitemap Update:** Verified and updated `sitemap.xml` to include the latest clean URLs.
*   **Production Deployment:** All changes (Performance, SEO, Styles) have been merged to `main` and pushed to production.


## 🔄 Recent Updates (February 19, 2026)

### 1. Loyalty System Optimization (Email & QR) 📧
*   **Corporate Email Integration:** Updated all n8n workflows (`fidelizacion_automations_n8n.json` and `workflow_n8n.json`) to send emails via the corporate account `contacto@narbossalon.com` using `n8n-nodes-base.emailSend`.
    *   Replaced deprecated Gmail nodes.
    *   Updated templates (`birthday`, `reminder`, `welcome`) to correctly reference n8n data nodes.
*   **QR Redemption Logic Improvement:**
    *   Added `trim()` to the coupon code input in `canje_qr_workflow.json` to prevent failures due to invisible whitespace during scanning.


### 2. Mobile LCP Fix (Critical Image Resizing) ⚡
*   **Diagnosis:** Discovered that the mobile hero image `mujer-maquillaje-spa-salon-belleza-chia-mobile.webp` was identical in size to the desktop version (1920x1080px, ~83KB), causing a 9.3s LCP on mobile due to heavy decoding and resizing load.
*   **Fix:** Resized the asset to **768px width** using `cwebp`.
*   **Result:** File size dropped from **83KB to 25KB** (70% reduction). Mobile devices now download a correctly sized asset, significantly improving Core Web Vitals.

### 3. Loyalty System Polish (QR & Email) 📧
*   **Mobile QR Viz Fix:** 
    *   **Problem:** The QR code in the welcome email was not rendering on some mobile devices (iPhone mail app) due to format compatibility and strict threading rules.
    *   **Solution:** Updated the n8n email node to use the `qrserver` API with specific parameters: `format=png`, `bgcolor=ffffff`, and `qzone=1` (margin). This forces a clean PNG image readable in dark mode.
    *   **Result:** Verified successful QR rendering on iOS and Android devices.
*   **Workflow Robustness:**
    *   **Crash Prevention:** Added safe navigation `($json.query.code || '').trim()` to the webhook node in `fidelizacion/canje_qr_workflow.json` to prevent crashes on empty inputs.
    *   **Boolean Logic Fix:** Updated the "Check Status" node to handle `null` values from Supabase as `false` (unredeemed), resolving the issue where valid coupons were rejected.
    *   **Date Format:** Standardized the redemption date timestamp to ISO 8601 (`$now.toISO()`) for Supabase compatibility.
    *   **Mobile Response:** Added `Content-Type: text/html` headers to the webhook response nodes, ensuring the success/error messages render as a beautiful UI card on mobile instead of raw code.
