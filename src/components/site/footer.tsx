import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { categories } from "@/lib/catalog";
import type { Locale } from "@/lib/dictionaries";

function VisaBadge() {
  return (
    <span className="grid h-8 w-12 place-items-center rounded bg-cream">
      <span className="font-display text-[0.8rem] font-black italic tracking-tight text-[#1a1f71]">
        VISA
      </span>
    </span>
  );
}

function MastercardBadge() {
  return (
    <span className="flex h-8 w-12 items-center justify-center rounded bg-cream">
      <div className="flex items-center -space-x-1.5">
        <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
        <span className="h-4 w-4 rounded-full bg-[#f79e1b] mix-blend-multiply" />
      </div>
    </span>
  );
}

export function Footer({ lang, dict }: { lang: Locale; dict: any }) {
  const legal = [
    { href: `/${lang}/terminos-y-condiciones`, label: dict.footer.terms },
    { href: `/${lang}/aviso-de-privacidad`, label: dict.footer.privacy },
    { href: `/${lang}/politica-de-reembolsos`, label: dict.footer.refunds },
  ];

  return (
    <footer className="grain relative overflow-hidden bg-forest text-cream">
      <div className="relative z-10 mx-auto max-w-8xl px-5 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-16">
          <div>
            <Logo tone="cream" />
            <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-cream/70">
              {dict.footer.description}
            </p>
            <div className="flex items-center gap-2 pt-8">
              <VisaBadge />
              <MastercardBadge />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <nav aria-label={dict.footer.services_title}>
              <p className="eyebrow text-brass-light">{dict.footer.services_title}</p>
              <ul className="mt-5 space-y-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${lang}/servicios/${c.slug}`}
                      className="link-sweep text-[0.9rem] text-cream/75 hover:text-cream"
                    >
                      {c.shortName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${lang}/cotizacion`}
                    className="link-sweep text-[0.9rem] text-cream/75 hover:text-cream"
                  >
                    {dict.footer.custom_quote}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label={dict.footer.legal_title}>
              <p className="eyebrow text-brass-light">{dict.footer.legal_title}</p>
              <ul className="mt-5 space-y-3">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-sweep text-[0.9rem] text-cream/75 hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow text-brass-light">{dict.footer.studio}</p>
              <address className="mt-5 space-y-4 not-italic text-[0.9rem] leading-relaxed text-cream/75">
                <p>
                  {dict.footer.address_l1}
                  <br />
                  {dict.footer.address_l2}
                  <br />
                  {dict.footer.address_l3}
                </p>
                <p className="space-y-1">
                  <a
                    href="tel:+525525838500"
                    className="num block text-cream hover:text-brass-light"
                  >
                    +52 55 2583 8500
                  </a>
                  <a
                    href="mailto:info@apoyolegalmx.com"
                    className="group inline-flex items-center gap-1 text-cream hover:text-brass-light"
                  >
                    info@apoyolegalmx.com
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/12 pt-6 text-[0.75rem] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="num">
            © {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <p className="num tracking-[0.14em]">{dict.common.cdmx} · {dict.common.mexico}</p>
        </div>
      </div>

      {/* Oversized watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 z-0 -translate-x-1/2 whitespace-nowrap font-display text-[19vw] leading-none text-cream/[0.045]"
      >
        Apoyo Legal MX
      </span>
    </footer>
  );
}