import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { OrdenConfirmacion } from '@/components/OrdenConfirmacion';

export const metadata = { title: 'Orden confirmada — HR Active' };

export default function OrdenPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main
        style={{
          marginTop: 68,
          minHeight: 'calc(100vh - 68px)',
          padding: '80px 40px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <OrdenConfirmacion id={params.id} />
      </main>
      <Footer />
    </>
  );
}
