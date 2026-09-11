import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { categories } from "@/lib/catalog";

const legal = [
  { href: "/terminos-y-condiciones", label: "Términos y condiciones" },
  { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
  { href: "/politica-de-reembolsos", label: "Cancelaciones y reembolsos" },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest text-cream">
      <div className="relative z-10 mx-auto max-w-8xl px-5 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-16">
          <div>
            <Logo tone="cream" />
            <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-cream/70">
              Firma de gestión legal y regulatoria en la Ciudad de México.
              Acompañamos a empresas, fintech y proyectos digitales a operar en
              regla, con expedientes impecables y trámites que sí avanzan.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <PaymentMark label="Visa" />
              <PaymentMark label="Mastercard" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <nav aria-label="Servicios">
              <p className="eyebrow text-brass-light">Servicios</p>
              <ul className="mt-5 space-y-3">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/servicios/${c.slug}`}
                      className="link-sweep text-[0.9rem] text-cream/75 hover:text-cream"
                    >
                      {c.shortName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/cotizacion"
                    className="link-sweep text-[0.9rem] text-cream/75 hover:text-cream"
                  >
                    Cotización personalizada
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legales">
              <p className="eyebrow text-brass-light">Legales</p>
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
              <p className="eyebrow text-brass-light">Estudio</p>
              <address className="mt-5 space-y-4 not-italic text-[0.9rem] leading-relaxed text-cream/75">
                <p>
                  Av. Paseo de la Reforma 296, Piso 12
                  <br />
                  Juárez, Cuauhtémoc, C.P. 06600
                  <br />
                  Ciudad de México
                </p>
                <p className="space-y-1">
                  <a
                    href="tel:+525525838500"
                    className="num block text-cream hover:text-brass-light"
                  >
                    +52 55 2583 8500
                  </a>
                  <a
                    href="mailto:hola@apoyolegalmx.com"
                    className="group inline-flex items-center gap-1 text-cream hover:text-brass-light"
                  >
                    hola@apoyolegalmx.com
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
            © {new Date().getFullYear()} Apoyo Legal MX · apoyolegalmx.com
          </p>
          <p className="num tracking-[0.14em]">CDMX · MÉXICO</p>
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

function PaymentMark({ label }: { label: string }) {
  return (
    <span className="num flex h-8 items-center border border-cream/20 px-2.5 text-[0.6rem] tracking-[0.12em] text-cream/60">
      {label}
    </span>
  );
}
