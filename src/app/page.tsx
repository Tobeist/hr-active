import { Navbar } from '@/components/Navbar';
import { HeroSplit } from '@/components/HeroSplit';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { getProductos, getConfiguracion } from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [productos, config] = await Promise.all([getProductos(), getConfiguracion()]);

  const bestseller = productos.find((p) => p.badge_tipo === 'best') ?? productos[0];
  const countdownEnd =
    config.countdown_end ?? new Date(Date.now() + 72 * 3600 * 1000).toISOString();

  return (
    <>
      <Navbar />
      <HeroSplit countdownEnd={countdownEnd} ctaPrice={bestseller?.precio ?? 599} />
      <ProductGrid productos={productos} />
      <Footer />
    </>
  );
}
