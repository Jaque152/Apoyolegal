"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { formatMXN } from "@/lib/catalog";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export default function CarritoPage(props: { params: Promise<{ lang: string }> }) {
  const params = use(props.params);
  const lang = params.lang as Locale;
  const dict = getDictionary(lang);

  const { lines, setQty, remove, subtotal, iva, total, clear, hydrated } =
    useCart();

  return (
    <>
      <PageHeader
        eyebrow={dict.cartPage.step}
        title={dict.cart.your_cart}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/carrito`, label: dict.nav.open_cart },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        {!hydrated ? (
          <div className="h-40 animate-pulse bg-forest/5" />
        ) : lines.length === 0 ? (
          <div className="flex flex-col items-center gap-6 border border-dashed border-forest/25 px-6 py-24 text-center">
            <ShoppingBag className="h-9 w-9 text-forest/25" strokeWidth={1} />
            <div>
              <h2 className="text-[1.6rem] text-ink">{dict.cartPage.empty_title}</h2>
              <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-forest-soft">
                {dict.cartPage.empty_desc}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/${lang}/servicios`}>{dict.cart.see_services}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${lang}/contacto`}>{dict.cartPage.request_proposal}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="hidden grid-cols-12 gap-4 border-b border-forest/20 pb-3 md:grid">
                <p className="col-span-6 eyebrow text-forest/50">{dict.cartPage.col_service}</p>
                <p className="col-span-3 eyebrow text-forest/50">{dict.cartPage.col_qty}</p>
                <p className="col-span-3 eyebrow text-right text-forest/50">
                  {dict.cartPage.col_amount}
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
                        href={`/${lang}/servicio/${line.slug}`}
                        className="font-display text-[1.15rem] leading-snug text-ink hover:text-brass"
                      >
                        {line.name}
                      </Link>
                      <p className="num mt-1.5 text-[0.78rem] text-forest/55">
                        {formatMXN(line.price)} {dict.cartPage.each}
                        {line.unit ? ` · ${line.unit}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 md:col-span-3">
                      <div className="flex items-center border border-forest/20">
                        <button
                          type="button"
                          onClick={() => setQty(line.slug, line.qty - 1)}
                          aria-label={dict.cart.decrease}
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
                          aria-label={dict.cart.increase}
                          className="flex h-9 w-9 items-center justify-center text-forest transition-colors hover:bg-forest hover:text-cream"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        aria-label={`${dict.cart.remove_item} ${line.name}`}
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
                  <Link href={`/${lang}/servicios`}>{dict.cartPage.keep_exploring}</Link>
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="num text-[0.7rem] uppercase tracking-[0.14em] text-forest/50 underline-offset-4 hover:text-clay hover:underline"
                >
                  {dict.cartPage.empty_cart}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
                <h2 className="text-[1.4rem] text-ink">{dict.cartPage.summary}</h2>
                <dl className="mt-6 space-y-3 text-[0.9rem]">
                  <div className="flex justify-between text-forest-soft">
                    <dt>{dict.cart.subtotal}</dt>
                    <dd className="num">{formatMXN(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-forest-soft">
                    <dt>{dict.cart.iva}</dt>
                    <dd className="num">{formatMXN(iva)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                    <dt className="font-display text-[1.15rem]">{dict.cart.total}</dt>
                    <dd className="num text-[1.15rem]">{formatMXN(total)}</dd>
                  </div>
                </dl>

                <Button asChild className="mt-7 w-full">
                  <Link href={`/${lang}/checkout`}>
                    {dict.cartPage.checkout_btn}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </Button>

                <ul className="mt-7 space-y-2 border-t border-forest/12 pt-5 text-[0.78rem] text-forest/60">
                  {dict.cartPage.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}