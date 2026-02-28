# Guía de Diseño y Arquitectura - Narbo's Salón

Esta guía documenta los patrones esenciales para mantener la estabilidad del diseño, especialmente la navegación móvil y el apilamiento de elementos (z-index).

## 1. Estructura de Página (Patrón App Wrapper)

Para garantizar que el menú móvil se muestre siempre por encima del contenido y que las decoraciones flotantes no causen conflictos visuales, **todas las páginas** deben seguir estrictamente esta estructura HTML:

```html
<body>
    <!-- 1. El Header va SIEMPRE fuera del wrapper principal -->
    <!-- Usa la clase estándar .site-header definida en input.css -->
    <header class="site-header">
        <div id="navbar-root"></div>
    </header>

    <!-- 2. Contenedor Principal de la Aplicación -->
    <!-- #app-wrapper tiene padding-top: 90px/110px definido en input.css
         que compensa el header fixed. NUNCA añadir mt- manual aquí. -->
    <div id="app-wrapper" class="relative w-full overflow-x-hidden">
        
        <!-- Migas de pan (si aplica) — aparecen inmediatamente bajo la navbar -->
        <div id="breadcrumbs-root"></div>

        <!-- Contenido Principal -->
        <main>
            <!-- Secciones, Hero, etc. -->
        </main>

        <!-- Pie de página -->
        <div id="footer-root"></div>
    </div>
</body>
```

### ¿Por qué?
- **Menú Móvil (z-110)**: Al estar en el `<header>` fuera del wrapper, vive en el contexto de apilamiento del `<body>`.
- **Contenido (overflow-x-hidden)**: El `#app-wrapper` recorta elementos que se desbordan horizontalmente (como decoraciones animadas) sin recortar accidentalmente elementos fijos como el menú.

## 2. Compensación del Header Fixed — Fuente de Verdad Única

El header es `position: fixed` (90px móvil / 110px escritorio). Para que el contenido no quede oculto detrás de él:

- ✅ **`#app-wrapper` recibe `padding-top: 90px/110px` en `input.css`** — esta es la única fuente de verdad.
- ❌ **El componente `Breadcrumbs.js` NO debe usar `mt-`** — el offset ya lo gestiona el wrapper.
- ❌ **Las secciones hero NO necesitan `mt-`** — fluyen naturalmente después del breadcrumb.

> Los `pt-56 md:pt-64` que aparecen en la sección de contenido de páginas de servicio son para compensar el **hero box flotante** (no el header), y deben mantenerse intactos.

## 3. Clases Estándar

### `.site-header`
Reemplaza la larga lista de clases de utilidad (`fixed w-full z-50...`). Úsala en la etiqueta `<header>`.
- **Ubicación**: `css/input.css`
- **Propiedades clave**: `position: fixed`, `width: 100%`, `z-index: 50`, `height: 90px/110px`.

### `#app-wrapper`
- **Ubicación**: `css/input.css`
- **Propiedades clave**: `padding-top: 90px` (móvil), `110px` (≥768px). Compensa el header fixed.

### `body.mobile-menu-open`
Bloquea el scroll del fondo cuando el menú está abierto. Se gestiona automáticamente desde `MobileMenu.js`.

---
**Nota**: Si creas una nueva página, simplemente copia la estructura de `peluqueria/index.html` para asegurar compatibilidad.
