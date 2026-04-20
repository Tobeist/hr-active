'use client';

import { useEffect, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

interface Props {
  endIso: string;
  variant?: 'dark' | 'light';
}

export function Countdown({ endIso, variant = 'dark' }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const end = new Date(endIso).getTime();
  const diff = now == null ? 0 : Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const borderColor = variant === 'dark' ? 'rgba(255,255,255,0.15)' : 'var(--gray-100)';

  return (
    <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: 20 }}>
      <div
        className="mb-2.5 font-semibold"
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.6
        }}
      >
        La oferta termina en
      </div>
      <div
        className="flex gap-4"
        style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 700 }}
      >
        <Unit n={days} label="Días" />
        <Unit n={hours} label="Horas" />
        <Unit n={mins} label="Min" />
        <Unit n={secs} label="Seg" />
      </div>
    </div>
  );
}

function Unit({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        style={{
          fontSize: 40,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {pad(n)}
      </span>
      <span
        className="mt-1 font-medium"
        style={{ fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}
      >
        {label}
      </span>
    </div>
  );
}
