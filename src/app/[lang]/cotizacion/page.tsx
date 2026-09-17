"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-context";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IVA_RATE, formatMXN, type Service } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { getDictionary, type Locale } from "@/lib/dictionaries";

export default function CotizacionPage(props: { params: Promise<{ lang: string }> }) {
  const params = use(props.params);
  const lang = params.lang as Locale;
  const dict = getDictionary(lang);

  const { add, openCart } = useCart();

  const [form, setForm] = useState({
    referencia: "",
    email: "",
    telefono: "",
    monto: "",
    concepto: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

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
      e.referencia = dict.quotePage.errors.ref;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = dict.quotePage.errors.email;
    if (form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = dict.quotePage.errors.phone;
    if (amount < 100) e.monto = dict.quotePage.errors.amount;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    // Simulamos un micro-procesamiento visual
    await new Promise((r) => setTimeout(r, 600));

    // Forjamos la cotización como un objeto "Service" para que el carrito lo acepte nativamente
    const quoteService: Service = {
      slug: `cotizacion-${form.referencia.toLowerCase()}`,
      name: `Cotización ${form.referencia.toUpperCase()}`,
      price: amount,
      category: "cumplimiento", // Categoría base genérica requerida por el tipo
      summary: form.concepto || dict.quotePage.title,
      detail: `Email asociado: ${form.email} | Teléfono: ${form.telefono}`,
      deliverables: [],
      turnaround: "Inmediato",
      unit: "cotización"
    };
    
    // Lo agregamos al carrito (Contexto global)
    add(quoteService, 1);
    
    setStatus("idle");
    
    // Limpiamos el formulario para permitir agregar más cotizaciones si se desea
    setForm({
      referencia: "",
      email: "",
      telefono: "",
      monto: "",
      concepto: "",
    });

    // Mostramos la notificación y abrimos el Drawer
    toast(dict.cart.item_added_title, {
      description: quoteService.name,
    });
    openCart();
  }

  return (
    <>
      <PageHeader
        eyebrow={dict.quotePage.eyebrow}
        title={dict.quotePage.title}
        lead={dict.quotePage.lead}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/cotizacion`, label: dict.nav.quote },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <form onSubmit={onSubmit} noValidate className="lg:col-span-7">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <QField
                id="referencia"
                label={dict.quotePage.ref_label}
                value={form.referencia}
                onChange={(v) => set("referencia", v.toUpperCase())}
                error={errors.referencia}
                placeholder={dict.quotePage.ref_placeholder}
                className="num font-bold"
              />
              <QField
                id="email"
                label={dict.quotePage.email_label}
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
              />
              <QField
                id="telefono"
                label={dict.quotePage.phone_label}
                type="tel"
                value={form.telefono}
                onChange={(v) => set("telefono", v)}
                error={errors.telefono}
                placeholder="55 1234 5678"
              />
              <QField
                id="monto"
                label={dict.quotePage.amount_label}
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
                  label={dict.quotePage.concept_label}
                  value={form.concepto}
                  onChange={(v) => set("concepto", v)}
                  placeholder={dict.quotePage.concept_placeholder}
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
                  <Loader2 className="h-4 w-4 animate-spin" /> {dict.quotePage.processing}
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {dict.cart.add_to_cart} • {total > 0 ? formatMXN(total) : dict.quotePage.pay_quote}
                </>
              )}
            </Button>
          </form>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
              <p className="eyebrow text-brass">{dict.quotePage.summary_title}</p>
              <dl className="mt-6 space-y-3 text-[0.92rem]">
                <div className="flex justify-between text-forest-soft">
                  <dt>{dict.quotePage.proposal_amount}</dt>
                  <dd className="num">{formatMXN(amount)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>{dict.cart.iva}</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                  <dt className="font-display text-[1.2rem]">{dict.cart.total}</dt>
                  <dd className="num text-[1.2rem]">{formatMXN(total)}</dd>
                </div>
              </dl>
              <ul className="mt-7 space-y-2 border-t border-forest/12 pt-5 text-[0.78rem] text-forest/60">
                {dict.quotePage.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
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
    <div data-error={error ? "true" : "false"}>
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