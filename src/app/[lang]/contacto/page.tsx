"use client";

import { use, useState } from "react";
import Link from "next/link";
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
import { getDictionary, type Locale } from "@/lib/dictionaries";

const initial = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

export default function ContactoPage(props: { params: Promise<{ lang: string }> }) {
  const params = use(props.params);
  const lang = params.lang as Locale;
  const dict = getDictionary(lang);

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
    if (form.nombre.trim().length < 3) e.nombre = dict.contactPage.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = dict.contactPage.errors.email;
    if (form.telefono && form.telefono.replace(/\D/g, "").length < 10)
      e.telefono = dict.contactPage.errors.phone;
    if (!form.asunto) e.asunto = dict.contactPage.errors.topic;
    if (form.mensaje.trim().length < 15)
      e.mensaje = dict.contactPage.errors.message;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    
    // Se inyecta el idioma activo al Server Action
    const result = await sendContactEmail({ ...form, lang });
    
    if (result.success) {
      setStatus("done");
      toast(dict.contactPage.toast_sent, {
        description: dict.contactPage.toast_sent_desc,
      });
    } else {
      setStatus("idle");
      toast.error(dict.contactPage.toast_error, {
        description: dict.contactPage.toast_error_desc,
      });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow={dict.contactPage.eyebrow}
        title={dict.contactPage.title}
        lead={dict.contactPage.lead}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/contacto`, label: dict.contactPage.title },
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
                  {dict.contactPage.msg_received.replace("{name}", form.nombre.split(" ")[0])}
                </h2>
                <p className="mt-5 text-[1rem] leading-relaxed text-forest-soft">
                  {dict.contactPage.msg_desc_1}
                  <span className="text-ink">{form.email}</span>
                  {dict.contactPage.msg_desc_2}
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setForm(initial);
                      setStatus("idle");
                    }}
                  >
                    {dict.contactPage.send_another}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.05] text-ink">
                  {dict.contactPage.form_title}
                </h2>

                <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <FormField
                    id="nombre"
                    label={dict.contactPage.name}
                    value={form.nombre}
                    onChange={(v) => set("nombre", v)}
                    error={errors.nombre}
                    autoComplete="name"
                  />
                  <FormField
                    id="email"
                    label={dict.contactPage.email}
                    type="email"
                    value={form.email}
                    onChange={(v) => set("email", v)}
                    error={errors.email}
                    autoComplete="email"
                  />
                  <FormField
                    id="telefono"
                    label={dict.contactPage.phone}
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
                      {dict.contactPage.topic}
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
                      <option value="">{dict.contactPage.select_topic}</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.shortName}>
                          {c.shortName}
                        </option>
                      ))}
                      <option value="Propuesta a la medida">
                        {dict.contactPage.custom_quote}
                      </option>
                      <option value="Otro">{dict.contactPage.other}</option>
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
                      {dict.contactPage.case_details}
                    </Label>
                    <Textarea
                      id="mensaje"
                      value={form.mensaje}
                      onChange={(e) => set("mensaje", e.target.value)}
                      placeholder={dict.contactPage.case_placeholder}
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
                        <Loader2 className="h-4 w-4 animate-spin" /> {dict.contactPage.sending}
                      </>
                    ) : (
                      dict.contactPage.send_msg
                    )}
                  </Button>
                  <p className="max-w-xs text-[0.75rem] leading-relaxed text-forest/55">
                    {dict.contactPage.privacy_1}
                    <Link
                      href={`/${lang}/aviso-de-privacidad`}
                      className="link-sweep text-forest"
                    >
                      {dict.contactPage.privacy_link}
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
              <p className="eyebrow text-brass">{dict.contactPage.studio}</p>
              <h2 className="mt-4 text-[1.8rem] leading-tight text-ink">
                {dict.contactPage.collab}
              </h2>

              <ul className="mt-8 space-y-7">
                <ContactRow
                  icon={<Mail className="h-4 w-4" strokeWidth={1.4} />}
                  label={dict.contactPage.mail}
                >
                  <a
                    href="mailto:info@apoyolegalmx.com"
                    className="link-sweep text-ink"
                  >
                    info@apoyolegalmx.com
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<Phone className="h-4 w-4" strokeWidth={1.4} />}
                  label={dict.contactPage.tel}
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
                  label={dict.contactPage.office}
                >
                  <p className="leading-relaxed text-ink">
                    {dict.contactPage.office_address_1}
                    <br />
                    {dict.contactPage.office_address_2}
                    <br />
                    {dict.contactPage.office_address_3}
                  </p>
                </ContactRow>
              </ul>
            </Reveal>

            <Reveal delay={120} className="mt-6 bg-forest p-7 text-cream md:p-9">
              <p className="eyebrow text-brass-light">{dict.contactPage.has_quote}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/70">
                {dict.contactPage.quote_desc}
              </p>
              <Button asChild variant="outlineCream" size="sm" className="mt-6">
                <Link href={`/${lang}/cotizacion`}>{dict.contactPage.pay_quote}</Link>
              </Button>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Teléfono grande */}
      <section className="border-t border-forest/12 bg-cream-deep/50">
        <div className="mx-auto max-w-8xl px-5 py-16 text-center md:py-20 lg:px-14">
          <p className="eyebrow text-brass">{dict.contactPage.big_phone_eyebrow}</p>
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

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
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