Narbo's Salón Spa - Landing Page Profesional
Este repositorio contiene el código fuente de la página web oficial de Narbo's Salón Spa, una landing page moderna, interactiva y totalmente responsiva, diseñada para atraer y servir a los clientes del salón con una experiencia de usuario excepcional.

Ver Demo en Vivo (https://narbossalon.com/)

✨ Características Principales
Este proyecto no es solo una página web estática, sino una herramienta de marketing digital completa, equipada con funcionalidades avanzadas:

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
- **Migración a Multi-Página:** El proyecto evolucionará de una Landing Page única a una arquitectura web robusta con URLs dedicadas para cada servicio (ej: `/servicios/peluqueria.html`).
- **Actualización de Stack:** Se ha programado la actualización de **Tailwind CSS a la versión v4.x** para enero de 2026.
    - *Nota:* Se ha **congelado** la refactorización profunda de CSS (safelist/config) hasta esa fecha para garantizar la estabilidad del sitio durante la temporada de fin de año.

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