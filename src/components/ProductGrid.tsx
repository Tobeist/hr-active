import type { Producto } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface Props {
  productos: Producto[];
}

export function ProductGrid({ productos }: Props) {
  return (
    <section id="productos" className="section">
      <div className="section-header">
        <h2 className="display section-title">La colección</h2>
        <span className="section-sub">{productos.length} piezas disponibles</span>
      </div>

      <div className="grid-products">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </section>
  );
}
