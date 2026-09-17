import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, FileText, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { AddToCartPanel } from "@/components/shop/add-to-cart";
import { ServiceCard } from "@/components/shop/service-card";
import {
  IVA_RATE,
  formatMXN,
  getCategory,
  getService,
  services,
} from "@/lib/catalog";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export function generateStaticParams() {
  // Genera todas las combinaciones posibles de [lang] y [slug]
  return services.flatMap((s) => [
    { lang: "es", slug: s.slug },
    { lang: "en", slug: s.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);
  
  const service = getService(resolvedParams.slug,lang);
  if (!service) return { title: dict.servicePage.not_found };
  
  return { title: service.name, description: service.summary };
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  const service = getService(resolvedParams.slug, lang);
  if (!service) notFound();

  const category = getCategory(service.category, lang);
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  const iva = service.price * IVA_RATE;

  return (
    <>
      <PageHeader
        eyebrow={category?.shortName}
        title={service.name}
        lead={service.summary}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/servicios`, label: dict.nav.services },
          {
            href: `/${lang}/servicios/${service.category}`,
            label: category?.shortName ?? dict.servicePage.fallback_area,
          },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Detalle */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[1.05rem] leading-relaxed text-forest-soft">
                {service.detail}
              </p>
            </Reveal>

            <Reveal delay={90} className="mt-12">
              <h2 className="text-[1.4rem] text-ink">{dict.servicePage.includes}</h2>
              <ul className="mt-6 space-y-px">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-4 border-t border-forest/12 py-4 last:border-b"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-brass"
                      strokeWidth={1.6}
                    />
                    <span className="text-[0.95rem] leading-relaxed text-forest-soft">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="mt-12 grid gap-px sm:grid-cols-3">
              <InfoTile
                icon={<Clock className="h-4 w-4" strokeWidth={1.4} />}
                label={dict.servicePage.estimated_time}
                value={service.turnaround}
              />
              <InfoTile
                icon={<FileText className="h-4 w-4" strokeWidth={1.4} />}
                label={dict.servicePage.modality}
                value={dict.servicePage.modality_value}
              />
              <InfoTile
                icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.4} />}
                label={dict.servicePage.confidentiality}
                value={dict.servicePage.confidentiality_value}
              />
            </Reveal>

            <Reveal delay={180} className="mt-12 border-l-2 border-brass pl-6">
              <p className="text-[0.95rem] leading-relaxed text-forest-soft">
                {dict.servicePage.after_payment}
              </p>
            </Reveal>
          </div>

          {/* Panel de compra */}
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)] md:p-8">
                <p className="eyebrow text-brass">{dict.servicePage.fees}</p>
                <p className="num mt-4 text-[2.6rem] leading-none text-ink">
                  {formatMXN(service.price)}
                </p>
                <p className="mt-2 text-[0.8rem] uppercase tracking-[0.1em] text-forest/55">
                  MXN {service.unit ? `· ${service.unit}` : ""}
                </p>

                <dl className="mt-7 space-y-2 border-t border-forest/12 pt-5 text-[0.85rem]">
                  <div className="flex justify-between text-forest-soft">
                    <dt>{dict.cart.subtotal}</dt>
                    <dd className="num">{formatMXN(service.price)}</dd>
                  </div>
                  <div className="flex justify-between text-forest-soft">
                    <dt>{dict.cart.iva}</dt>
                    <dd className="num">{formatMXN(iva)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest/12 pt-2 text-ink">
                    <dt>{dict.cart.total}</dt>
                    <dd className="num">{formatMXN(service.price + iva)}</dd>
                  </div>
                </dl>

                <div className="mt-7">
                  <AddToCartPanel service={service} />
                </div>

                <p className="mt-6 text-[0.78rem] leading-relaxed text-forest/60">
                  {dict.servicePage.payment_info}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-forest/12 bg-cream-deep/50">
          <div className="mx-auto max-w-8xl px-5 py-16 md:px-10 md:py-20 lg:px-14">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.6rem] text-ink">
                {dict.servicePage.also_from} {category?.shortName.toLowerCase()}
              </h2>
              <Link
                href={`/${lang}/servicios/${service.category}`}
                className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-forest-soft hover:text-ink"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
                {dict.servicePage.back_to_area}
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 80}>
                  <ServiceCard service={s} index={i + 1} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-forest/12 bg-card p-5">
      <span className="text-brass">{icon}</span>
      <p className="mt-3 text-[0.68rem] uppercase tracking-[0.12em] text-forest/50">
        {label}
      </p>
      <p className="mt-1 text-[0.9rem] leading-snug text-ink">{value}</p>
    </div>
  );
}
