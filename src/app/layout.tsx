import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { ProductModalProvider } from '@/components/ProductModalProvider';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display'
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'HR Active — Chase goals, not trends',
  description:
    'Ropa deportiva minimalista. Diseñada en Monterrey. Chase goals, not trends.',
  openGraph: {
    title: 'HR Active — Chase goals, not trends',
    description: 'Ropa deportiva minimalista. Diseñada en Monterrey.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), -apple-system, sans-serif' }}>
        <CartProvider>
          <ProductModalProvider>{children}</ProductModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
