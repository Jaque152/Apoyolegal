"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { PageHeader } from "@/components/site/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMXN } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { processCheckoutAction } from "@/actions/checkout";

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

export default function CheckoutPage() {
  const { lines, subtotal, iva, total, clear, hydrated } = useCart();
  const [form, setForm] = useState(initialForm);
  const [method, setMethod] = useState<"tarjeta" | "spei">("tarjeta");
  const [factura, setFactura] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [orderRef, setOrderRef] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

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
    if (form.nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Correo electrónico no válido";
    if (form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = "Incluye 10 dígitos";
    if (factura && form.rfc.trim().length < 12)
      e.rfc = "RFC de 12 o 13 caracteres";
    if (method === "tarjeta") {
      if (form.tarjeta.replace(/\s/g, "").length < 15)
        e.tarjeta = "Número de tarjeta incompleto";
      if (!/^\d{2}\/\d{2}$/.test(form.expira)) e.expira = "Formato MM/AA";
      if (form.cvv.length < 3) e.cvv = "CVV inválido";
      if (form.titular.trim().length < 3) e.titular = "Nombre del titular";
    }
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

    if (method === "tarjeta") {
      const [mes, anio] = form.expira.split("/");
      
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
          direccion: form.calle || "No especificada",
          ciudad: form.ciudad || "No especificada",
          estado: "CMX",
          cp: form.cp || "00000",
          empresa: form.empresa,
        },
      });

      if (!paymentResult.success) {
        setStatus("idle");
        alert(paymentResult.error || "Error procesando el pago. Fondos insuficientes o tarjeta declinada.");
        return;
      }
    } else {
        // Simulación corta de registro para pago por SPEI
        // En producción podrías invocar un Server Action que notifique el SPEI pendiente
        await new Promise((r) => setTimeout(r, 800));
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
          eyebrow="Paso 3 de 3"
          title="Pedido confirmado"
          crumbs={[
            { href: "/", label: "Inicio" },
            { href: "/checkout", label: "Checkout" },
          ]}
        />
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <div className="border border-forest/15 bg-card p-8 shadow-[10px_10px_0_0_hsl(var(--forest)/0.1)] md:p-12">
            <span className="flex h-14 w-14 items-center justify-center border border-brass text-brass">
              <Check className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h2 className="mt-8 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-ink">
              Gracias, {form.nombre.split(" ")[0]}. Tu pedido quedó registrado.
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-forest-soft">
              Enviamos la confirmación a{" "}
              <span className="text-ink">{form.email}</span> con la lista de
              documentos que necesitamos de tu parte y el nombre del abogado
              asignado.
            </p>

            <dl className="mt-10 grid gap-px border border-forest/12 sm:grid-cols-3">
              <SummaryTile label="Referencia" value={orderRef} mono />
              <SummaryTile label="Total pagado" value={formatMXN(orderTotal)} mono />
              <SummaryTile
                label="Método"
                value={method === "tarjeta" ? "Tarjeta" : "SPEI"}
              />
            </dl>

            {method === "spei" && (
              <div className="mt-8 border-l-2 border-brass bg-cream-deep/50 p-5">
                <p className="eyebrow text-brass">Datos para transferencia</p>
                <dl className="mt-4 space-y-1.5 text-[0.9rem] text-forest-soft">
                  <div className="flex justify-between gap-4">
                    <dt>Beneficiario</dt>
                    <dd className="text-ink">Apoyo Legal MX S.C.</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>CLABE</dt>
                    <dd className="num text-ink">012 180 0123 4567 8901</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Concepto</dt>
                    <dd className="num text-ink">{orderRef}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/servicios">Volver al catálogo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">Contactar a mi abogado</Link>
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
          eyebrow="Checkout"
          title="No hay nada por pagar"
          crumbs={[
            { href: "/", label: "Inicio" },
            { href: "/checkout", label: "Checkout" },
          ]}
        />
        <section className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <p className="text-[1rem] leading-relaxed text-forest-soft">
            Tu carrito está vacío. Agrega servicios del catálogo o paga una
            cotización que ya te hayamos enviado.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/servicios">Ver servicios</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cotizacion">Pagar cotización</Link>
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
        eyebrow="Paso 2 de 3"
        title="Checkout"
        lead="Confirma tus datos y elige cómo quieres pagar. La gestión inicia el mismo día hábil en que recibimos el pago."
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "/carrito", label: "Carrito" },
          { href: "/checkout", label: "Pago" },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="space-y-12 lg:col-span-7 xl:col-span-8">
            {/* Datos de contacto */}
            <fieldset>
              <Legend index="01" title="Datos de contacto" />
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Field
                  id="nombre"
                  label="Nombre completo"
                  value={form.nombre}
                  onChange={set("nombre")}
                  error={errors.nombre}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Correo electrónico"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="telefono"
                  label="Teléfono"
                  type="tel"
                  value={form.telefono}
                  onChange={set("telefono")}
                  error={errors.telefono}
                  autoComplete="tel"
                  placeholder="55 1234 5678"
                />
                <Field
                  id="empresa"
                  label="Empresa (opcional)"
                  value={form.empresa}
                  onChange={set("empresa")}
                  autoComplete="organization"
                />
              </div>
            </fieldset>

            {/* Facturación */}
            <fieldset>
              <Legend index="02" title="Facturación" />
              <label className="flex cursor-pointer items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
                    factura
                      ? "border-forest bg-forest text-cream"
                      : "border-forest/30 bg-transparent",
                  )}
                >
                  {factura && <Check className="h-3 w-3" strokeWidth={2.5} />}
                </span>
                <input
                  type="checkbox"
                  checked={factura}
                  onChange={(e) => setFactura(e.target.checked)}
                  className="sr-only"
                />
                <span className="text-[0.92rem] leading-relaxed text-forest-soft">
                  Requiero factura CFDI 4.0
                </span>
              </label>

              {factura && (
                <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field
                    id="rfc"
                    label="RFC"
                    value={form.rfc}
                    onChange={(v) => set("rfc")(v.toUpperCase())}
                    error={errors.rfc}
                  />
                  <Field
                    id="calle"
                    label="Calle y número"
                    value={form.calle}
                    onChange={set("calle")}
                  />
                  <Field
                    id="ciudad"
                    label="Ciudad / Estado"
                    value={form.ciudad}
                    onChange={set("ciudad")}
                  />
                  <Field
                    id="cp"
                    label="Código postal"
                    value={form.cp}
                    onChange={set("cp")}
                  />
                </div>
              )}
            </fieldset>

            {/* Pago */}
            <fieldset>
              <Legend index="03" title="Método de pago" />
              <div className="grid gap-px border border-forest/15 sm:grid-cols-2">
                <MethodOption
                  active={method === "tarjeta"}
                  onClick={() => setMethod("tarjeta")}
                  icon={<CreditCard className="h-4 w-4" strokeWidth={1.4} />}
                  title="Tarjeta"
                  description="Crédito o débito, pago inmediato"
                />
                <MethodOption
                  active={method === "spei"}
                  onClick={() => setMethod("spei")}
                  icon={<Landmark className="h-4 w-4" strokeWidth={1.4} />}
                  title="Transferencia SPEI"
                  description="Recibes CLABE y referencia"
                />
              </div>

              {method === "tarjeta" && (
                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field
                      id="tarjeta"
                      label="Número de tarjeta"
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
                    label="Vencimiento"
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
                    value={form.cvv}
                    onChange={(v) => set("cvv")(v.replace(/\D/g, "").slice(0, 4))}
                    error={errors.cvv}
                    placeholder="123"
                    inputMode="numeric"
                    className="num"
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id="titular"
                      label="Nombre del titular"
                      value={form.titular}
                      onChange={set("titular")}
                      error={errors.titular}
                    />
                  </div>
                </div>
              )}

              {method === "spei" && (
                <p className="mt-6 border-l-2 border-brass pl-5 text-[0.9rem] leading-relaxed text-forest-soft">
                  Al confirmar el pedido te mostramos la CLABE y la referencia
                  única. La gestión inicia en cuanto se acredita la
                  transferencia, normalmente el mismo día.
                </p>
              )}
            </fieldset>

            {/* Notas */}
            <fieldset>
              <Legend index="04" title="Notas del asunto" />
              <Label htmlFor="notas" className="sr-only">
                Notas
              </Label>
              <Textarea
                id="notas"
                value={form.notas}
                onChange={(e) => set("notas")(e.target.value)}
                placeholder="Cuéntanos brevemente el contexto: plazos, autoridad involucrada, documentos que ya tienes…"
              />
            </fieldset>
          </div>

          {/* Resumen */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 border border-forest/15 bg-card p-7 shadow-[8px_8px_0_0_hsl(var(--forest)/0.08)]">
              <h2 className="text-[1.4rem] text-ink">Tu pedido</h2>
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
                  <dt>Subtotal</dt>
                  <dd className="num">{formatMXN(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-forest-soft">
                  <dt>IVA (16%)</dt>
                  <dd className="num">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between border-t border-forest/15 pt-3 text-ink">
                  <dt className="font-display text-[1.15rem]">Total</dt>
                  <dd className="num text-[1.15rem]">{formatMXN(total)}</dd>
                </div>
              </dl>

              <Button
                type="submit"
                className="mt-7 w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Procesando
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" strokeWidth={1.6} />
                    Confirmar y pagar
                  </>
                )}
              </Button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-forest/55">
                <Lock className="h-3 w-3" strokeWidth={1.6} />
                Conexión cifrada · No almacenamos datos de tarjeta
              </p>

              <Link
                href="/carrito"
                className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.14em] text-forest-soft hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                Volver al carrito
              </Link>
            </div>
          </aside>
        </form>
      </section>
    </>
  );
}

/* ---------------- Subcomponentes ---------------- */

function Legend({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-7 flex items-baseline gap-3 border-b border-forest/15 pb-3">
      <span className="num text-[0.66rem] tracking-[0.2em] text-brass">
        {index}
      </span>
      <h2 className="text-[1.35rem] text-ink">{title}</h2>
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

function MethodOption({
  active,
  onClick,
  icon,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-4 p-5 text-left transition-colors",
        active ? "bg-forest text-cream" : "bg-card text-ink hover:bg-cream-deep",
      )}
    >
      <span className={active ? "text-brass-light" : "text-brass"}>{icon}</span>
      <span>
        <span className="block text-[0.95rem]">{title}</span>
        <span
          className={cn(
            "mt-1 block text-[0.78rem] leading-snug",
            active ? "text-cream/60" : "text-forest/55",
          )}
        >
          {description}
        </span>
      </span>
    </button>
  );
}

function SummaryTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
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