'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';
import { ProductMock } from './ProductMock';

const SHIPPING_FREE_THRESHOLD = 1500;

export function CartView() {
  const { items, total, remove, add, clear } = useCart();

  if (items.length === 0) {
    return (
      <div
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          border: '1px solid var(--gray-100)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gray-500)',
            fontWeight: 600
          }}
        >
          Tu carrito está vacío
        </div>
        <p style={{ color: 'var(--gray-700)', maxWidth: 400 }}>
          Chase goals, not trends. Elige tu pieza y empieza el camino.
        </p>
        <Link href="/#productos" className="cta cta-black">
          Ver colección
        </Link>
      </div>
    );
  }

  const shippingFree = total >= SHIPPING_FREE_THRESHOLD;
  const faltaEnvioGratis = Math.max(0, SHIPPING_FREE_THRESHOLD - total);

  return (
    <div className="cart-grid">
      <div className="cart-items">
        {items.map((item) => (
          <div key={`${item.productoId}-${item.talla}`} className="cart-row">
            <div className="cart-thumb">
              <ProductMock mockClass={item.mock_class} mockContent={null} />
            </div>

            <div className="cart-info">
              <span className="cart-name">{item.nombre}</span>
              <div className="cart-meta">
                Talla <strong>{item.talla}</strong>
              </div>

              <div className="cart-actions">
                <div className="qty">
                  <button
                    onClick={() =>
                      item.cantidad === 1
                        ? remove(item.productoId, item.talla)
                        : add({ ...item, cantidad: -1 })
                    }
                  >
                    −
                  </button>
                  <span className="qty-num">{item.cantidad}</span>
                  <button onClick={() => add({ ...item, cantidad: 1 })}>+</button>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => remove(item.productoId, item.talla)}
                >
                  Quitar
                </button>
              </div>
            </div>

            <div className="cart-price">
              ${item.precio * item.cantidad}
              {item.cantidad > 1 && (
                <span className="cart-price-unit">${item.precio} c/u</span>
              )}
            </div>
          </div>
        ))}

        <button className="cart-clear" onClick={clear}>
          Vaciar carrito
        </button>
      </div>

      <aside className="cart-summary">
        <h2
          className="display"
          style={{ fontSize: 24, letterSpacing: '0.05em', marginBottom: 20 }}
        >
          Resumen
        </h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="summary-row">
          <span>Envío</span>
          <span>{shippingFree ? 'Gratis' : 'Calculado en checkout'}</span>
        </div>

        {!shippingFree && (
          <div className="shipping-hint">
            Agrega <strong>${faltaEnvioGratis}</strong> más y tu envío es gratis.
          </div>
        )}

        <div className="summary-total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <Link
          href="/checkout"
          className="cta cta-black"
          style={{ width: '100%', marginTop: 24 }}
        >
          Ir al checkout
        </Link>

        <Link
          href="/#productos"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gray-500)',
            textDecoration: 'underline'
          }}
        >
          Seguir comprando
        </Link>
      </aside>
    </div>
  );
}
