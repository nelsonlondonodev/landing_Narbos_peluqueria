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