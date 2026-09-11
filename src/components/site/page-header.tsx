import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-forest/12 bg-cream-deep/50",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[6%] hidden w-px bg-forest/10 lg:block"
      />
      <div className="mx-auto max-w-8xl px-5 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20 lg:px-14">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Ruta de navegación"
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.7rem]"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-forest/30">/</span>}
                <Link
                  href={c.href}
                  className="num uppercase tracking-[0.14em] text-forest-soft transition-colors hover:text-brass"
                >
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="eyebrow reveal text-brass">{eyebrow}</p>
        )}
        <h1
          className="reveal mt-5 max-w-5xl text-[clamp(2.4rem,6.2vw,5.2rem)] leading-[0.94] text-ink"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="reveal mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-forest-soft"
            style={{ animationDelay: "160ms" }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
