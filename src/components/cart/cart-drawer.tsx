"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatMXN } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export function CartDrawer() {
  const pathname = usePathname();
  // Extraemos de forma segura el idioma ("es" o "en") de la URL actual
  const langSegment = pathname?.split("/")[1] as Locale;
  const lang = ["es", "en"].includes(langSegment) ? langSegment : "es";
  const dict = getDictionary(lang);

  const { isOpen, closeCart, lines, setQty, remove, subtotal, iva, total, count } =
    useCart();

  return (
    <>
      <button
        type="button"
        aria-label={dict.cart.close_cart}
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
              {dict.cart.your_cart}
            </h2>
            <span className="num text-[0.7rem] text-brass">
              {String(count).padStart(2, "0")}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={dict.cart.close}
            className="flex h-9 w-9 items-center justify-center text-forest transition-colors hover:bg-forest/8"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
            <ShoppingBag className="h-8 w-8 text-forest/25" strokeWidth={1} />
            <p className="text-[0.92rem] leading-relaxed text-forest-soft">
              {dict.cart.empty_msg}
            </p>
            <Button asChild variant="outline" size="sm" onClick={closeCart}>
              <Link href={`/${lang}/servicios`}>{dict.cart.see_services}</Link>
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
                        href={`/${lang}/servicio/${line.slug}`}
                        onClick={closeCart}
                        className="font-display text-[1.02rem] leading-snug text-ink hover:text-brass"
                      >
                        {line.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`${dict.cart.remove_item} ${line.name}`}
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
                          aria-label={dict.cart.decrease}
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
                          aria-label={dict.cart.increase}
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
                  <dt>{dict.cart.subtotal}</dt>
                  <dd className="num">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>{dict.cart.iva}</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="rule mt-3 flex justify-between pt-3 text-ink">
                  <dt className="font-display text-[1.05rem]">{dict.cart.total}</dt>
                  <dd className="num text-[1.05rem]">{formatMXN(total)}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2">
                <Button asChild className="w-full" onClick={closeCart}>
                  <Link href={`/${lang}/checkout`}>{dict.cart.go_to_checkout}</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={closeCart}
                >
                  <Link href={`/${lang}/carrito`}>{dict.cart.view_full_cart}</Link>
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}