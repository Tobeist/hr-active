'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CartItem } from '@/lib/types';
import { ProductMock } from './ProductMock';

interface OrdenLocal {
  id: string;
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
    cp: string;
  };
  items: CartItem[];
  subtotal: number;
  envio: number;
  total: number;
  fecha: string;
}

export function OrdenConfirmacion({ id }: { id: string }) {
  const [orden, setOrden] = useState<OrdenLocal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`orden:${id}`);
      if (raw) setOrden(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 60, color: 'var(--gray-500)' }}>Cargando orden…</div>
    );
  }

  if (!orden) {
    return (
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <h1
          className="display"
          style={{ fontSize: 'clamp(44px, 7vw, 72px)', lineHeight: 1, marginBottom: 20 }}
        >
          No encontramos la orden
        </h1>
        <p style={{ color: 'var(--gray-700)', marginBottom: 32 }}>
          Es posible que la orden haya sido creada en otro dispositivo. En Fase 2, las
          órdenes se guardan en Supabase y se pueden consultar desde cualquier lado.
        </p>
        <Link href="/" className="cta cta-black">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--black)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}
        >
          <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M20 7 9 18l-5-5" />
          </svg>
        </div>
        <h1
          className="display"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1, marginBottom: 16 }}
        >
          ¡Orden confirmada!
        </h1>
        <p
          style={{
            color: 'var(--gray-500)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontSize: 12,
            fontWeight: 600
          }}
        >
          Orden #{orden.id}
        </p>
        <p style={{ color: 'var(--gray-700)', marginTop: 12 }}>
          Te enviamos un correo de confirmación a <strong>{orden.cliente.email}</strong>.
          En cuanto tu pieza salga del taller, recibirás el número de guía.
        </p>
      </div>

      <div className="stub-notice" style={{ marginBottom: 32 }}>
        <strong>Demo:</strong> esta orden sólo vive en tu navegador (sessionStorage).
        Con Stripe + Supabase en Fase 2, se guarda real y la envías por correo al cliente.
      </div>

      <div
        style={{
          border: '1px solid var(--gray-100)',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginBottom: 32
        }}
      >
        <div>
          <div className="form-title">Productos</div>
          {orden.items.map((item) => (
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

          <div style={{ marginTop: 16 }}>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${orden.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{orden.envio === 0 ? 'Gratis' : `$${orden.envio}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${orden.total}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="form-title">Envío a</div>
          <div style={{ color: 'var(--gray-700)', lineHeight: 1.7, fontSize: 14, marginTop: 12 }}>
            <div>
              <strong>{orden.cliente.nombre}</strong>
            </div>
            <div>{orden.cliente.direccion}</div>
            <div>
              {orden.cliente.ciudad}, {orden.cliente.estado} · CP {orden.cliente.cp}
            </div>
            <div>{orden.cliente.telefono}</div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/" className="cta cta-black">
          Seguir viendo la colección
        </Link>
      </div>
    </div>
  );
}
