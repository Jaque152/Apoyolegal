import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/sonner";
import { getDictionary, type Locale } from "@/lib/dictionaries";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apoyolegalmx.com"),
  title: {
    default: "Apoyo Legal MX — Cumplimiento, documentación y trámites",
    template: "%s · Apoyo Legal MX",
  },
  description:
    "Gestión legal y regulatoria para empresas, fintech y proyectos digitales en México: cumplimiento KYC/AML, traducción y apostilla, y seguimiento de trámites.",
  keywords: [
    "cumplimiento regulatorio",
    "KYC AML México",
    "apostilla CDMX",
    "traducción certificada",
    "gestión de trámites",
    "Apoyo Legal MX",
  ],
  openGraph: {
    title: "Apoyo Legal MX",
    description:
      "Cumplimiento, documentación legal y gestión de trámites en México.",
    url: "https://apoyolegalmx.com",
    siteName: "Apoyo Legal MX",
    locale: "es_MX",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  // Resolvemos los parámetros asíncronos de Next.js 15
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-grab/dist/index.global.js"
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="grain-fixed antialiased">
        <ClientBody>
          <CartProvider>
            {/* Se inyectan el idioma y el diccionario al Header */}
            <Header lang={lang} dict={dict} />
            <main>{children}</main>
            <Footer lang={lang} dict={dict} />
            <CartDrawer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast:
                    "!rounded-none !border !border-forest/20 !bg-cream !font-body !text-ink !shadow-[4px_4px_0_0_hsl(var(--forest))]",
                  description: "!text-forest-soft",
                },
              }}
            />
          </CartProvider>
        </ClientBody>
      </body>
    </html>
  );
}