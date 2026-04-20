'use client';

import type { Producto } from '@/lib/types';
import { totalStock } from '@/lib/data';
import { ProductMock } from './ProductMock';
import { useProductModal } from './ProductModalProvider';

interface Props {
  producto: Producto;
}

const stars = (rating: number) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export function ProductCard({ producto: p }: Props) {
  const { open } = useProductModal();
  const isDark = p.mock_class === 'mock-dream' || p.mock_class === 'mock-sleeves';
  const stock = totalStock(p);
  const stockBarBg = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
  const stockColor = p.badge_tipo === 'soon' ? 'var(--black)' : '#dc2626';
  const stockPercent = p.badge_tipo === 'soon' ? 70 : Math.min(100, Math.max(8, stock * 5));
  const stockLabelColor = isDark ? 'var(--white)' : undefined;

  const stockText =
    p.badge_tipo === 'soon' ? (
      <>
        <span>Pre-order</span>
        <span>Envío en 2 sem.</span>
      </>
    ) : stock <= 3 ? (
      <>
        <span>Stock bajo</span>
        <span>Últimas {stock} piezas</span>
      </>
    ) : (
      <>
        <span>En stock</span>
        <span>{stock} piezas</span>
      </>
    );

  return (
    <div className="product" onClick={() => open(p)}>
      <div className="product-img">
        {p.badge_texto && p.badge_tipo && (
          <div className="badges">
            <span className={`badge badge-${p.badge_tipo}`}>{p.badge_texto}</span>
          </div>
        )}
        <ProductMock mockClass={p.mock_class} mockContent={p.mock_content} />
        <div className="stock-wrap">
          <div className="stock-label" style={{ color: stockLabelColor }}>
            {stockText}
          </div>
          <div className="stock-bar" style={{ background: stockBarBg }}>
            <div
              className="stock-fill"
              style={{ width: `${stockPercent}%`, background: stockColor }}
            />
          </div>
        </div>
      </div>
      <div className="product-info">
        <div className="product-name">{p.nombre}</div>
        <div className="product-meta">
          <div>
            <span className="product-price">${p.precio}</span>
            {p.precio_old && <span className="product-price-old">${p.precio_old}</span>}
          </div>
          <div className="rating">
            <span className="stars">{stars(p.rating)}</span>
            <span>{p.reviews === 0 ? 'Nuevo' : p.reviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
