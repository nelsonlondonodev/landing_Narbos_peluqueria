# Narbo's Salón Spa - Bitácora de Desarrollo

## Sesión: 4 de enero de 2026
**Objetivo:** Estabilización de la UI, corrección de bugs críticos de navegación y optimización de arquitectura.

### 🛠 Cambios Realizados

#### 1. Visibilidad de Navbar en Chrome
*   **Problema:** Enlaces y botones invisibles en Chrome Desktop debido a la lógica `hidden md:flex`.
*   **Solución:** Se invirtió la lógica a "Desktop-First" (`flex max-md:hidden`).
*   **Arquitectura:** Se creó la clase semántica `.desktop-menu` en CSS para separar utilidades de estilos decorativos.

#### 2. Restauración del Build Pipeline
*   **Problema:** Error `tailwindcss: command not found`. El binario de Tailwind v4 no estaba en `node_modules`.
*   **Solución:** Reinstalación forzada de `@tailwindcss/cli` y `tailwindcss`.
*   **Resultado:** Compilación funcional de `input.css` a `styles.css`.

#### 3. Dropdown de Servicios Robusto
*   **Problema:** El menú de servicios no abría en Chrome ni en tablets (dependencia excesiva de `hover`).
*   **Solución:** Implementación de lógica de **clic** en `UIService.js` con soporte para:
    *   Cierre al hacer clic fuera del menú.
    *   Cierre con tecla `Escape`.
    *   Atributos `aria-expanded` para accesibilidad.

#### 4. Modo Oscuro Reactivo (Fix del Scroll)
*   **Problema:** El sitio solo cambiaba de color después de hacer scroll tras presionar el botón de tema.
*   **Causa:** Uso de `!important` que bloqueaba el redibujado (repaint) inmediato del navegador.
*   **Solución:** Refactorización a **Variables CSS Reactivas**. Ahora el fondo del body muta instantáneamente al cambiar la clase `.dark` en el `html`.

#### 5. Limpieza de Código (Clean Code)
*   **Acción:** Eliminación de clases de fondo redundantes (`bg-brand-light`, `dark:bg-gray-900`) en 10 archivos HTML.
*   **Estado:** El estilo base ahora se controla centralizadamente desde el CSS.

---

### 📅 Pendientes para la próxima sesión
1.  **I18nService:** Reactivar y probar las traducciones en la página de Peluquería (actualmente en modo manual para evitar 404).
2.  **Rutas:** Verificar enlaces y assets en subdirectorios `/servicios/`.
3.  **Refactorización CSS:** Revisar la safelist en `tailwind.config.js` si es necesario tras la migración a v4.
