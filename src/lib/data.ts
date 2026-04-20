import { createServerClient } from './supabase/server';
import type { Producto, Configuracion } from './types';

// Fallback data — usado si Supabase no está configurado todavía,
// para que la landing renderice idéntica al demo desde el primer minuto.
const fallbackProductos: Producto[] = [
  {
    id: 'classic',
    slug: 'classic-hr-tee',
    nombre: 'Classic HR Tee',
    eyebrow: 'Bestseller · HR Active',
    descripcion:
      'La pieza que define la marca. Logo HR bordado en el pecho izquierdo y la firma "Chase goals, not trends" en la espalda. Corte pensado para el día a día y para entrenar.',
    precio: 599,
    precio_old: 749,
    badge_tipo: 'best',
    badge_texto: 'Más vendida',
    mock_class: 'mock-classic',
    mock_content: '<div style="font-size:64px; letter-spacing:0.05em;">HR</div>',
    rating: 4.9,
    reviews: 127,
    activo: true,
    orden: 1,
    tallas: [
      { talla: 'XS', stock: 0 },
      { talla: 'S', stock: 1 },
      { talla: 'M', stock: 1 },
      { talla: 'L', stock: 1 },
      { talla: 'XL', stock: 0 }
    ]
  },
  {
    id: 'dream',
    slug: 'dream-catcher-tee',
    nombre: 'Dream Catcher Tee',
    eyebrow: 'Edición limitada',
    descripcion:
      'Diseño tipográfico sobre negro puro. Cuatro palabras que resumen el camino: DISCIPLINE, WORK, PERSIST, ACHIEVE. Para quien entiende que los sueños no se atrapan, se construyen.',
    precio: 649,
    precio_old: null,
    badge_tipo: 'new',
    badge_texto: 'Nuevo',
    mock_class: 'mock-dream',
    mock_content:
      '<div class="mock-dream-content"><div class="mock-dream-title">DREAM<br/>CATCHER</div><div class="mock-dream-line"></div><div class="mock-dream-sub">DISCIPLINE<br/>WORK<br/>PERSIST<br/>ACHIEVE</div></div>',
    rating: 4.9,
    reviews: 84,
    activo: true,
    orden: 2,
    tallas: [
      { talla: 'XS', stock: 1 },
      { talla: 'S', stock: 2 },
      { talla: 'M', stock: 2 },
      { talla: 'L', stock: 2 },
      { talla: 'XL', stock: 1 }
    ]
  },
  {
    id: 'sleeves',
    slug: 'sleeves-edition',
    nombre: 'Sleeves Edition',
    eyebrow: 'Nuevo drop · SS26',
    descripcion:
      'Logo HR en ambas mangas y marca completa en la parte baja de la espalda. Diseño asimétrico pensado para quien entrena y quiere que se note la pieza sin gritar.',
    precio: 699,
    precio_old: null,
    badge_tipo: 'new',
    badge_texto: 'Nuevo',
    mock_class: 'mock-sleeves',
    mock_content:
      '<div style="display:flex; flex-direction:column; align-items:center; gap:40px;"><div style="display:flex; gap:80px; opacity:0.5;"><span style="font-size:20px; font-weight:800; letter-spacing:0.1em;">HR</span><span style="font-size:20px; font-weight:800; letter-spacing:0.1em;">HR</span></div><div class="mock-sleeves-hr">HR ACTIVE</div></div>',
    rating: 4.7,
    reviews: 32,
    activo: true,
    orden: 3,
    tallas: [
      { talla: 'S', stock: 0 },
      { talla: 'M', stock: 1 },
      { talla: 'L', stock: 1 },
      { talla: 'XL', stock: 0 }
    ]
  },
  {
    id: 'tank',
    slug: 'hr-tank',
    nombre: 'HR Tank',
    eyebrow: 'Pre-order · Envío en 2 semanas',
    descripcion:
      'Tank top para entrenamiento intenso. Logo HR centrado, corte relajado en hombros, largo estándar. Reserva ahora, llega en dos semanas.',
    precio: 549,
    precio_old: null,
    badge_tipo: 'soon',
    badge_texto: 'Pre-order',
    mock_class: 'mock-tank',
    mock_content: '<div class="mock-tank-hr">HR</div>',
    rating: 5.0,
    reviews: 0,
    activo: true,
    orden: 4,
    tallas: [
      { talla: 'XS', stock: 4 },
      { talla: 'S', stock: 4 },
      { talla: 'M', stock: 4 },
      { talla: 'L', stock: 4 },
      { talla: 'XL', stock: 4 }
    ]
  }
];

export async function getProductos(): Promise<Producto[]> {
  const sb = createServerClient();
  if (!sb) return fallbackProductos;

  const { data: productos, error } = await sb
    .from('productos')
    .select('*, productos_tallas(talla, stock)')
    .eq('activo', true)
    .order('orden', { ascending: true });

  if (error || !productos) return fallbackProductos;

  return productos.map((p: any) => ({
    ...p,
    tallas: (p.productos_tallas ?? []).sort(sortTallas)
  })) as Producto[];
}

export async function getProductoBySlug(slug: string): Promise<Producto | null> {
  const sb = createServerClient();
  if (!sb) return fallbackProductos.find((p) => p.slug === slug) ?? null;

  const { data, error } = await sb
    .from('productos')
    .select('*, productos_tallas(talla, stock)')
    .eq('slug', slug)
    .eq('activo', true)
    .maybeSingle();

  if (error || !data) return null;
  return {
    ...data,
    tallas: ((data as any).productos_tallas ?? []).sort(sortTallas)
  } as Producto;
}

export async function getConfiguracion(): Promise<Configuracion> {
  const sb = createServerClient();
  const fallback: Configuracion = {
    countdown_end: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    shipping_gratis_threshold: 1500
  };
  if (!sb) return fallback;
  const { data } = await sb.from('configuracion').select('*').eq('id', 1).maybeSingle();
  if (!data) return fallback;
  return data as Configuracion;
}

const tallaOrden = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
function sortTallas(a: { talla: string }, b: { talla: string }) {
  return tallaOrden.indexOf(a.talla) - tallaOrden.indexOf(b.talla);
}

export function totalStock(p: Producto) {
  return p.tallas.reduce((acc, t) => acc + t.stock, 0);
}
