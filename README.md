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

🛠️ Tecnologías Utilizadas
Este proyecto fue construido utilizando tecnologías web modernas, enfocadas en la eficiencia, el rendimiento y la mantenibilidad.

- **HTML5:** Estructura semántica y accesible.
- **Tailwind CSS:** Framework CSS "utility-first" para un diseño consistente y optimizado.
- **JavaScript (ES6+ Modules):** Arquitectura modular basada en componentes independientes.
- **Node.js Build Pipeline:** Scripting personalizado para optimización de activos y automatización de despliegue.
- **GLightbox:** Para una galería de imágenes interactiva y accesible.