import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { categories, servicesByCategory, formatMXN, catalogs } from "@/lib/catalog";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  return {
    title: dict.servicesPage.meta_title,
    description: dict.servicesPage.meta_desc,
  };
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHeader
        eyebrow={dict.servicesPage.catalog}
        title={dict.servicesPage.title}
        lead={dict.servicesPage.lead}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/servicios`, label: dict.nav.services },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="space-y-px">
          {catalogs[lang].categories.map((cat, i) => {
            const items = servicesByCategory(cat.slug, lang);
            const from = Math.min(...items.map((s) => s.price));
            return (
              <Reveal key={cat.slug} delay={i * 90}>
                <Link
                  href={`/${lang}/servicios/${cat.slug}`}
                  className="group grid gap-8 border-t border-forest/14 py-10 transition-colors last:border-b hover:bg-cream-deep/40 md:grid-cols-12 md:items-center md:gap-10 md:py-12"
                >
                  <div className="md:col-span-4 lg:col-span-3">
                    <figure className="duotone-wrap relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="duotone object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </figure>
                  </div>

                  <div className="md:col-span-6 lg:col-span-6">
                    <div className="flex items-center gap-3">
                      <span className="num text-[0.7rem] tracking-[0.2em] text-brass">
                        {cat.index}
                      </span>
                      <span className="h-px w-8 bg-brass/50" />
                      <span className="num text-[0.66rem] uppercase tracking-[0.16em] text-forest/50">
                        {items.length} {dict.servicesPage.services_count}
                      </span>
                    </div>
                    <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.06] text-ink transition-transform duration-500 group-hover:translate-x-1.5">
                      {cat.name}
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-forest-soft">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:col-span-2 md:flex-col md:items-end md:justify-center md:gap-6 lg:col-span-3">
                    <div className="text-right">
                      <p className="text-[0.68rem] uppercase tracking-[0.12em] text-forest/50">
                        {dict.servicesPage.from}
                      </p>
                      <p className="num mt-1 text-[1.3rem] text-ink">
                        {formatMXN(from)}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center border border-forest/25 text-forest transition-colors duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
                      <ArrowUpRight className="h-5 w-5" strokeWidth={1.2} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-forest/12 bg-forest text-cream">
        <div className="mx-auto flex max-w-8xl flex-col justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20 lg:px-14">
          <div>
            <p className="eyebrow text-brass-light">{dict.servicesPage.custom_eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.05] text-cream">
              {dict.servicesPage.custom_title}
            </h2>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-cream/65">
              {dict.servicesPage.custom_desc}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <Button asChild variant="brass">
              <Link href={`/${lang}/contacto`}>{dict.servicesPage.request_proposal}</Link>
            </Button>
            <Button asChild variant="outlineCream">
              <Link href={`/${lang}/cotizacion`}>{dict.servicesPage.have_quote}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}