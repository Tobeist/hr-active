import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductDetail } from '@/components/ProductDetail';
import { getProductoBySlug, getProductos } from '@/lib/data';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Params {
  params: { slug: string };
}

export async function generateStaticParams() {
  const productos = await getProductos();
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await getProductoBySlug(params.slug);
  if (!p) return { title: 'Producto no encontrado — HR Active' };
  return {
    title: `${p.nombre} — HR Active`,
    description: p.descripcion ?? undefined
  };
}

export default async function ProductoPage({ params }: Params) {
  const producto = await getProductoBySlug(params.slug);
  if (!producto) notFound();

  return (
    <>
      <Navbar />
      <main
        style={{
          marginTop: 68,
          padding: '40px 20px 80px',
          minHeight: 'calc(100vh - 68px)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          className="modal"
          style={{
            position: 'static',
            maxHeight: 'none',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
          }}
        >
          <ProductDetail producto={producto} variant="page" />
        </div>
      </main>
      <Footer />
    </>
  );
}
