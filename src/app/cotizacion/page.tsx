"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Loader2, Lock } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IVA_RATE, formatMXN } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { sendContactEmail } from "@/actions/email"; 

export default function CotizacionPage() {
  const [form, setForm] = useState({
    referencia: "",
    email: "",
    telefono: "",
    monto: "",
    concepto: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const amount = useMemo(() => {
    const parsed = Number(form.monto.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }, [form.monto]);

  const iva = Math.round(amount * IVA_RATE * 100) / 100;
  const total = amount + iva;

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  function validate() {
    const e: Record<string, string> = {};
    if (form.referencia.trim().length < 4)
      e.referencia = "Escribe el folio que aparece en tu propuesta";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Correo electrónico no válido";
    if (form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = "Incluye 10 dígitos";
    if (amount < 100) e.monto = "El monto mínimo es de $100.00 MXN";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    // Adaptación usando el Server Action para notificar la intención
    const result = await sendContactEmail({
      nombre: "Cliente Referencia: " + form.referencia,
      email: form.email,
      telefono: form.telefono,
      asunto: `Pago registrado para cotización ${form.referencia}`,
      mensaje: `Monto total: $${total} \nConcepto: ${form.concepto || "N/A"}`
    });
    
    if (result.success) {
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("idle");
      alert("Hubo un error al registrar el pago. Intenta de nuevo.");
    }
  }

  if (status === "done") {
    return (
      <>
        <PageHeader
          eyebrow="Pago registrado"
          title="Listo, recibimos tu pago"
          crumbs={[
            { href: "/", label: "Inicio" },
            { href: "/cotizacion", label: "Cotización" },
          ]}
        />
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <div className="border border-forest/15 bg-card p-8 shadow-[10px_10px_0_0_hsl(var(--forest)/0.1)] md:p-12">
            <span className="flex h-14 w-14 items-center justify-center border border-brass text-brass">
              <Check className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h2 className="mt-8 text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-ink">
              Pago aplicado a la cotización {form.referencia.toUpperCase()}
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-forest-soft">
              Enviamos el comprobante a{" "}
              <span className="text-ink">{form.email}</span>. Tu abogado
              asignado te contactará hoy mismo para arrancar la gestión.
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.12em] text-forest/50">
                  Monto pagado
                </dt>
                <dd className="num mt-1 text-[1.4rem] text-ink">
                  {formatMXN(total)}
                </dd>
              </div>
              <div>
                <dt className="text-[0.66rem] uppercase tracking-[0.12em] text-forest/50">
                  Incluye IVA
                </dt>
                <dd className="num mt-1 text-[1.4rem] text-ink">
                  {formatMXN(iva)}
                </dd>
              </div>
            </dl>
            <Button asChild className="mt-10">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="A la medida"
        title="Pagar una cotización"
        lead="Si nuestro equipo ya te envió una propuesta con folio, liquídala aquí. El monto se toma directamente de tu documento; nosotros calculamos el IVA."
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "/cotizacion", label: "Cotización" },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <form onSubmit={onSubmit} noValidate className="lg:col-span-7">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <QField
                id="referencia"
                label="Folio de la cotización"
                value={form.referencia}
                onChange={(v) => set("referencia", v.toUpperCase())}
                error={errors.referencia}
                placeholder="ALM-2026-014"
                className="num"
              />
              <QField
                id="email"
                label="Correo electrónico"
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
              />
              <QField
                id="telefono"
                label="Teléfono"
                type="tel"
                value={form.telefono}
                onChange={(v) => set("telefono", v)}
                error={errors.telefono}
                placeholder="55 1234 5678"
              />
              <QField
                id="monto"
                label="Monto a pagar (sin IVA)"
                value={form.monto}
                onChange={(v) => set("monto", v.replace(/[^0-9.]/g, ""))}
                error={errors.monto}
                placeholder="12000.00"
                inputMode="numeric"
                className="num"
              />
              <div className="sm:col-span-2">
                <QField
                  id="concepto"
                  label="Concepto (opcional)"
                  value={form.concepto}
                  onChange={(v) => set("concepto", v)}
                  placeholder="Ej. Apostilla y traducción de poder notarial"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-10"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Procesando
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
                  Pagar {total > 0 ? formatMXN(total) : "cotización"}
                </>
              )}
            </Button>
          </form>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
              <p className="eyebrow text-brass">Desglose</p>
              <dl className="mt-6 space-y-3 text-[0.92rem]">
                <div className="flex justify-between text-forest-soft">
                  <dt>Monto de la propuesta</dt>
                  <dd className="num">{formatMXN(amount)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>IVA (16%)</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                  <dt className="font-display text-[1.2rem]">Total</dt>
                  <dd className="num text-[1.2rem]">{formatMXN(total)}</dd>
                </div>
              </dl>
              <ul className="mt-7 space-y-2 border-t border-forest/12 pt-5 text-[0.78rem] text-forest/60">
                <li>Tarjeta de crédito, débito o SPEI</li>
                <li>Factura CFDI 4.0 en 24 horas</li>
                <li>Comprobante inmediato por correo</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function QField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  inputMode,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  className?: string;
}) {
  return (
    <div>
      <Label
        htmlFor={id}
        className="text-[0.7rem] uppercase tracking-[0.12em] text-forest/55"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(error && "border-clay", className)}
      />
      {error && <p className="mt-1.5 text-[0.75rem] text-clay">{error}</p>}
    </div>
  );
}