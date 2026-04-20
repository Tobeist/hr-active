-- HR Active — Schema base
-- Ejecutar en el SQL editor de Supabase

create extension if not exists "uuid-ossp";

-- PRODUCTOS
create table if not exists productos (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  nombre text not null,
  eyebrow text,
  descripcion text,
  precio integer not null,
  precio_old integer,
  badge_tipo text check (badge_tipo in ('best','new','soon')),
  badge_texto text,
  mock_class text not null default 'mock-classic',
  mock_content text,
  rating numeric(2,1) default 5.0,
  reviews integer default 0,
  activo boolean default true,
  orden integer default 0,
  created_at timestamptz default now()
);

-- IMÁGENES
create table if not exists productos_imagenes (
  id uuid primary key default uuid_generate_v4(),
  producto_id uuid references productos(id) on delete cascade,
  url text not null,
  orden integer default 0
);

-- TALLAS / STOCK
create table if not exists productos_tallas (
  id uuid primary key default uuid_generate_v4(),
  producto_id uuid references productos(id) on delete cascade,
  talla text not null,
  stock integer not null default 0,
  unique (producto_id, talla)
);

-- ÓRDENES (lo dejamos listo para Fase 2)
create table if not exists ordenes (
  id uuid primary key default uuid_generate_v4(),
  cliente_nombre text,
  cliente_email text,
  cliente_ciudad text,
  cliente_telefono text,
  direccion text,
  total integer,
  estatus_pago text default 'pendiente',
  stripe_session_id text,
  numero_guia text,
  paqueteria text,
  created_at timestamptz default now()
);

create table if not exists ordenes_items (
  id uuid primary key default uuid_generate_v4(),
  orden_id uuid references ordenes(id) on delete cascade,
  producto_id uuid references productos(id),
  talla text,
  cantidad integer,
  precio_unitario integer
);

-- CONFIGURACIÓN GLOBAL
create table if not exists configuracion (
  id integer primary key default 1,
  countdown_end timestamptz,
  shipping_gratis_threshold integer default 1500,
  constraint singleton check (id = 1)
);

insert into configuracion (id, countdown_end)
values (1, now() + interval '72 hours')
on conflict (id) do nothing;

-- RLS: lectura pública de catálogo
alter table productos enable row level security;
alter table productos_imagenes enable row level security;
alter table productos_tallas enable row level security;
alter table configuracion enable row level security;

drop policy if exists "public read productos" on productos;
create policy "public read productos" on productos for select using (activo = true);

drop policy if exists "public read imagenes" on productos_imagenes;
create policy "public read imagenes" on productos_imagenes for select using (true);

drop policy if exists "public read tallas" on productos_tallas;
create policy "public read tallas" on productos_tallas for select using (true);

drop policy if exists "public read config" on configuracion;
create policy "public read config" on configuracion for select using (true);
