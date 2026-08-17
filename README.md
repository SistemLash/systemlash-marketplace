# System LASH — Marketplace

Landing pública para promocionar los sistemas de System LASH (empezando con Llantera ZonaX). Separado del CRM y del POS a propósito: un cambio aquí nunca puede tronar ninguno de los otros dos.

## Antes de publicar

Edita `src/data/config.js`:
- `WHATSAPP_NUMBER` — tu número real (código de país + 10 dígitos, sin signos ni espacios)
- `FACEBOOK_URL` — tu página de Facebook real

Cuando tengas un nuevo vertical (barbería, gimnasio, etc.) listo, solo agrega una entrada nueva al array `VERTICALES` en ese mismo archivo — nada de tocar componentes.

## Desarrollo local

```
npm install
npm run dev
```

## Deploy en Vercel

1. Sube esta carpeta como repo nuevo en GitHub
2. En Vercel: "Add New Project" → importa el repo → Vercel detecta Vite automáticamente → Deploy
