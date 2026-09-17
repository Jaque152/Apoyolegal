import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/shop/service-card";
import { Button } from "@/components/ui/button";
import {
  catalogs,
  categories,
  getCategory,
  servicesByCategory,
  type CategorySlug,
} from "@/lib/catalog";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export function generateStaticParams() {
  return categories.flatMap((c) => [
    { lang: "es", slug: c.slug },
    { lang: "en", slug: c.slug },
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

  const cat = getCategory(resolvedParams.slug, lang);
  if (!cat) return { title: dict.categoryPage.not_found };
  return { title: cat.name, description: cat.description };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  const cat = getCategory(resolvedParams.slug);
  if (!cat) notFound();

  const items = servicesByCategory(cat.slug as CategorySlug, lang);
  const others = catalogs[lang].categories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${dict.categoryPage.area} ${cat.index} · ${items.length} ${dict.categoryPage.services_count}`}
        title={cat.name}
        lead={cat.description}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/servicios`, label: dict.nav.services },
          { href: `/${lang}/servicios/${cat.slug}`, label: cat.shortName },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 pt-12 md:px-10 md:pt-16 lg:px-14">
        <Reveal>
          <figure className="duotone-wrap relative aspect-[21/8] w-full overflow-hidden">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              priority
              sizes="100vw"
              className="duotone object-cover"
            />
            <figcaption className="absolute bottom-6 left-6 z-10 md:bottom-8 md:left-8">
              <p className="eyebrow text-brass-light">{cat.tagline}</p>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-forest/14 pb-5">
          <h2 className="text-[1.6rem] text-ink">{dict.categoryPage.available_services}</h2>
          <p className="num text-[0.7rem] uppercase tracking-[0.14em] text-forest/50">
            {dict.categoryPage.prices_in}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 80}>
              <ServiceCard service={service} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-forest/12 bg-cream-deep/50">
        <div className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-16 lg:px-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${lang}/servicios`} className="gap-2">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                {dict.categoryPage.all_areas}
              </Link>
            </Button>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/${lang}/servicios/${o.slug}`}
                  className="group flex items-baseline gap-3"
                >
                  <span className="num text-[0.65rem] text-brass">
                    {o.index}
                  </span>
                  <span className="link-sweep text-[1.05rem] text-ink">
                    {o.shortName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}