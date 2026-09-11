import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { categories, services } from "@/lib/catalog";
import { ServiceCard } from "@/components/shop/service-card";

const process = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Escuchamos el caso, revisamos lo que ya tienes y definimos qué documentos y pasos hacen falta de verdad.",
  },
  {
    n: "02",
    title: "Estructura documental",
    body: "Ordenamos, cotejamos y corregimos el expediente hasta que cumple el estándar de quien va a revisarlo.",
  },
  {
    n: "03",
    title: "Presentación",
    body: "Somos tu enlace con bancos, autoridades, notarías y plataformas. Presentamos y recogemos acuses.",
  },
  {
    n: "04",
    title: "Seguimiento",
    body: "Monitoreamos cada movimiento y te reportamos avances con fechas, responsables y siguientes pasos.",
  },
  {
    n: "05",
    title: "Entrega y resguardo",
    body: "Recibes documentos finales, constancias y una carpeta ordenada que puedes volver a usar mañana.",
  },
];

const marquee = [
  "KYC / AML",
  "Onboarding financiero",
  "Apostilla",
  "Traducción certificada",
  "Beneficiario controlador",
  "Source of funds",
  "Notarización",
  "SEGOB · SRE · SAT",
];

export default function Home() {
  const featured = services.filter((s) =>
    [
      "revision-documentos-kyc-aml",
      "gestion-de-apostilla",
      "seguimiento-diario-semana",
    ].includes(s.slug),
  );

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-8xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16 lg:px-14">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow reveal text-brass">
                Firma de gestión legal · Ciudad de México
              </p>

              <h1 className="mt-7 font-display text-ink display-xl">
                <span className="reveal-mask">
                  <span style={{ animationDelay: "60ms" }}>Tu empresa,</span>
                </span>
                <span className="reveal-mask">
                  <span
                    className="italic text-forest-soft"
                    style={{ animationDelay: "150ms" }}
                  >
                    en regla
                  </span>
                </span>
                <span className="reveal-mask">
                  <span style={{ animationDelay: "240ms" }}>y sin fricción</span>
                </span>
              </h1>

              <div
                className="reveal mt-10 max-w-lg"
                style={{ animationDelay: "420ms" }}
              >
                <p className="text-[1.05rem] leading-relaxed text-forest-soft">
                  Convertimos requisitos regulatorios y papeleo crítico en un
                  proceso claro, con responsables y fechas. Para que operes con
                  certeza en México y fuera de él.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg">
                    <Link href="/servicios">
                      Ver servicios
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link href="/contacto" className="link-sweep">
                      Solicitar cotización
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="reveal lg:col-span-5"
              style={{ animationDelay: "300ms" }}
            >
              <figure className="duotone-wrap relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/2120516770/3713147381.jpeg"
                  alt="Equipo legal revisando documentación corporativa"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="duotone object-cover"
                />
                <figcaption className="absolute bottom-5 left-5 z-10 max-w-[16rem]">
                  <p className="eyebrow text-brass-light">Est. 2019</p>
                  <p className="mt-2 font-display text-[1.1rem] leading-snug text-cream">
                    Reforma 296, Piso 12 — Ciudad de México
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="overflow-hidden border-y border-forest/12 bg-forest py-3.5">
          <div className="ticker-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {marquee.map((m) => (
                  <span
                    key={`${dup}-${m}`}
                    className="num flex items-center gap-8 px-8 text-[0.7rem] uppercase tracking-[0.2em] text-cream/70"
                  >
                    {m}
                    <span className="text-brass-light">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MANIFIESTO ---------------- */}
      <section className="mx-auto max-w-8xl px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.02] text-ink">
              Compliance y documentación para empresas y proyectos digitales
            </h2>
            <Button asChild variant="outline" className="mt-9">
              <Link href="/contacto">Hablemos hoy</Link>
            </Button>
          </Reveal>

          <Reveal delay={120} className="space-y-6 lg:col-span-6 lg:col-start-7">
            <p className="text-[1.02rem] leading-relaxed text-forest-soft">
              Trabajamos con <em className="text-ink not-italic">fundadores</em>,{" "}
              <em className="text-ink not-italic">fintechs</em>, plataformas de
              pago y despachos que necesitan cumplir con obligaciones
              regulatorias sin frenar su operación.
            </p>
            <p className="text-[1.02rem] leading-relaxed text-forest-soft">
              La mayoría de los rechazos no ocurren por falta de sustancia:
              ocurren por un documento vencido, un dato inconsistente o un
              formato equivocado. Nuestro trabajo es que eso no pase.
            </p>
            <p className="text-[1.02rem] leading-relaxed text-forest-soft">
              Combinamos criterio jurídico, gestión documental estructurada y
              seguimiento activo hasta la entrega final.
            </p>

          </Reveal>
        </div>
      </section>

      {/* ---------------- QUIÉNES SOMOS ---------------- */}
      <section className="border-y border-forest/12 bg-cream-deep/50">
        <div className="mx-auto grid max-w-8xl gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-16 lg:px-14">
          <Reveal className="lg:col-span-5">
            <figure className="duotone-wrap relative aspect-[5/6] w-full overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2120516770/2964451265.jpeg"
                alt="Equipo de Apoyo Legal MX"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="duotone object-cover"
              />
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-brass">Quiénes somos</p>
            <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.05] text-ink">
              Un equipo pequeño, obsesivo con el detalle
            </h2>
            <div className="mt-7 space-y-5 text-[1rem] leading-relaxed text-forest-soft">
              <p>
                Somos abogados y gestores especializados en cumplimiento,
                documentación regulatoria y trámites ante autoridades mexicanas.
                Hemos acompañado a compañías locales y extranjeras en procesos
                de KYC/AML, apertura de cuentas, integraciones de pago,
                traducciones certificadas y apostillas.
              </p>
              <p>
                No entregamos diagnósticos genéricos: entregamos el documento
                listo, el acuse sellado y la constancia en la mano. Cada asunto
                tiene un responsable con nombre y un canal directo.
              </p>
            </div>

            <ul className="mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "Trato directo con el responsable de tu asunto",
                "Tarifas publicadas, sin sorpresas",
                "Reportes de avance por escrito",
                "Resguardo digital de todo tu expediente",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.92rem] text-forest-soft"
                >
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-brass" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild variant="outline" className="mt-10">
              <Link href="/servicios">Conoce el catálogo</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CÓMO TRABAJAMOS ---------------- */}
      <section className="mx-auto max-w-8xl px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brass">Método</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-ink">
              Cómo trabajamos
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-forest-soft">
            Cinco etapas, siempre las mismas. Sabes en qué punto está tu asunto
            en cualquier momento.
          </p>
        </Reveal>

        <ol className="mt-14">
          {process.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 70}
              className="group grid items-start gap-4 border-t border-forest/14 py-8 last:border-b md:grid-cols-12 md:gap-8"
            >
              <span className="num text-[0.72rem] tracking-[0.2em] text-brass md:col-span-1">
                {step.n}
              </span>
              <h3 className="text-[1.5rem] leading-tight text-ink transition-transform duration-500 group-hover:translate-x-1.5 md:col-span-4 md:text-[1.75rem]">
                {step.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-forest-soft md:col-span-6">
                {step.body}
              </p>
              <span className="hidden justify-self-end text-forest/25 transition-colors duration-300 group-hover:text-brass md:col-span-1 md:block">
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.2} />
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---------------- ÁREAS ---------------- */}
      <section className="border-t border-forest/12 bg-forest text-cream">
        <div className="mx-auto max-w-8xl px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-brass-light">Áreas de práctica</p>
              <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-cream">
                Tres frentes donde tu operación se atora
              </h2>
            </div>
            <Button asChild variant="outlineCream">
              <Link href="/servicios">Ver todas las áreas</Link>
            </Button>
          </Reveal>

          <div className="mt-14 grid gap-px bg-cream/12 md:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 90}>
                <Link
                  href={`/servicios/${cat.slug}`}
                  className="group flex h-full flex-col bg-forest p-7 transition-colors duration-500 hover:bg-ink md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <span className="num text-[0.7rem] tracking-[0.2em] text-brass-light">
                      {cat.index}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-cream/35 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brass-light"
                      strokeWidth={1.2}
                    />
                  </div>
                  <h3 className="mt-8 text-[1.6rem] leading-[1.1] text-cream">
                    {cat.shortName}
                  </h3>
                  <p className="mt-3 text-[0.8rem] uppercase tracking-[0.08em] text-brass-light/80">
                    {cat.tagline}
                  </p>
                  <p className="mt-6 flex-1 text-[0.92rem] leading-relaxed text-cream/65">
                    {cat.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-cream/80">
                    Explorar
                    <span className="block h-px w-8 bg-brass-light transition-all duration-300 group-hover:w-14" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- DESTACADOS ---------------- */}
      <section className="mx-auto max-w-8xl px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brass">Contratación directa</p>
            <h2 className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-ink">
              Servicios que puedes contratar hoy
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-forest-soft">
            Precios públicos en pesos mexicanos. Agrega al carrito, paga en
            línea y comenzamos el mismo día hábil.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <ServiceCard service={s} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CONTACTO ---------------- */}
      <section className="border-t border-forest/12 bg-cream-deep/50">
        <div className="mx-auto max-w-8xl px-5 py-20 md:px-10 md:py-24 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] text-ink">
                Primera consulta
                <br />
                <span className="italic text-forest-soft">sin costo</span>
              </h2>
              <Button asChild className="mt-8">
                <Link href="/contacto">
                  Agenda una llamada
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </Reveal>

            <Reveal
              delay={120}
              className="grid gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7"
            >
              <ContactBlock label="Escríbenos">
                <a
                  href="mailto:hola@apoyolegalmx.com"
                  className="link-sweep text-[0.95rem] text-ink"
                >
                  hola@apoyolegalmx.com
                </a>
              </ContactBlock>
              <ContactBlock label="Llámanos">
                <a
                  href="tel:+525525838500"
                  className="num link-sweep text-[0.95rem] text-ink"
                >
                  +52 55 2583 8500
                </a>
              </ContactBlock>
              <ContactBlock label="Visítanos">
                <p className="text-[0.92rem] leading-relaxed text-ink">
                  Reforma 296, Piso 12
                  <br />
                  Juárez, CDMX 06600
                </p>
              </ContactBlock>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-forest/20 pt-5">
      <p className="eyebrow mb-3 text-brass">{label}</p>
      {children}
    </div>
  );
}
