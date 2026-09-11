"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IVA_RATE, type Service } from "@/lib/catalog";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  category: string;
  unit?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  hydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (service: Service, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  iva: number;
  total: number;
};

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "almx-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const add = useCallback((service: Service, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === service.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === service.slug ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [
        ...prev,
        {
          slug: service.slug,
          name: service.name,
          price: service.price,
          category: service.category,
          unit: service.unit,
          qty,
        },
      ];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal, iva, total } = useMemo(() => {
    const c = lines.reduce((acc, l) => acc + l.qty, 0);
    const s = lines.reduce((acc, l) => acc + l.qty * l.price, 0);
    const i = Math.round(s * IVA_RATE * 100) / 100;
    return { count: c, subtotal: s, iva: i, total: s + i };
  }, [lines]);

  const value: CartState = {
    lines,
    isOpen,
    hydrated,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add,
    remove,
    setQty,
    clear,
    count,
    subtotal,
    iva,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
