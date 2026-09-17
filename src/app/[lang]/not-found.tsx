"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export default function NotFound() {
  const pathname = usePathname();
  
  // Extraemos el idioma de la URL (ej: /es/algo -> "es"). Si no existe, usamos "es" por defecto
  const langSegment = pathname?.split("/")[1] as Locale;
  const lang = ["es", "en"].includes(langSegment) ? langSegment : "es";
  
  const dict = getDictionary(lang);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24 text-center">
      <p className="num text-[0.7rem] uppercase tracking-[0.24em] text-brass">
        {dict.notFound.eyebrow}
      </p>
      <h1 className="mt-6 text-[clamp(2.6rem,9vw,6rem)] leading-[0.92] text-ink">
        {dict.notFound.title_1}
        <br />
        <span className="italic text-forest-soft">{dict.notFound.title_2}</span>
      </h1>
      <p className="mx-auto mt-7 max-w-md text-[1rem] leading-relaxed text-forest-soft">
        {dict.notFound.description}
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild>
          <Link href={`/${lang}`}>{dict.notFound.go_home}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/${lang}/servicios`}>{dict.notFound.view_services}</Link>
        </Button>
      </div>
    </section>
  );
}