'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { ProductMock } from './ProductMock';

const SHIPPING_FREE_THRESHOLD = 1500;
const SHIPPING_COST = 149;

export function CheckoutView() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    estado: '',
    cp: ''
  });

  if (items.length === 0 && !submitting) {
    return (
      <div
        style={{
          padding: 60,
          textAlign: 'center',
          border: '1px solid var(--gray-100)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20
        }}
      >
        <p style={{ color: 'var(--gray-700)' }}>
          No tienes nada en el carrito todavía.
        </p>
        <Link href="/#productos" className="cta cta-black">
          Ver colección
        </Link>
      </div>
    );
  }

  const envio = total >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const granTotal = total + envio;

  function onChange(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // STUB: en Fase 2 esto llama a /api/checkout (Stripe Checkout Session)
    // y redirige a la URL que regresa Stripe. Por ahora simulamos.
    const fakeId = 'HR-' + Math.random().toString(36).slice(2, 8).toUpperCase();

    const orden = {
      id: fakeId,
      cliente: form,
      items,
      subtotal: total,
      envio,
      total: granTotal,
      fecha: new Date().toISOString()
    };
    sessionStorage.setItem(`orden:${fakeId}`, JSON.stringify(orden));

    clear();
    router.push(`/orden/${fakeId}`);
  }

  return (
    <div className="checkout-grid">
      <form className="checkout-form" onSubmit={onSubmit}>
        <div className="form-section">
          <div className="form-title">Contacto</div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={onChange('email')}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                required
                value={form.nombre}
                onChange={onChange('nombre')}
              />
            </div>
            <div className="form-field">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                type="tel"
                required
                value={form.telefono}
                onChange={onChange('telefono')}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-title">Dirección de envío</div>
          <div className="form-field">
            <label htmlFor="direccion">Calle y número</label>
            <input
              id="direccion"
              required
              value={form.direccion}
              onChange={onChange('direccion')}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="ciudad">Ciudad</label>
              <input
                id="ciudad"
                required
                value={form.ciudad}
                onChange={onChange('ciudad')}
              />
            </div>
            <div className="form-field">
              <label htmlFor="estado">Estado</label>
              <input
                id="estado"
                required
                value={form.estado}
                onChange={onChange('estado')}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="cp">Código postal</label>
            <input id="cp" required value={form.cp} onChange={onChange('cp')} />
          </div>
        </div>

        <div className="stub-notice">
          <strong>Fase 1 — pago simulado.</strong> La integración de Stripe Checkout
          llega en Fase 2. Por ahora, enviar genera una orden local para validar el
          flujo completo.
        </div>

        <button
          type="submit"
          className="cta cta-black"
          disabled={submitting}
          style={{ width: '100%' }}
        >
          {submitting ? 'Procesando…' : `Pagar $${granTotal}`}
        </button>
      </form>

      <aside className="cart-summary">
        <h2
          className="display"
          style={{ fontSize: 24, letterSpacing: '0.05em', marginBottom: 16 }}
        >
          Tu orden
        </h2>

        {items.map((item) => (
          <div
            key={`${item.productoId}-${item.talla}`}
            className="checkout-mini-item"
          >
            <div className="checkout-mini-thumb">
              <ProductMock mockClass={item.mock_class} mockContent={null} />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{item.nombre}</div>
              <div style={{ color: 'var(--gray-500)', fontSize: 12 }}>
                Talla {item.talla} · ×{item.cantidad}
              </div>
            </div>
            <div style={{ fontWeight: 600 }}>${item.precio * item.cantidad}</div>
          </div>
        ))}

        <div style={{ marginTop: 20 }}>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>{envio === 0 ? 'Gratis' : `$${envio}`}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${granTotal}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
