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

### 📝 Últimas Actualizaciones (26 de diciembre, 2025)
- **Optimización de Rendimiento (Performance):**
    - **Migración a WebP:** Se convirtieron todas las imágenes de los artículos del blog a formato **WebP**, reduciendo significativamente el peso de la página sin perder calidad.
    - **Configuración de Servidor Avanzada:** Se optimizó el archivo `.htaccess` implementando:
        - **Compresión Gzip:** Para reducir el tamaño de transferencia de HTML, CSS y JS.
        - **Políticas de Caché Agresivas:** Caché de 1 año para imágenes, fuentes y scripts para cargas instantáneas en visitas recurrentes.
        - **Seguridad:** Cabeceras de seguridad y bloqueo de listado de directorios.
- **SEO & Visibilidad:**
    - **Automatización del Sitemap:** Se creó el script `scripts/generate-sitemap.js` que genera automáticamente el `sitemap.xml` basándose en la base de datos de artículos, asegurando que Google siempre conozca el contenido más nuevo.
    - **Estandarización de Canonical Tags:** Se verificaron y unificaron todas las etiquetas `rel="canonical"` para evitar contenido duplicado.
    - **SEO Local (Chía):** Se optimizaron los títulos H1 y Meta Tags del nuevo artículo de Tendencias 2026 para posicionar mejor en búsquedas locales en Chía.
    - **Meta Descripciones:** Se reescribieron las descripciones para incluir **Llamados a la Acción (CTA)** persuasivos y cumplir con los límites de caracteres de Google.
- **Consistencia Visual y UI:**
    - **Estandarización de Imágenes:** Se unificó el tamaño y comportamiento de las imágenes principales en todos los artículos para garantizar una experiencia visual coherente en móviles, tablets y escritorio.
- **Automatización de Contenido (CLI Tools):**
    - Se mejoró el flujo de trabajo: ahora `npm run build` genera automáticamente el índice del blog y el sitemap actualizado antes de compilar.

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