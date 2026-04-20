'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Producto } from '@/lib/types';
import { ProductModal } from './ProductModal';

interface Ctx {
  open: (p: Producto) => void;
  close: () => void;
}

const Context = createContext<Ctx | null>(null);

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [producto, setProducto] = useState<Producto | null>(null);

  const open = useCallback((p: Producto) => setProducto(p), []);
  const close = useCallback(() => setProducto(null), []);

  useEffect(() => {
    if (producto) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [producto]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (producto) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [producto, close]);

  return (
    <Context.Provider value={{ open, close }}>
      {children}
      {producto && <ProductModal producto={producto} onClose={close} />}
    </Context.Provider>
  );
}

export function useProductModal() {
  const v = useContext(Context);
  if (!v) throw new Error('useProductModal fuera de provider');
  return v;
}
