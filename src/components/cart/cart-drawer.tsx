"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatMXN } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, remove, subtotal, iva, total, count } =
    useCart();

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[80] cursor-default bg-ink/45 backdrop-blur-[2px] transition-opacity duration-500",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-[85] flex h-full w-full max-w-[27rem] flex-col border-l border-forest/15 bg-cream transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-forest/12 px-6 py-5">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-[1.5rem] leading-none text-ink">
              Tu carrito
            </h2>
            <span className="num text-[0.7rem] text-brass">
              {String(count).padStart(2, "0")}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center text-forest transition-colors hover:bg-forest/8"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
            <ShoppingBag className="h-8 w-8 text-forest/25" strokeWidth={1} />
            <p className="text-[0.92rem] leading-relaxed text-forest-soft">
              Todavía no has agregado servicios. Explora el catálogo y arma tu
              paquete a la medida.
            </p>
            <Button asChild variant="outline" size="sm" onClick={closeCart}>
              <Link href="/servicios">Ver servicios</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <ul>
                {lines.map((line) => (
                  <li
                    key={line.slug}
                    className="border-b border-forest/10 py-5 last:border-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/servicio/${line.slug}`}
                        onClick={closeCart}
                        className="font-display text-[1.02rem] leading-snug text-ink hover:text-brass"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`Quitar ${line.name}`}
                        className="mt-1 shrink-0 text-forest/40 transition-colors hover:text-clay"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                      </button>
                    </div>
                    {line.unit && (
                      <p className="mt-1 text-[0.76rem] italic text-forest-soft/80">
                        {line.unit}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-forest/20">
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.qty - 1)}
                          aria-label="Reducir cantidad"
                          className="flex h-8 w-8 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="num w-9 text-center text-[0.8rem]">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.qty + 1)}
                          aria-label="Aumentar cantidad"
                          className="flex h-8 w-8 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <span className="num text-[0.9rem] text-ink">
                        {formatMXN(line.price * line.qty)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-forest/12 bg-cream-deep/60 px-6 py-5">
              <dl className="space-y-2 text-[0.85rem]">
                <div className="flex justify-between text-forest-soft">
                  <dt>Subtotal</dt>
                  <dd className="num">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>IVA (16%)</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="rule mt-3 flex justify-between pt-3 text-ink">
                  <dt className="font-display text-[1.05rem]">Total</dt>
                  <dd className="num text-[1.05rem]">{formatMXN(total)}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2">
                <Button asChild className="w-full" onClick={closeCart}>
                  <Link href="/checkout">Ir a pagar</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={closeCart}
                >
                  <Link href="/carrito">Ver carrito completo</Link>
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
