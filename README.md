# Narbo's Salón Spa — Web Oficial

> Sitio web y plataforma de servicios de Narbo's Salón Spa (Chía, Cundinamarca, Colombia). Multi-página estática, generada estáticamente (SSG) y optimizada para performance, SEO y GEO (Generative Engine Optimization).

**Versión actual:** `2.8.18` · **Producción:** [narbossalon.com](https://narbossalon.com) · **Licencia:** ISC

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Flujo de desarrollo](#flujo-de-desarrollo)
- [Build y despliegue](#build-y-despliegue)
- [Documentación adicional](#documentación-adicional)
- [Convenciones para agentes de IA](#convenciones-para-agentes-de-ia)

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Markup | HTML5 multi-página (una página física por ruta, sin SPA router) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) (`css/input.css` → `css/styles.css`) |
| Lógica de cliente | Vanilla JS (ES Modules), sin framework — arquitectura de Componentes/Controladores/Data |
| Build | Node.js (ESM) + [esbuild](https://esbuild.github.io/) + `html-minifier` + SSG propio (`scripts/ssg.js`) |
| Gestor de paquetes | [pnpm](https://pnpm.io/) (ver `pnpm-workspace.yaml`) |
| CI/CD | GitHub Actions → despliegue FTPS a Hostinger |
| Datos externos | Google Places API (horarios y reseñas), YouTube (videos embebidos), Google Maps |

## Estructura del proyecto

```
├── index.html, nosotros.html, contacto.html   # Páginas raíz
├── servicios/                                  # Páginas de servicio (silo SEO por categoría)
│   ├── peluqueria/  barberia/  estetica/  unas-spa/  maquillaje/
├── blog/                                       # Hub de artículos + generador
├── legal/                                      # Cookies y privacidad
├── js/
│   ├── App.js                                  # Orquestador principal (bootstrap de la SPA-like shell)
│   ├── config.js                               # Rutas base, resolución de assets, siteConfig
│   ├── components/                             # UI reutilizable (Navbar, Footer, Modales, Galería...)
│   ├── controllers/                            # Lógica por página/feature (hidratación perezosa)
│   ├── services/                                # Servicios transversales (Analytics, Cookies, UI)
│   └── data/                                   # Fuente de verdad de contenido (servicios, precios, videos...)
├── css/                                        # input.css (fuente) y styles.css (compilado)
├── scripts/                                    # Pipeline de build, SEO y sincronización (Node.js)
├── _templates/                                 # Plantilla HTML para nuevas páginas de servicio
├── database/                                   # SQL de un futuro programa de fidelización (no integrado aún)
├── docs/                                       # Documentación técnica ampliada (ver abajo)
├── dist/                                       # Salida del build (generada, no editar a mano)
└── CHANGELOG.md                                # Historial de releases
```

## Requisitos previos

- Node.js ≥ 18
- [pnpm](https://pnpm.io/installation) (versión fijada en CI: `pnpm/action-setup@v4`, v11)

## Instalación

```bash
git clone https://github.com/nelsonlondonodev/landing_Narbos_peluqueria.git
cd landing_Narbos_peluqueria
pnpm install

cp .env.example .env
# Completa GOOGLE_MAPS_API_KEY en .env con una clave restringida a tu dominio/localhost.
```

`.env` nunca se commitea (está en `.gitignore`); el build la inyecta en tiempo de compilación (ver `scripts/build.js`).

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Compila Tailwind (`input.css` → `styles.css`) en modo watch |
| `pnpm build` | Pipeline completo de producción → genera `dist/` (ver detalle en [docs/BUILD_AND_DEPLOYMENT.md](docs/BUILD_AND_DEPLOYMENT.md)) |
| `pnpm clean` | Elimina `dist/` |
| `pnpm new-post` | Scaffolding interactivo para un nuevo artículo de blog |
| `pnpm generate:blog` | Regenera las páginas del blog a partir de `js/data/articles.js` |
| `pnpm generate:sitemap` | Regenera `sitemap.xml` a partir de las páginas HTML existentes |
| `pnpm generate:hours` | Sincroniza horarios de atención desde Google Places API |
| `pnpm generate:reviews` | Sincroniza reseñas de Google desde Google Places API |
| `pnpm index-now` | Notifica URLs nuevas/actualizadas a Bing/Yandex vía protocolo IndexNow |

## Flujo de desarrollo

1. Levanta un servidor estático simple sobre la raíz del proyecto (p. ej. la extensión Live Server de VS Code) — no hay servidor de desarrollo con recarga en caliente propio.
2. En paralelo, corre `pnpm dev` para recompilar Tailwind al vuelo.
3. Las páginas se hidratan en el cliente vía `js/App.js`, que monta layout (navbar/footer), hero, y usa `IntersectionObserver` para cargar controladores de forma perezosa solo cuando su sección entra en viewport.
4. Para crear una página de servicio nueva, parte de `_templates/service.template.html` y sigue el patrón de estructura documentado en [docs/LAYOUT_GUIDE.md](docs/LAYOUT_GUIDE.md) (crítico para que el header fijo y el menú móvil no se rompan).
5. Arquitectura completa (componentes, controladores, datos, SSG) en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Build y despliegue

- **Build de producción:** `pnpm build` — sincroniza versión, horarios y reseñas de Google, regenera blog y sitemap, y ejecuta el bundling/minificación/SSG hacia `dist/`.
- **Despliegue:** automático vía GitHub Actions (`.github/workflows/deploy.yml`) al hacer push a `main` — construye el proyecto y sube `dist/` a Hostinger por FTPS.
- Detalle completo del pipeline, variables de entorno de CI y troubleshooting en [docs/BUILD_AND_DEPLOYMENT.md](docs/BUILD_AND_DEPLOYMENT.md).

## Documentación adicional

| Documento | Contenido |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Arquitectura de JS (componentes/controladores/datos/servicios), SSG y estrategia de rutas |
| [docs/LAYOUT_GUIDE.md](docs/LAYOUT_GUIDE.md) | Patrón HTML obligatorio de página (header fijo, `#app-wrapper`, z-index) |
| [docs/BUILD_AND_DEPLOYMENT.md](docs/BUILD_AND_DEPLOYMENT.md) | Pipeline de build, CI/CD, variables de entorno y despliegue a Hostinger |
| [docs/SEO_AND_GEO.md](docs/SEO_AND_GEO.md) | Estrategia de SEO técnico, JSON-LD, IndexNow, sitemap y GEO (`llms.txt`) |
| [docs/PLAN_CONTENIDOS_BLOG.md](docs/PLAN_CONTENIDOS_BLOG.md) | Backlog editorial del blog |
| [docs/GMB_ORCHESTRATOR_PLAN.md](docs/GMB_ORCHESTRATOR_PLAN.md) | Propuesta (no implementada) de orquestador de Google Business Profile |
| [CHANGELOG.md](CHANGELOG.md) | Historial de releases, versión por versión |

## Convenciones para agentes de IA

Este repo define restricciones de ejecución para agentes de codificación (evitar comandos de red/autenticación como `git push`/`git pull`) en [.agents/AGENTS.md](.agents/AGENTS.md). Si usas un agente de IA para contribuir, léelo primero.
