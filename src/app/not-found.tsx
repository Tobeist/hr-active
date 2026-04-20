import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          marginTop: 68,
          minHeight: 'calc(100vh - 68px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 40,
          textAlign: 'center'
        }}
      >
        <h1 className="display" style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 1 }}>
          404
        </h1>
        <p style={{ color: 'var(--gray-500)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 13 }}>
          Esta pieza ya no está disponible
        </p>
        <Link href="/" className="cta cta-black">Volver al inicio</Link>
      </main>
      <Footer />
    </>
  );
}
