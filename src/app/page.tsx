import { Navbar } from '@/components/Navbar';
import { HeroSplit } from '@/components/HeroSplit';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { getProductos } from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const productos = await getProductos();

  const bestseller = productos.find((p) => p.badge_tipo === 'best') ?? productos[0];

  return (
    <>
      <Navbar />
      <HeroSplit ctaPrice={bestseller?.precio ?? 599} />
      <ProductGrid productos={productos} />
      <Footer />
    </>
  );
}
