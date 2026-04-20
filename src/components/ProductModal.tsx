'use client';

import type { Producto } from '@/lib/types';
import { ProductDetail } from './ProductDetail';

interface Props {
  producto: Producto;
  onClose: () => void;
}

export function ProductModal({ producto, onClose }: Props) {
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <ProductDetail producto={producto} onClose={onClose} variant="modal" />
      </div>
    </div>
  );
}
