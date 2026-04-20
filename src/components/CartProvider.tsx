'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import type { CartItem } from '@/lib/types';

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (productoId: string, talla: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = 'hr-active-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productoId === item.productoId && i.talla === item.talla
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], cantidad: next[idx].cantidad + item.cantidad };
        return next;
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((productoId: string, talla: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productoId === productoId && i.talla === talla))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((a, i) => a + i.cantidad, 0),
      total: items.reduce((a, i) => a + i.precio * i.cantidad, 0),
      add,
      remove,
      clear
    }),
    [items, add, remove, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart fuera de CartProvider');
  return v;
}
