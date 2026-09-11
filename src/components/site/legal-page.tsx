import { PageHeader } from "@/components/site/page-header";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export function LegalPage({
  title,
  eyebrow,
  updated,
  intro,
  sections,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lead={intro}
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "#", label: title },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <p className="eyebrow text-brass">Índice</p>
              <ol className="mt-5 space-y-3">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="num text-[0.62rem] text-forest/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${s.id}`}
                      className="link-sweep text-[0.85rem] leading-snug text-forest-soft hover:text-ink"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="num mt-8 border-t border-forest/12 pt-4 text-[0.68rem] uppercase tracking-[0.12em] text-forest/45">
                Actualizado: {updated}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-forest/12 py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="num text-[0.66rem] tracking-[0.2em] text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-[1.5rem] leading-tight text-ink">
                    {s.heading}
                  </h2>
                </div>
                <div className="mt-5 space-y-4">
                  {s.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="text-[0.98rem] leading-relaxed text-forest-soft"
                    >
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 text-[0.95rem] leading-relaxed text-forest-soft"
                        >
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 bg-brass" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
