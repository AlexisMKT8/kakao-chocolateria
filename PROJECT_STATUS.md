# KAKAO Chocolatería · Estado del Proyecto y Guía de Continuación

## 📌 Resumen General
Aplicación web de alta gama para **KAKAO Chocolatería** (Tapalpa, Jalisco).
Arquitectura por rutas y flujos guiados (Mobile-First):
1. **Bandejas ya armadas** (Elige tamaño, listo).
2. **Arma tu propia bandeja** (Wizard interactivo de 3 pasos).
3. **A granel** (Catálogo inline con medidor sticky de 250 g mínimos).
4. **Checkout 1-Tap** con Mercado Pago y confirmación por WhatsApp.
5. **Notificaciones automáticas** (Netlify Webhook con alertas push en ntfy.sh y correo vía Resend/SendGrid al aprobarse el pago).
6. **Panel administrativo CRM** integrado protegido por PIN.

---

## 🚀 Puntos Clave Implementados y Operativos

1. **Pantalla de Entrada Post-Hero (3 Rutas Directas):**
   - Tarjetas de gran formato táctil con subtítulos concisos.
   - Navegación instantánea con botón superior "Volver a opciones".

2. **Flujo "Bandeja ya armada":**
   - Fotos de alta resolución ocupando >= 60% de la altura de la tarjeta.
   - Selector de sabores con la leyenda: *"Mismo precio y cantidad, sin costo extra"*.

3. **Flujo "Arma tu propia bandeja" (Wizard 3 Pasos):**
   - Indicador superior interactivo (`1. Tamaño` → `2. Sabores` → `3. Confirmar`).
   - Control estricto de cupo por tamaño (30, 60 y 140 piezas) y navegación bidireccional.

4. **Flujo "A granel" (Mínimo 250 g):**
   - Barra sticky persistente que calcula gramos en vivo y avisa el progreso visual.
   - Catálogo 100% visible con selectores inline `+ / -`.

5. **Dock Inferior Persistente "Tu pedido":**
   - Conteo y total acumulado siempre visible con botón directo al checkout.
   - Enlace secundario integrado: *"Pedidos especiales por WhatsApp"*.

6. **Notificaciones Webhook de Pago (Netlify Function):**
   - `netlify/functions/mercadopago-webhook.js` procesa eventos IPN.
   - Notifica ÚNICAMENTE cuando `status === 'approved'`.
   - Push: `ntfy.sh` / Email: `Resend` o `SendGrid` sin bloquear la respuesta.

7. **Panel Administrativo CRM:**
   - Protegido por PIN (`1234` o `kakao2026`).
   - Métricas en vivo (Ventas totales, pedidos pendientes, entregados), buscador, filtros y exportación a CSV.

---

## 📁 Rutas de Archivos

- **Espacio de Trabajo Principal:** `c:\Users\lucia\.gemini\antigravity-ide\scratch\kakao-chocolateria\`
- **Sitio en Producción (Netlify):** `https://kakao-chocolateria-tapalpa.netlify.app/`
- **Servidor de Desarrollo Local:** `http://localhost:3000/`

---

*Proyecto actualizado y listo para desplegar.*
