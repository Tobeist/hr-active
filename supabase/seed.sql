-- Seed con los 4 productos del demo

with p as (
  insert into productos (slug, nombre, eyebrow, descripcion, precio, precio_old, badge_tipo, badge_texto, mock_class, mock_content, rating, reviews, orden)
  values
    ('classic-hr-tee',
     'Classic HR Tee',
     'Bestseller · HR Active',
     'La pieza que define la marca. Logo HR bordado en el pecho izquierdo y la firma "Chase goals, not trends" en la espalda. Corte pensado para el día a día y para entrenar.',
     599, 749, 'best', 'Más vendida', 'mock-classic',
     '<div style="font-size:64px; letter-spacing:0.05em;">HR</div>',
     4.9, 127, 1),

    ('dream-catcher-tee',
     'Dream Catcher Tee',
     'Edición limitada',
     'Diseño tipográfico sobre negro puro. Cuatro palabras que resumen el camino: DISCIPLINE, WORK, PERSIST, ACHIEVE. Para quien entiende que los sueños no se atrapan, se construyen.',
     649, null, 'new', 'Nuevo', 'mock-dream',
     '<div class="mock-dream-content"><div class="mock-dream-title">DREAM<br/>CATCHER</div><div class="mock-dream-line"></div><div class="mock-dream-sub">DISCIPLINE<br/>WORK<br/>PERSIST<br/>ACHIEVE</div></div>',
     4.9, 84, 2),

    ('sleeves-edition',
     'Sleeves Edition',
     'Nuevo drop · SS26',
     'Logo HR en ambas mangas y marca completa en la parte baja de la espalda. Diseño asimétrico pensado para quien entrena y quiere que se note la pieza sin gritar.',
     699, null, 'new', 'Nuevo', 'mock-sleeves',
     '<div style="display:flex; flex-direction:column; align-items:center; gap:40px;"><div style="display:flex; gap:80px; opacity:0.5;"><span style="font-size:20px; font-weight:800; letter-spacing:0.1em;">HR</span><span style="font-size:20px; font-weight:800; letter-spacing:0.1em;">HR</span></div><div class="mock-sleeves-hr">HR ACTIVE</div></div>',
     4.7, 32, 3),

    ('hr-tank',
     'HR Tank',
     'Pre-order · Envío en 2 semanas',
     'Tank top para entrenamiento intenso. Logo HR centrado, corte relajado en hombros, largo estándar. Reserva ahora, llega en dos semanas.',
     549, null, 'soon', 'Pre-order', 'mock-tank',
     '<div class="mock-tank-hr">HR</div>',
     5.0, 0, 4)
  returning id, slug
)
insert into productos_tallas (producto_id, talla, stock)
select p.id, t.talla, t.stock
from p
cross join lateral (
  values
    -- classic: stock bajo, XS agotada
    (case when p.slug = 'classic-hr-tee' then 'XS' end, 0),
    (case when p.slug = 'classic-hr-tee' then 'S' end, 1),
    (case when p.slug = 'classic-hr-tee' then 'M' end, 1),
    (case when p.slug = 'classic-hr-tee' then 'L' end, 1),
    (case when p.slug = 'classic-hr-tee' then 'XL' end, 0),
    -- dream: stock medio
    (case when p.slug = 'dream-catcher-tee' then 'XS' end, 1),
    (case when p.slug = 'dream-catcher-tee' then 'S' end, 2),
    (case when p.slug = 'dream-catcher-tee' then 'M' end, 2),
    (case when p.slug = 'dream-catcher-tee' then 'L' end, 2),
    (case when p.slug = 'dream-catcher-tee' then 'XL' end, 1),
    -- sleeves: muy bajo
    (case when p.slug = 'sleeves-edition' then 'S' end, 0),
    (case when p.slug = 'sleeves-edition' then 'M' end, 1),
    (case when p.slug = 'sleeves-edition' then 'L' end, 1),
    (case when p.slug = 'sleeves-edition' then 'XL' end, 0),
    -- tank: pre-order
    (case when p.slug = 'hr-tank' then 'XS' end, 4),
    (case when p.slug = 'hr-tank' then 'S' end, 4),
    (case when p.slug = 'hr-tank' then 'M' end, 4),
    (case when p.slug = 'hr-tank' then 'L' end, 4),
    (case when p.slug = 'hr-tank' then 'XL' end, 4)
) as t(talla, stock)
where t.talla is not null;
