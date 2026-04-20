import Link from 'next/link';

interface Props {
  ctaPrice: number;
}

export function HeroSplit({ ctaPrice }: Props) {
  return (
    <section
      className="hero grid"
      style={{
        marginTop: 68,
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 68px)'
      }}
    >
      <div className="hero-side hero-black">
        <div className="hero-visual">HR</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-eyebrow">Colección 01 — Disponible</div>
          <h1 className="display hero-title">
            Chase<br />goals,<br />not trends.
          </h1>
          <div className="hero-slogan">— HR Active / SS26</div>
        </div>

        <div className="hero-bottom" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="#productos" className="cta cta-white">
            Comprar ahora — ${ctaPrice}
          </Link>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Envío</span>
              <span className="hero-meta-value">Nacional · 3–5 días</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Pago seguro</span>
              <span className="hero-meta-value">Tarjeta vía Stripe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-side hero-white">
        <div className="hero-visual">01</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-eyebrow">Dream Catcher Tee</div>
          <h1 className="display hero-title" style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}>
            Discipline.<br />Work.<br />Persist.<br />Achieve.
          </h1>
          <div className="hero-slogan">Diseño tipográfico — Edición limitada</div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
            <span className="stars">★★★★★</span>
            <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>4.9 · 127 reseñas</span>
          </div>
          <Link href="#productos" className="cta cta-black">
            Ver colección
          </Link>
        </div>
      </div>
    </section>
  );
}
