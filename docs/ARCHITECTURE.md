# Arquitectura

Este documento describe cómo está construido el frontend: no es una SPA ni usa un framework de componentes — es un sitio HTML multi-página con una capa de JS vanilla (ES Modules) que hidrata cada página de forma perezosa.

## Principios de diseño

1. **HTML como fuente de verdad de contenido crítico (SEO/LCP).** El hero, los meta tags y el JSON-LD viven directamente en cada `.html` — no dependen de JS para renderizarse, así los crawlers y el LCP no esperan a que cargue el bundle.
2. **JS solo para interactividad e hidratación.** `js/App.js` monta layout compartido (navbar, footer, breadcrumbs) y usa lazy hydration para todo lo demás.
3. **Datos separados de presentación.** Todo el contenido variable (precios, servicios, videos, artículos) vive en `js/data/*.js` como objetos planos, nunca hardcodeado dentro de componentes.
4. **Un único punto de resolución de rutas/assets** (`js/config.js`) para que el sitio funcione igual en local (file://, Live Server), GitHub Pages y producción (`narbossalon.com`).

## Punto de entrada: `js/App.js`

`App` es la clase que orquesta el arranque de cada página:

- **`_checkIfHomePage()`** determina si la página actual es Home, para decidir si carga `HomeHubController`.
- **`mountLayout()`** inyecta navbar/footer/contact-form en los contenedores `#navbar-root`, `#footer-root`, `#contact-root` si están vacíos.
- **`mountHero()`** busca en `pagesData` (por coincidencia de path) los datos del hero y los renderiza.
- **`initCoreComponents()`** instancia siempre: `MobileMenu`, `WhatsAppButton`, `HeaderController`, `PageTransitionController`, `HoursController`, `StoreBadge`.
- **`initInteractiveComponents()` + `observeAndInit()`**: patrón de **hidratación perezosa** — usa `IntersectionObserver` para hacer `import()` dinámico de un controlador/componente solo cuando su selector (`#gallery-root`, `#faq`, `#reviews-slider-wrapper`, etc.) entra en el viewport. Esto evita cargar JS de secciones que el usuario nunca llega a ver.
- **`resolvePath()` / `resolveDeep()`**: resuelven URLs de rutas y assets (incluye `src`, `poster`, `subImages`) contra el `appRoot` calculado en runtime.

## Capas de `js/`

| Carpeta | Responsabilidad | Ejemplos |
|---|---|---|
| `components/` | UI reutilizable, sin estado de negocio complejo, exporta funciones `getXHTML()` o clases con `.render()` | `Navbar.js`, `ServiceCard.js`, `YouTubeGallery.js`, `VideoModal.js` |
| `controllers/` | Lógica de una página o feature concreta; se instancian una vez montado el DOM correspondiente | `HomeHubController.js`, `BlogController.js`, `OxidationCalculator.js` |
| `services/` | Transversales a toda la app, no atados a una página | `AnalyticsService.js`, `CookieConsentService.js`, `UIService.js` |
| `data/` | Contenido puro (arrays/objetos), sin lógica de render | `servicesData.js`, `pagesData.js`, `videoData.js`, `masterPrices.js` |

Convención de nombres: los hubs de página siguen el patrón `<Área>HubController.js` (`HairHubController`, `NailsHubController`, `BarberHubController`, `EstheticsHubController`, `AboutHubController`, `HomeHubController`).

## `js/config.js`: resolución de entorno y rutas

- `getEnvironmentConfig()` detecta si se está en GitHub Pages, producción (`narbossalon.com`), `file://` local o `localhost`, y decide si las rutas necesitan sufijo `.html` explícito (`needsHtmlExtension`).
- `BASE_PATH` antepone el nombre del repo (`/landing_Narbos_peluqueria`) solo cuando se sirve desde GitHub Pages.
- `resolveRoute(path, prefix)` normaliza y resuelve enlaces de navegación.
- `resolveAsset(path, prefix)` resuelve imágenes/videos/fuentes, dejando intactas las URLs absolutas o `data:`.
- `siteConfig` centraliza versión, redes sociales y datos de contacto (teléfono, WhatsApp, dirección, IDs de Analytics/Maps).

> La versión en `siteConfig.version` se sincroniza automáticamente desde `package.json` vía `scripts/apply-version.js` — no se edita a mano.

## Generación estática (SSG): `scripts/ssg.js`

Antes de servir en producción, `scripts/build.js` invoca un SSG propio (`scripts/ssg.js`) que:

- Importa directamente los mismos módulos de `js/components/` y `js/data/` que usa el cliente (Navbar, Footer, HeroSection, ServiceCard, ArticleCard, HomeModals) usando `JSDOM`.
- Pre-renderiza el HTML de esas secciones **dentro** de los archivos `.html` de `dist/`, para que el contenido crítico (grids de servicios, cards de artículos) esté presente sin esperar hidratación en cliente — mejora LCP/CLS y indexabilidad.
- El JS del lado del cliente sigue montando/hidratando el resto de forma perezosa como se describe arriba; el SSG solo adelanta el HTML inicial.

## Páginas de servicio y plantillas

- Cada categoría de servicio (`servicios/peluqueria/`, `servicios/barberia/`, `servicios/estetica/`, `servicios/unas-spa/`, `servicios/maquillaje/`) sigue una estrategia de **silo SEO**: un índice de categoría + páginas hijas por servicio específico.
- Las páginas nuevas deben partir de `_templates/service.template.html` y respetar la estructura de `#app-wrapper` / `.site-header` documentada en [`LAYOUT_GUIDE.md`](LAYOUT_GUIDE.md) — es la fuente de verdad para evitar romper el menú móvil o el offset del header fijo.

## Estilos

- `css/input.css` es la fuente (Tailwind v4 + utilidades custom como `.site-header`, `#app-wrapper`).
- `css/styles.css` es el artefacto compilado (`pnpm dev` para watch, `pnpm build` para producción con purga).

## Ver también

- [`LAYOUT_GUIDE.md`](LAYOUT_GUIDE.md) — patrón HTML obligatorio por página.
- [`BUILD_AND_DEPLOYMENT.md`](BUILD_AND_DEPLOYMENT.md) — cómo `ssg.js` y el resto del pipeline producen `dist/`.
