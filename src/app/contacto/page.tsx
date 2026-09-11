"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { sendContactEmail } from "@/actions/email";

const initial = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

export default function ContactoPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

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
    if (form.nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Correo electrónico no válido";
    if (form.telefono && form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = "Incluye 10 dígitos";
    if (!form.asunto) e.asunto = "Selecciona un tema";
    if (form.mensaje.trim().length < 15)
      e.mensaje = "Cuéntanos un poco más (mínimo 15 caracteres)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    // Llamada real al Server Action de Resend
    const result = await sendContactEmail(form);
    
    if (result.success) {
      setStatus("done");
      toast("Mensaje enviado", {
        description: "Te respondemos en menos de 24 horas hábiles.",
      });
    } else {
      setStatus("idle");
      toast.error("Error al enviar", {
        description: "Hubo un problema de conexión. Intenta de nuevo.",
      });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Primera consulta sin costo"
        title="Contacto"
        lead="Cuéntanos qué necesitas resolver. Te respondemos con un diagnóstico inicial y, si aplica, una propuesta con alcance y costo cerrado."
        crumbs={[
          { href: "/", label: "Inicio" },
          { href: "/contacto", label: "Contacto" },
        ]}
      />

      <section className="mx-auto max-w-8xl px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Formulario */}
          <div className="lg:col-span-7">
            {status === "done" ? (
              <div className="border border-forest/15 bg-card p-8 shadow-[10px_10px_0_0_hsl(var(--forest)/0.1)] md:p-10">
                <span className="flex h-14 w-14 items-center justify-center border border-brass text-brass">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h2 className="mt-8 text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-ink">
                  Mensaje recibido, {form.nombre.split(" ")[0]}
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-forest-soft">
                  Un abogado de nuestro equipo revisará tu caso y te escribirá a{" "}
                  <span className="text-ink">{form.email}</span> dentro de las
                  próximas 24 horas hábiles. Si tu asunto es urgente, márcanos
                  directamente.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <a href="tel:+525525838500">Llamar ahora</a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setForm(initial);
                      setStatus("idle");
                    }}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.05] text-ink">
                  Agenda tu consulta
                </h2>

                <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <FormField
                    id="nombre"
                    label="Nombre completo"
                    value={form.nombre}
                    onChange={(v) => set("nombre", v)}
                    error={errors.nombre}
                    autoComplete="name"
                  />
                  <FormField
                    id="email"
                    label="Correo electrónico"
                    type="email"
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <FormField
                    id="telefono"
                    label="Teléfono (opcional)"
                    type="tel"
                    value={form.telefono}
                    onChange={(v) => set("telefono", v)}
                    error={errors.telefono}
                    autoComplete="tel"
                    placeholder="55 1234 5678"
                  />
                  <div>
                    <Label
                      htmlFor="asunto"
                      className="text-[0.7rem] uppercase tracking-[0.12em] text-forest/55"
                    >
                      Tema
                    </Label>
                    <select
                      id="asunto"
                      value={form.asunto}
                      onChange={(e) => set("asunto", e.target.value)}
                      className={cn(
                        "h-12 w-full rounded-none border-0 border-b border-forest/25 bg-transparent px-0 text-[0.95rem] text-ink focus:border-brass focus:outline-none",
                        !form.asunto && "text-forest/40",
                        errors.asunto && "border-clay",
                      )}
                    >
                      <option value="">Selecciona una opción</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.shortName}>
                          {c.shortName}
                        </option>
                      ))}
                      <option value="Propuesta a la medida">
                        Propuesta a la medida
                      </option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.asunto && (
                      <p className="mt-1.5 text-[0.75rem] text-clay">
                        {errors.asunto}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="mensaje"
                      className="text-[0.7rem] uppercase tracking-[0.12em] text-forest/55"
                    >
                      Cuéntanos tu caso
                    </Label>
                    <Textarea
                      id="mensaje"
                      value={form.mensaje}
                      onChange={(e) => set("mensaje", e.target.value)}
                      placeholder="Describe el trámite, la autoridad o institución involucrada y los plazos que tienes."
                      className={cn("mt-2", errors.mensaje && "border-clay")}
                    />
                    {errors.mensaje && (
                      <p className="mt-1.5 text-[0.75rem] text-clay">
                        {errors.mensaje}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Enviando
                      </>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </Button>
                  <p className="max-w-xs text-[0.75rem] leading-relaxed text-forest/55">
                    Al enviar aceptas nuestro{" "}
                    <Link
                      href="/aviso-de-privacidad"
                      className="link-sweep text-forest"
                    >
                      aviso de privacidad
                    </Link>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Datos */}
          <aside className="lg:col-span-5">
            <Reveal className="border border-forest/15 bg-cream-deep/40 p-7 md:p-9">
              <p className="eyebrow text-brass">Estudio</p>
              <h2 className="mt-4 text-[1.8rem] leading-tight text-ink">
                Deseamos colaborar contigo
              </h2>

              <ul className="mt-8 space-y-7">
                <ContactRow
                  icon={<Mail className="h-4 w-4" strokeWidth={1.4} />}
                  label="Correo"
                >
                  <a
                    href="mailto:hola@apoyolegalmx.com"
                    className="link-sweep text-ink"
                  >
                    hola@apoyolegalmx.com
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<Phone className="h-4 w-4" strokeWidth={1.4} />}
                  label="Teléfono"
                >
                  <a
                    href="tel:+525525838500"
                    className="num link-sweep text-ink"
                  >
                    +52 55 2583 8500
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<MapPin className="h-4 w-4" strokeWidth={1.4} />}
                  label="Oficina"
                >
                  <p className="leading-relaxed text-ink">
                    Av. Paseo de la Reforma 296, Piso 12
                    <br />
                    Juárez, Cuauhtémoc, C.P. 06600
                    <br />
                    Ciudad de México
                  </p>
                </ContactRow>
                <ContactRow
                  icon={<Clock className="h-4 w-4" strokeWidth={1.4} />}
                  label="Horario"
                >
                  <p className="leading-relaxed text-ink">
                    Lunes a viernes, 9:00 – 18:00 h
                    <br />
                    <span className="text-forest-soft">
                      Sábados con cita previa
                    </span>
                  </p>
                </ContactRow>
              </ul>
            </Reveal>

            <Reveal delay={120} className="mt-6 bg-forest p-7 text-cream md:p-9">
              <p className="eyebrow text-brass-light">¿Ya tienes cotización?</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/70">
                Si nuestro equipo ya te envió una propuesta, puedes liquidarla
                en línea con tarjeta o transferencia.
              </p>
              <Button asChild variant="outlineCream" size="sm" className="mt-6">
                <Link href="/cotizacion">Pagar cotización</Link>
              </Button>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Teléfono grande */}
      <section className="border-t border-forest/12 bg-cream-deep/50">
        <div className="mx-auto max-w-8xl px-5 py-16 text-center md:py-20 lg:px-14">
          <p className="eyebrow text-brass">Consulta inicial sin costo</p>
          <a
            href="tel:+525525838500"
            className="num mt-6 block text-[clamp(2.2rem,7vw,5rem)] leading-none text-ink transition-colors hover:text-brass"
          >
            +52 55 2583 8500
          </a>
        </div>
      </section>
    </>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
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
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(error && "border-clay")}
      />
      {error && <p className="mt-1.5 text-[0.75rem] text-clay">{error}</p>}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 border-t border-forest/12 pt-5">
      <span className="mt-1 text-brass">{icon}</span>
      <div>
        <p className="text-[0.66rem] uppercase tracking-[0.14em] text-forest/50">
          {label}
        </p>
        <div className="mt-1.5 text-[0.95rem]">{children}</div>
      </div>
    </li>
  );
}