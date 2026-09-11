"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { formatMXN } from "@/lib/catalog";

export default function CarritoPage() {
  const { lines, setQty, remove, subtotal, iva, total, clear, hydrated } =
    useCart();

  return (
    <>
      <PageHeader
        eyebrow="Paso 1 de 3"
        title="Tu carrito"
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "/carrito", label: "Carrito" },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        {!hydrated ? (
          <div className="h-40 animate-pulse bg-forest/5" />
        ) : lines.length === 0 ? (
          <div className="flex flex-col items-center gap-6 border border-dashed border-forest/25 px-6 py-24 text-center">
            <ShoppingBag className="h-9 w-9 text-forest/25" strokeWidth={1} />
            <div>
              <h2 className="text-[1.6rem] text-ink">Tu carrito está vacío</h2>
              <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-forest-soft">
                Explora el catálogo y arma el paquete de servicios que tu asunto
                necesita. También puedes pedirnos una propuesta a la medida.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/servicios">Ver servicios</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">Pedir propuesta</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="hidden grid-cols-12 gap-4 border-b border-forest/20 pb-3 md:grid">
                <p className="col-span-6 eyebrow text-forest/50">Servicio</p>
                <p className="col-span-3 eyebrow text-forest/50">Cantidad</p>
                <p className="col-span-3 eyebrow text-right text-forest/50">
                  Importe
                </p>
              </div>

              <ul>
                {lines.map((line) => (
                  <li
                    key={line.slug}
                    className="grid grid-cols-1 items-start gap-4 border-b border-forest/12 py-6 md:grid-cols-12"
                  >
                    <div className="md:col-span-6">
                      <Link
                        href={`/servicio/${line.slug}`}
                        className="font-display text-[1.15rem] leading-snug text-ink hover:text-brass"
                      >
                        {line.name}
                      </Link>
                      <p className="num mt-1.5 text-[0.78rem] text-forest/55">
                        {formatMXN(line.price)} c/u
                        {line.unit ? ` · ${line.unit}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 md:col-span-3">
                      <div className="flex items-center border border-forest/20">
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.qty - 1)}
                          aria-label="Reducir cantidad"
                          className="flex h-9 w-9 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="num w-10 text-center text-[0.85rem]">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.qty + 1)}
                          aria-label="Aumentar cantidad"
                          className="flex h-9 w-9 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`Quitar ${line.name}`}
                        className="text-forest/40 transition-colors hover:text-clay"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                      </button>
                    </div>

                    <p className="num text-[1rem] text-ink md:col-span-3 md:text-right">
                      {formatMXN(line.price * line.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/servicios">Seguir explorando</Link>
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="num text-[0.7rem] uppercase tracking-[0.14em] text-forest/50 underline-offset-4 hover:text-clay hover:underline"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
                <h2 className="text-[1.4rem] text-ink">Resumen</h2>
                <dl className="mt-6 space-y-3 text-[0.9rem]">
                  <div className="flex justify-between text-forest-soft">
                    <dt>Subtotal</dt>
                    <dd className="num">{formatMXN(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-forest-soft">
                    <dt>IVA (16%)</dt>
                    <dd className="num">{formatMXN(iva)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                    <dt className="font-display text-[1.15rem]">Total</dt>
                    <dd className="num text-[1.15rem]">{formatMXN(total)}</dd>
                  </div>
                </dl>

                <Button asChild className="mt-7 w-full">
                  <Link href="/checkout">
                    Continuar al pago
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </Button>

                <ul className="mt-7 space-y-2 border-t border-forest/12 pt-5 text-[0.78rem] text-forest/60">
                  <li>Pago seguro con tarjeta o SPEI</li>
                  <li>Factura CFDI 4.0 en 24 horas</li>
                  <li>Inicio de gestión el mismo día hábil</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
