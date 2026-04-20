'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Producto } from '@/lib/types';
import { ProductMock } from './ProductMock';
import { useCart } from './CartProvider';

interface Props {
  producto: Producto;
  onClose?: () => void;
  variant?: 'modal' | 'page';
}

const stars = (rating: number) =>
  '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

export function ProductDetail({ producto: p, onClose, variant = 'modal' }: Props) {
  const { add } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);

  const stockSeleccionado = useMemo(() => {
    if (!selectedSize) return 0;
    return p.tallas.find((t) => t.talla === selectedSize)?.stock ?? 0;
  }, [p, selectedSize]);

  const totalStock = p.tallas.reduce((a, t) => a + t.stock, 0);
  const stockBajo = totalStock <= 3 && p.badge_tipo !== 'soon';

  const discount = p.precio_old
    ? Math.round((1 - p.precio / p.precio_old) * 100)
    : null;

  function handleAdd() {
    if (!selectedSize) return;
    add({
      productoId: p.id,
      slug: p.slug,
      nombre: p.nombre,
      precio: p.precio,
      talla: selectedSize,
      cantidad: qty,
      mock_class: p.mock_class
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose?.();
    }, 600);
  }

  return (
    <>
      <div className="modal-gallery">
        <div className="modal-main-img">
          <ProductMock mockClass={p.mock_class} mockContent={p.mock_content} />
        </div>
        <div className="modal-thumbs">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`modal-thumb ${i === activeThumb ? 'active' : ''}`}
              onClick={() => setActiveThumb(i)}
            >
              <ProductMock mockClass={p.mock_class} mockContent={p.mock_content} />
            </div>
          ))}
        </div>
      </div>

      <div className="modal-info">
        {variant === 'modal' && onClose && (
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        <div>
          <div className="modal-eyebrow">{p.eyebrow}</div>
          <h2 className="display modal-title">{p.nombre}</h2>
        </div>

        <div className="modal-rating">
          <span className="stars">{stars(p.rating)}</span>
          <span>
            {p.reviews === 0 ? 'Sé el primero en reseñar' : `${p.rating} · ${p.reviews} reseñas`}
          </span>
        </div>

        <div className="modal-price">
          <span className="modal-price-now">${p.precio}</span>
          {p.precio_old && <span className="modal-price-old">${p.precio_old}</span>}
          {discount && <span className="modal-price-discount">-{discount}%</span>}
        </div>

        <p className="modal-desc">{p.descripcion}</p>

        {stockBajo && (
          <div className="modal-stock-alert">
            <span className="pulse-dot" />
            Solo quedan {totalStock} piezas
          </div>
        )}

        <div className="size-picker">
          <div className="size-label">
            <span>Talla</span>
            <span className="size-guide">Guía de tallas</span>
          </div>
          <div className="size-options">
            {p.tallas.map((t) => {
              const disabled = t.stock === 0;
              const active = selectedSize === t.talla;
              return (
                <button
                  key={t.talla}
                  className={`size-btn ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`}
                  disabled={disabled}
                  onClick={() => {
                    setSelectedSize(t.talla);
                    setQty(1);
                  }}
                >
                  {t.talla}
                </button>
              );
            })}
          </div>
        </div>

        <div className="qty-row">
          <div className="qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="qty-num">{qty}</span>
            <button
              onClick={() =>
                setQty((q) => (selectedSize ? Math.min(stockSeleccionado, q + 1) : q))
              }
            >
              +
            </button>
          </div>
          <button className="add-btn" disabled={!selectedSize || added} onClick={handleAdd}>
            {added
              ? '¡Agregado!'
              : !selectedSize
              ? 'Selecciona una talla'
              : `Agregar al carrito — $${p.precio * qty}`}
          </button>
        </div>

        {variant === 'modal' && (
          <Link
            href={`/producto/${p.slug}`}
            style={{
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gray-500)',
              textDecoration: 'underline'
            }}
          >
            Ver página completa →
          </Link>
        )}

        <div className="modal-details">
          <DetailRow text="100% algodón peinado, pre-lavado" />
          <DetailRow text="Impresión serigráfica de larga duración" />
          <DetailRow text="Corte regular · Diseñado en Monterrey" />
        </div>
      </div>
    </>
  );
}

function DetailRow({ text }: { text: string }) {
  return (
    <div className="modal-detail-row">
      <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M20 7 9 18l-5-5" />
      </svg>
      <span>{text}</span>
    </div>
  );
}
