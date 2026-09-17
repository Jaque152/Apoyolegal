import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de contratación de los servicios de Apoyo Legal MX.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Términos y condiciones"
      updated="Enero 2026"
      intro="Estas condiciones rigen la contratación de servicios a través de apoyolegalmx.com. Al contratar en línea manifiestas que las has leído y aceptado."
      sections={[
        {
          id: "objeto",
          heading: "Objeto del servicio",
          paragraphs: [
            "Apoyo Legal MX presta servicios de gestión documental, asistencia en materia de cumplimiento regulatorio, coordinación de traducciones y legalizaciones, y seguimiento de trámites ante autoridades y terceros.",
            "Nuestros servicios son de gestión y asesoría profesional. No garantizamos el sentido de las resoluciones que emitan autoridades, bancos o instituciones privadas, ya que su decisión es ajena a nuestra voluntad.",
          ],
        },
        {
          id: "contratacion",
          heading: "Contratación y precios",
          paragraphs: [
            "Los precios publicados están expresados en pesos mexicanos y no incluyen el Impuesto al Valor Agregado, el cual se calcula y muestra durante el proceso de pago.",
            "Los honorarios publicados no comprenden derechos, aprovechamientos, gastos notariales ni pagos a terceros, salvo que el servicio lo indique expresamente. Estos conceptos se cotizan por separado.",
          ],
          bullets: [
            "El servicio inicia una vez confirmado el pago.",
            "Los tiempos de entrega son estimados en días hábiles y corren a partir de la recepción completa de la documentación.",
            "Las prórrogas atribuibles a la autoridad no son imputables a Apoyo Legal MX.",
          ],
        },
        {
          id: "obligaciones",
          heading: "Obligaciones del cliente",
          paragraphs: [
            "El cliente se obliga a proporcionar información veraz, completa y oportuna, así como los documentos originales o copias legibles que sean necesarios para el desahogo del servicio.",
            "La entrega tardía o incompleta de documentación suspende el cómputo de los plazos comprometidos.",
          ],
        },
        {
          id: "responsabilidad",
          heading: "Límite de responsabilidad",
          paragraphs: [
            "Nuestra responsabilidad se limita al monto de los honorarios efectivamente pagados por el servicio de que se trate. No respondemos por daños indirectos, lucro cesante ni por consecuencias derivadas de información inexacta proporcionada por el cliente.",
          ],
        },
        {
          id: "confidencialidad",
          heading: "Confidencialidad",
          paragraphs: [
            "Toda la información que recibimos se considera confidencial y se resguarda bajo control de acceso restringido. A solicitud del cliente suscribimos un acuerdo de confidencialidad específico previo al inicio de los trabajos.",
          ],
        },
        {
          id: "jurisdiccion",
          heading: "Legislación y jurisdicción",
          paragraphs: [
            "Estas condiciones se rigen por la legislación aplicable en los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero.",
          ],
        },
      ]}
    />
  );
}
