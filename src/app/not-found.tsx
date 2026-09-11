import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-24 text-center">
      <p className="num text-[0.7rem] uppercase tracking-[0.24em] text-brass">
        Error 404
      </p>
      <h1 className="mt-6 text-[clamp(2.6rem,9vw,6rem)] leading-[0.92] text-ink">
        Página
        <br />
        <span className="italic text-forest-soft">no encontrada</span>
      </h1>
      <p className="mx-auto mt-7 max-w-md text-[1rem] leading-relaxed text-forest-soft">
        La dirección que buscas cambió o nunca existió. Vuelve al inicio o
        explora el catálogo de servicios.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Ir al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/servicios">Ver servicios</Link>
        </Button>
      </div>
    </section>
  );
}
