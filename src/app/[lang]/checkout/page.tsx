"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Lock } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMXN } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { processCheckoutAction } from "@/actions/checkout";
import { getDictionary, type Locale } from "@/lib/dictionaries";

type Errors = Record<string, string>;

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  rfc: "",
  calle: "",
  ciudad: "",
  cp: "",
  notas: "",
  tarjeta: "",
  expira: "",
  cvv: "",
  titular: "",
};

export default function CheckoutPage(props: { params: Promise<{ lang: string }> }) {
  const params = use(props.params);
  const lang = params.lang as Locale;
  const dict = getDictionary(lang);

  const { lines, subtotal, iva, total, clear, hydrated } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [orderRef, setOrderRef] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const isFormReady = 
    form.nombre.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email) &&
    form.telefono.replace(/\D/g, "").length >= 10 &&
    form.calle.trim().length >= 4 &&
    form.ciudad.trim().length >= 3 &&
    form.cp.trim().length >= 4 &&
    form.tarjeta.replace(/\s/g, "").length >= 15 &&
    /^\d{2}\/\d{2}$/.test(form.expira) &&
    form.cvv.length >= 3 &&
    form.titular.trim().length >= 3;

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  function validate() {
    const e: Errors = {};
    if (form.nombre.trim().length < 3) e.nombre = dict.checkoutPage.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = dict.checkoutPage.errors.email;
    if (form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = dict.checkoutPage.errors.phone;
    
    if (form.calle.trim().length < 4) e.calle = dict.checkoutPage.errors.address;
    if (form.ciudad.trim().length < 3) e.ciudad = dict.checkoutPage.errors.city;
    if (form.cp.trim().length < 4) e.cp = dict.checkoutPage.errors.zip;

    if (form.rfc.trim().length > 0 && form.rfc.trim().length < 12) {
      e.rfc = dict.checkoutPage.errors.rfc;
    }

    if (form.tarjeta.replace(/\s/g, "").length < 15)
      e.tarjeta = dict.checkoutPage.errors.card_incomplete;
    if (!/^\d{2}\/\d{2}$/.test(form.expira)) e.expira = dict.checkoutPage.errors.expires;
    if (form.cvv.length < 3) e.cvv = dict.checkoutPage.errors.cvv;
    if (form.titular.trim().length < 3) e.titular = dict.checkoutPage.errors.cardholder;
    
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    setStatus("loading");
    const ref = `ALM-${Math.floor(100000 + Math.random() * 899999)}`;

    const [mes, anio] = form.expira.split("/");
    
    // Añadimos extraData como cuarto parámetro para mandarlo al correo
    const paymentResult = await processCheckoutAction({
      amount: total,
      orderId: ref,
      currency: "MXN",
      cardData: {
        number: form.tarjeta,
        name: form.titular,
        month: mes,
        year: `20${anio}`,
        cvv: form.cvv,
      },
      customer: {
        nombre: form.nombre.split(" ")[0] || form.nombre,
        apellido: form.nombre.split(" ").slice(1).join(" ") || "N/A",
        email: form.email,
        telefono: form.telefono,
        direccion: form.calle,
        ciudad: form.ciudad,
        estado: "CMX",
        cp: form.cp,
        empresa: form.empresa,
      },
    }, lines, lang, { 
      fullName: form.nombre, 
      rfc: form.rfc, 
      notas: form.notas 
    });

    if (!paymentResult.success) {
      setStatus("idle");
      alert(paymentResult.error || dict.checkoutPage.errors.payment_error);
      return;
    }

    setOrderRef(ref);
    setOrderTotal(total);
    setStatus("done");
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- Confirmación ---------------- */
  if (status === "done") {
    return (
      <>
        <PageHeader
          eyebrow={dict.checkoutPage.step_3}
          title={dict.checkoutPage.confirmed_title}
          crumbs={[
            { href: `/${lang}`, label: dict.common.home },
            { href: `/${lang}/checkout`, label: dict.checkoutPage.title },
          ]}
        />
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <div className="border border-forest/15 bg-card p-8 shadow-[10px_10px_0_0_hsl(var(--forest)/0.1)] md:p-12">
            <span className="flex h-14 w-14 items-center justify-center border border-brass text-brass">
              <Check className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h2 className="mt-8 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-ink">
              {dict.checkoutPage.thanks.replace("{name}", form.nombre.split(" ")[0])}
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-forest-soft">
              {dict.checkoutPage.email_sent.split("{email}")[0]}
              <span className="text-ink">{form.email}</span>
              {dict.checkoutPage.email_sent.split("{email}")[1]}
            </p>

            <dl className="mt-10 grid gap-px border border-forest/12 sm:grid-cols-3">
              <SummaryTile label={dict.checkoutPage.ref} value={orderRef} mono />
              <SummaryTile label={dict.checkoutPage.total_paid} value={formatMXN(orderTotal)} mono />
              <SummaryTile
                label={dict.checkoutPage.method}
                value={dict.checkoutPage.method_card}
              />
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/${lang}/servicios`}>{dict.checkoutPage.back_catalog}</Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ---------------- Carrito vacío ---------------- */
  if (hydrated && lines.length === 0) {
    return (
      <>
        <PageHeader
          eyebrow={dict.checkoutPage.title}
          title={dict.checkoutPage.empty_title}
          crumbs={[
            { href: `/${lang}`, label: dict.common.home },
            { href: `/${lang}/checkout`, label: dict.checkoutPage.title },
          ]}
        />
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <p className="text-[1rem] leading-relaxed text-forest-soft">
            {dict.checkoutPage.empty_desc}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href={`/${lang}/servicios`}>{dict.cart.see_services}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${lang}/cotizacion`}>{dict.checkoutPage.pay_quote}</Link>
            </Button>
          </div>
        </section>
      </>
    );
  }

  /* ---------------- Formulario ---------------- */
  return (
    <>
      <PageHeader
        eyebrow={dict.checkoutPage.step_2}
        title={dict.checkoutPage.title}
        lead={dict.checkoutPage.lead}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/carrito`, label: dict.cart.your_cart },
          { href: `/${lang}/checkout`, label: dict.checkoutPage.title },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="space-y-12 lg:col-span-7 xl:col-span-8">
            <fieldset>
              <Legend index="01" title={dict.checkoutPage.contact_data} />
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field
                  id="nombre"
                  label={dict.checkoutPage.name}
                  value={form.nombre}
                  onChange={set("nombre")}
                  error={errors.nombre}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label={dict.checkoutPage.email}
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="telefono"
                  label={dict.checkoutPage.phone}
                  type="tel"
                  value={form.telefono}
                  onChange={set("telefono")}
                  error={errors.telefono}
                  autoComplete="tel"
                  placeholder="55 1234 5678"
                />
                <Field
                  id="empresa"
                  label={dict.checkoutPage.company}
                  value={form.empresa}
                  onChange={set("empresa")}
                  autoComplete="organization"
                />
              </div>
            </fieldset>

            <fieldset>
              <Legend index="02" title={dict.checkoutPage.billing} />
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field
                  id="rfc"
                  label={`${dict.checkoutPage.rfc} (Opcional)`}
                  value={form.rfc}
                  onChange={(v) => set("rfc")(v.toUpperCase())}
                  error={errors.rfc}
                />
                <Field
                  id="calle"
                  label={dict.checkoutPage.address}
                  value={form.calle}
                  onChange={set("calle")}
                  error={errors.calle}
                />
                <Field
                  id="ciudad"
                  label={dict.checkoutPage.city}
                  value={form.ciudad}
                  onChange={set("ciudad")}
                  error={errors.ciudad}
                />
                <Field
                  id="cp"
                  label={dict.checkoutPage.zip}
                  value={form.cp}
                  onChange={set("cp")}
                  error={errors.cp}
                />
              </div>
            </fieldset>

            <fieldset>
              <Legend index="03" title={dict.checkoutPage.payment_method}>
                <img src="/etomin_logo.svg" alt="Etomin" className="h-4 object-contain opacity-80" />
              </Legend>
              
              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field
                    id="tarjeta"
                    label={dict.checkoutPage.card_number}
                    value={form.tarjeta}
                    onChange={(v) =>
                      set("tarjeta")(
                        v
                          .replace(/\D/g, "")
                          .slice(0, 16)
                          .replace(/(.{4})/g, "$1 ")
                          .trim(),
                      )
                    }
                    error={errors.tarjeta}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    className="num"
                  />
                </div>
                <Field
                  id="expira"
                  label={dict.checkoutPage.expires}
                  value={form.expira}
                  onChange={(v) => {
                    const digits = v.replace(/\D/g, "").slice(0, 4);
                    set("expira")(
                      digits.length > 2
                        ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                        : digits,
                    );
                  }}
                  error={errors.expira}
                  placeholder="MM/AA"
                  inputMode="numeric"
                  className="num"
                />
                <Field
                  id="cvv"
                  label="CVV"
                  type="password"
                  value={form.cvv}
                  onChange={(v) => set("cvv")(v.replace(/\D/g, "").slice(0, 4))}
                  error={errors.cvv}
                  placeholder="***"
                  inputMode="numeric"
                  className="num tracking-[0.3em] font-bold"
                />
                <div className="sm:col-span-2">
                  <Field
                    id="titular"
                    label={dict.checkoutPage.cardholder}
                    value={form.titular}
                    onChange={set("titular")}
                    error={errors.titular}
                  />
                </div>
                <div className="mt-2 sm:col-span-2">
                  <img src="/etomin_secbadge.svg" alt="Pago Seguro" className="h-6 object-contain opacity-80" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <Legend index="04" title={dict.checkoutPage.notes_title} />
              <Label htmlFor="notas" className="sr-only">
                {dict.checkoutPage.notes_title}
              </Label>
              <Textarea
                id="notas"
                value={form.notas}
                onChange={(e) => set("notas")(e.target.value)}
                placeholder={dict.checkoutPage.notes_placeholder}
              />
            </fieldset>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
              <h2 className="text-[1.4rem] text-ink">{dict.checkoutPage.order_summary}</h2>
              <ul className="mt-6 space-y-4 border-b border-forest/12 pb-5">
                {lines.map((l) => (
                  <li key={l.slug} className="flex justify-between gap-4">
                    <span className="text-[0.88rem] leading-snug text-forest-soft">
                      {l.name}
                      <span className="num ml-2 text-forest/45">×{l.qty}</span>
                    </span>
                    <span className="num shrink-0 text-[0.88rem] text-ink">
                      {formatMXN(l.price * l.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-3 text-[0.9rem]">
                <div className="flex justify-between text-forest-soft">
                  <dt>{dict.cart.subtotal}</dt>
                  <dd className="num">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>{dict.cart.iva}</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                  <dt className="font-display text-[1.15rem]">{dict.cart.total}</dt>
                  <dd className="num text-[1.15rem]">{formatMXN(total)}</dd>
                </div>
              </dl>

              <Button
                type="submit"
                className="mt-7 w-full"
                disabled={status === "loading" || !isFormReady}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {dict.checkoutPage.processing}
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {dict.checkoutPage.confirm_pay}
                  </>
                )}
              </Button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-forest/55">
                <Lock className="h-3 w-3" strokeWidth={1.6} />
                {dict.checkoutPage.secure_conn}
              </p>

              <Link
                href={`/${lang}/carrito`}
                className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-forest-soft hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                {dict.checkoutPage.back_cart}
              </Link>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}

/* ---------------- Subcomponentes ---------------- */
function Legend({ index, title, children }: { index: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-baseline justify-between border-b border-forest/15 pb-3">
      <div className="flex items-baseline gap-3">
        <span className="num text-[0.66rem] tracking-[0.2em] text-brass">
          {index}
        </span>
        <h2 className="text-[1.35rem] text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
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
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(error && "border-clay", className)}
      />
      {error && <p className="mt-1.5 text-[0.75rem] text-clay">{error}</p>}
    </div>
  );
}

function SummaryTile({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-cream-deep/40 p-5">
      <dt className="text-[0.66rem] uppercase tracking-[0.12em] text-forest/50">
        {label}
      </dt>
      <dd className={cn("mt-1.5 text-[1rem] text-ink", mono && "num")}>
        {value}
      </dd>
    </div>
  );
}