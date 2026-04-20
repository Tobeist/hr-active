import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckoutView } from '@/components/CheckoutView';

export const metadata = { title: 'Checkout — HR Active' };

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          marginTop: 68,
          minHeight: 'calc(100vh - 68px)',
          padding: '60px 40px 80px'
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1
            className="display"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1, marginBottom: 40 }}
          >
            Checkout
          </h1>
          <CheckoutView />
        </div>
      </main>
      <Footer />
    </>
  );
}
