import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddToCartButton } from "@/components/shop/add-to-cart";
import { formatMXN, type Service } from "@/lib/catalog";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <article className="group relative flex h-full flex-col border border-forest/12 bg-card p-6 transition-all duration-500 hover:border-forest/35 hover:shadow-[6px_6px_0_0_hsl(var(--forest)/0.1)] md:p-7">
      <div className="flex items-start justify-between">
        <span className="num text-[0.66rem] tracking-[0.2em] text-brass">
          {String(index).padStart(2, "0")}
        </span>
        <Link
          href={`/servicio/${service.slug}`}
          aria-label={`Ver detalle de ${service.name}`}
          className="text-forest/30 transition-all duration-300 group-hover:text-brass"
        >
          <ArrowUpRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.2}
          />
        </Link>
      </div>

      <h3 className="mt-6 text-[1.28rem] leading-[1.18] text-ink">
        <Link
          href={`/servicio/${service.slug}`}
          className="transition-colors hover:text-forest-soft"
        >
          {service.name}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-forest-soft">
        {service.summary}
      </p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-forest/12 pt-5">
        <div>
          <p className="num text-[1.2rem] leading-none text-ink">
            {formatMXN(service.price)}
          </p>
          <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.12em] text-forest/50">
            MXN + IVA
          </p>
        </div>
        <p className="max-w-[9rem] text-right text-[0.7rem] italic leading-tight text-forest-soft/80">
          {service.unit ?? service.turnaround}
        </p>
      </div>

      <AddToCartButton service={service} className="mt-5" />
    </article>
  );
}
