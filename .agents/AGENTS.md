# Reglas de Comportamiento del Agente - Narbo's Salón Spa

Para optimizar el uso de tokens y garantizar un desarrollo fluido sin bloqueos de sandbox ni demoras:

## 🚫 Restricciones de Ejecución de Terminal

1.  **Comandos con Autenticación o Red:** El agente **NO** debe intentar ejecutar de forma directa comandos de terminal que realicen conexiones remotas o que requieran credenciales del host (tales como `git push`, `git pull`, `git fetch`).
2.  **Acceso a Base de Datos y Sockets:** El agente **NO** debe intentar ejecutar comandos de base de datos locales o comandos de red que requieran sockets locales si estos presentan problemas de permisos o bloqueos de sandbox.

## 💡 Flujo de Trabajo Alternativo

*   Cuando una operación requiera subir cambios, sincronizar el repositorio o interactuar con servicios del host, el agente **debe redactar el comando exacto en el chat** y pedirle al desarrollador que lo copie y lo ejecute manualmente en la terminal de su sistema local.
*   Esto asegura fluidez inmediata, mantiene al desarrollador con el control absoluto de sus llaves de seguridad y evita el desperdicio innecesario de tokens.
