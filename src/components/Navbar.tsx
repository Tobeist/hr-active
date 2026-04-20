'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export function Navbar() {
  const { count } = useCart();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-[18px] border-b border-gray-100 max-md:px-5 max-md:py-3.5"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <Link
        href="/"
        className="text-ink no-underline"
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontWeight: 900,
          fontSize: 26,
          letterSpacing: '0.08em'
        }}
      >
        HR ACTIVE
      </Link>

      <div className="flex items-center gap-6">
        <button aria-label="Buscar" className="bg-transparent border-0 cursor-pointer p-1.5 text-ink flex items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button aria-label="Menú" className="bg-transparent border-0 cursor-pointer p-1.5 text-ink flex items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          href="/carrito"
          aria-label="Carrito"
          className="relative bg-transparent border-0 cursor-pointer p-1.5 text-ink flex items-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span
            className="absolute -top-0.5 -right-0.5 bg-ink text-white rounded-full flex items-center justify-center font-semibold"
            style={{ width: 16, height: 16, fontSize: 10 }}
          >
            {count}
          </span>
        </Link>
      </div>
    </nav>
  );
}
