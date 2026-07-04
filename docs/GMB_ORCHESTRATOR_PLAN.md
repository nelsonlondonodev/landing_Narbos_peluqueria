# 🚀 Plan de Implementación: Orquestador GMB/GBP (Narbo's Salon Spa)

Este plan detalla la infraestructura técnica para que la IA (Antigravity) pueda actuar como orquestador total de la ficha de Google Business Profile de Narbo's Salon Spa.

## 🎯 Objetivos
1.  **Publicación Inteligente:** Crear posts (Novedades, Ofertas, Eventos) directamente desde el entorno de desarrollo.
2.  **Gestión de Reseñas:** Notificación, análisis de sentimiento y generación de respuestas automáticas/semiautomáticas con el tono premium de la marca.
3.  **Analítica Mensual:** Extracción de métricas (clics, llamadas, búsquedas) para generar informes ejecutivos automáticos.
4.  **Omnicanalidad:** Sincronización entre Google y los canales internos (WhatsApp/Ventas).

---

## 🛠️ Fase 1: Infraestructura de Conectividad (Hoy)

### 1. Script Core (`scripts/gmb-orchestrator.js`)
Crearemos un motor en Node.js que sirva como "cerebro" para las llamadas a la API de Google.
*   **Métodos:** `listReviews()`, `replyReview()`, `createPost()`, `getInsights()`.
*   **Seguridad:** Uso estricto de variables de entorno `.env`.

### 2. Variables de Entorno (`.env`)
Añadiremos los campos necesarios para la integración:
*   `GOOGLE_CLOUD_PROJECT_ID`
*   `GOOGLE_BUSINESS_LOCATION_ID`
*   `GOOGLE_OAUTH_REFRESH_TOKEN`
*   `GOOGLE_CLIENT_ID`
*   `GOOGLE_CLIENT_SECRET`

### 3. Flujo n8n (`fidelizacion/Google_Business_Orchestrator.json`)
Diseñaremos el template del flujo que Nelson deberá importar en su instancia de n8n para:
*   **Cron Job:** Revisar nuevas reseñas cada 24 horas.
*   **Trigger de IA:** Enviar la reseña a un nodo de IA para redactar la respuesta.
*   **Confirmación:** Notificar a Nelson por WhatsApp antes de publicar la respuesta definitiva.

---

## 🤖 Fase 2: Inteligencia Artificial y Tono de Marca

Utilizaremos el modelo de lenguaje de Antigravity para asegurar que cada interacción suene "Premium / Narbo's":
*   **Prompt Engineering:** Definición de un `BusinessPersona` para el salón (Elegante, Cercano, Profesional).
*   **Multilenguaje:** Respuestas automáticas en el idioma de la reseña (Español/Inglés).

---

## 📊 Fase 3: Reportes Ejecutivos

Crearemos un generador de reportes en Markdown/PDF que analice:
*   **CTR local:** Ratio de clics vs visualizaciones.
*   **Sentiment Analysis:** Evolution of customer satisfaction based on review text.

---

## 📋 Próximos pasos para Nelson (Acciones Requeridas)
Para que este orquestador cobre vida, Nelson debe:
1.  **Habilitar la API:** Acceder a [Google Cloud Console](https://console.cloud.google.com/) y activar la "Google Business Profile API".
2.  **Crear Credenciales:** Generar un Client ID y Client Secret de OAuth 2.0.
3.  **Obtener el Location ID:** ID único de la sede de Narbo's en Chía.

---

¿Nelson, aprobamos el inicio de la Fase 1 (creación del esqueleto del código)?
