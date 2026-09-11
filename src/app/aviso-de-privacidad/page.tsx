import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad integral de Apoyo Legal MX conforme a la legislación mexicana en materia de datos personales.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Aviso de privacidad"
      updated="Enero 2026"
      intro="Apoyo Legal MX S.C., con domicilio en Av. Paseo de la Reforma 296, Piso 12, Juárez, Cuauhtémoc, C.P. 06600, Ciudad de México, es responsable del tratamiento de tus datos personales."
      sections={[
        {
          id: "datos",
          heading: "Datos que recabamos",
          paragraphs: [
            "Recabamos los datos que nos proporcionas de forma directa al contratar un servicio, llenar un formulario o comunicarte con nosotros.",
          ],
          bullets: [
            "Datos de identificación: nombre, denominación social y firma.",
            "Datos de contacto: correo electrónico, teléfono y domicilio.",
            "Datos fiscales: RFC, régimen y domicilio fiscal para efectos de facturación.",
            "Documentación soporte del trámite que nos encomiendas.",
          ],
        },
        {
          id: "finalidades",
          heading: "Finalidades del tratamiento",
          paragraphs: [
            "Utilizamos tus datos para prestar los servicios contratados, integrar expedientes, gestionar trámites ante autoridades y terceros, emitir comprobantes fiscales y dar seguimiento a tu asunto.",
            "De manera secundaria, y siempre que no manifiestes tu oposición, podemos usarlos para enviarte información sobre cambios regulatorios relevantes para tu operación.",
          ],
        },
        {
          id: "transferencias",
          heading: "Transferencias",
          paragraphs: [
            "Podremos transferir tus datos a notarías, peritos traductores, autoridades y contrapartes cuando ello sea indispensable para desahogar el trámite que nos encomendaste. En estos casos la transferencia se limita a lo estrictamente necesario.",
            "No comercializamos ni cedemos tus datos con fines publicitarios de terceros.",
          ],
        },
        {
          id: "arco",
          heading: "Derechos ARCO",
          paragraphs: [
            "Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales, así como revocar tu consentimiento, enviando una solicitud a privacidad@apoyolegalmx.com.",
            "Daremos respuesta a tu solicitud en un plazo máximo de veinte días hábiles contados a partir de su recepción.",
          ],
        },
        {
          id: "seguridad",
          heading: "Medidas de seguridad",
          paragraphs: [
            "Aplicamos medidas administrativas, técnicas y físicas para proteger tus datos: control de accesos por asunto, cifrado en tránsito, resguardo con doble factor de autenticación y políticas internas de retención documental.",
          ],
        },
        {
          id: "cambios",
          heading: "Cambios al aviso",
          paragraphs: [
            "Cualquier modificación a este aviso se publicará en apoyolegalmx.com indicando la fecha de la última actualización. Te recomendamos revisarlo periódicamente.",
          ],
        },
      ]}
    />
  );
}
