"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Inicio", index: "01" },
  { href: "/servicios", label: "Servicios", index: "02" },
  { href: "/cotizacion", label: "Cotización", index: "03" },
  { href: "/contacto", label: "Contacto", index: "04" },
];

export function Header() {
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "border-b border-forest/12 bg-cream/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-6 px-5 py-4 md:px-10 lg:px-14">
          <Link href="/" aria-label="Apoyo Legal MX — inicio">
            <Logo compact={scrolled} />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-baseline gap-2 text-[0.82rem] transition-colors",
                  isActive(item.href)
                    ? "text-ink"
                    : "text-forest-soft hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "num text-[0.6rem] transition-colors",
                    isActive(item.href)
                      ? "text-brass"
                      : "text-forest/35 group-hover:text-brass",
                  )}
                >
                  {item.index}
                </span>
                <span className="link-sweep tracking-[0.01em]">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+525525838500"
              className="hidden num text-[0.72rem] tracking-[0.06em] text-forest-soft transition-colors hover:text-ink xl:block"
            >
              +52 55 2583 8500
            </a>
            <span className="hidden h-4 w-px bg-forest/20 xl:block" />
            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir carrito"
              className="relative flex h-11 w-11 items-center justify-center border border-transparent text-forest transition-colors hover:border-forest/20 hover:bg-forest/5"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
              {hydrated && count > 0 && (
                <span className="num absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center bg-brass px-1 text-[0.6rem] font-medium text-cream">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className="flex h-11 w-11 items-center justify-center text-forest transition-colors hover:bg-forest/5 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-forest transition-[opacity,visibility] duration-400 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4">
            <Logo tone="cream" compact />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
              className="flex h-11 w-11 items-center justify-center text-cream"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-24">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 border-b border-cream/12 py-5"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="num text-[0.65rem] text-brass-light">
                  {item.index}
                </span>
                <span className="font-display text-[2.1rem] leading-none text-cream transition-transform duration-300 group-hover:translate-x-2">
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="mt-10 space-y-1 text-cream/70">
              <p className="eyebrow text-brass-light">Contacto directo</p>
              <a
                href="tel:+525525838500"
                className="num block text-[0.95rem] text-cream"
              >
                +52 55 2583 8500
              </a>
              <a
                href="mailto:hola@apoyolegalmx.com"
                className="block text-[0.95rem] text-cream"
              >
                hola@apoyolegalmx.com
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
