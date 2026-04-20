export type BadgeTipo = 'best' | 'new' | 'soon';
export type MockClass = 'mock-classic' | 'mock-dream' | 'mock-sleeves' | 'mock-tank';

export interface Talla {
  talla: string;
  stock: number;
}

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  eyebrow: string | null;
  descripcion: string | null;
  precio: number;
  precio_old: number | null;
  badge_tipo: BadgeTipo | null;
  badge_texto: string | null;
  mock_class: MockClass;
  mock_content: string | null;
  rating: number;
  reviews: number;
  activo: boolean;
  orden: number;
  tallas: Talla[];
}

export interface Configuracion {
  countdown_end: string | null;
  shipping_gratis_threshold: number;
}

export interface CartItem {
  productoId: string;
  slug: string;
  nombre: string;
  precio: number;
  talla: string;
  cantidad: number;
  mock_class: MockClass;
}
