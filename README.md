# HR Active — Fase 1

Tienda web de HR Active: Next.js 14 App Router + TypeScript + Tailwind + Supabase.
Esta fase cubre **landing pública + página de producto + carrito en localStorage**.
Fase 2: Stripe Checkout. Fase 3: Panel admin.

## Lo que incluye

- Landing 1:1 con el demo aprobado (`hero-split`, countdown real, grid de 4 productos, modal).
- Página dedicada `/producto/[slug]` con mismo detalle que el modal (buena para SEO/share).
- Modal al clickear cualquier producto del grid (con Escape, click-outside y thumb gallery).
- Carrito en `localStorage` (contador en navbar).
- Supabase schema + seed de los 4 productos.
- **Fallback**: si aún no configuras Supabase, la landing renderiza con datos locales idénticos al demo.

## Setup local

```bash
cd hr-active
npm install
cp .env.local.example .env.local   # opcional en esta fase
npm run dev
```

Abre http://localhost:3000 — debería verse igual al demo HTML, pero con Next.

### Conectar Supabase (cuando quieras datos reales)

1. Crea proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor**, corre primero `supabase/schema.sql`, después `supabase/seed.sql`.
3. En **Project Settings → API**, copia `URL` y `anon key` a `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # para admin en Fase 3
```

4. Reinicia `npm run dev`. La landing ahora lee de Supabase.

El countdown se configura en la tabla `configuracion.countdown_end` (una sola fila, `id=1`).
Si no hay Supabase o la config está vacía, cae a "ahora + 72h".

## Estructura

```
hr-active/
├── supabase/
│   ├── schema.sql          # tablas, RLS, configuración singleton
│   └── seed.sql            # los 4 productos con tallas
├── src/
│   ├── app/
│   │   ├── layout.tsx      # fonts (Barlow Condensed + Inter), providers
│   │   ├── page.tsx        # landing
│   │   ├── globals.css     # estilos que espejan el demo
│   │   ├── not-found.tsx
│   │   └── producto/[slug]/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSplit.tsx
│   │   ├── Countdown.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductMock.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductModal.tsx
│   │   ├── ProductModalProvider.tsx
│   │   ├── CartProvider.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── types.ts
│       ├── data.ts          # getProductos, getConfiguracion (+ fallback)
│       └── supabase/
│           ├── server.ts
│           └── client.ts
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Notas de diseño

- Tipografía display: **Barlow Condensed** (reemplazo libre de Eurostile).
- Los mocks de producto (Classic/Dream/Sleeves/Tank) están hechos en CSS puro con la clase `.product-mock` + modificador `.mock-*`. Cuando reemplaces por fotos reales, cambia el render dentro de `ProductMock.tsx` y los registros de `productos` (agregar filas en `productos_imagenes`).
- Cuando `productos_tallas.stock === 0`, la talla queda tachada automáticamente en el modal/página.
- Cuando el total de stock ≤ 3, aparece la alerta pulsante "Solo quedan X piezas".

## Deploy a Vercel

```bash
vercel
```

Configura las 3 variables de entorno en el dashboard de Vercel antes del primer deploy.

## Siguiente (Fase 2)

- `/carrito` y `/checkout`.
- API route `POST /api/checkout` → Stripe Checkout Session.
- Webhook `POST /api/stripe/webhook` → marca orden como pagada y descuenta stock.
- Página `/orden/[id]` de confirmación.
