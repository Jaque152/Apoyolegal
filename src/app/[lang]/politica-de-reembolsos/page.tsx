import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Cancelaciones y reembolsos",
  description:
    "Política de cancelaciones y reembolsos aplicable a los servicios contratados en apoyolegalmx.com.",
};

export default function ReembolsosPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title="Cancelaciones y reembolsos"
      updated="Enero 2026"
      intro="Queremos que el proceso sea claro desde el inicio. Esta política explica en qué casos procede una cancelación, un reembolso total o uno parcial."
      sections={[
        {
          id: "cancelacion",
          heading: "Cancelación antes de iniciar",
          paragraphs: [
            "Si cancelas dentro de las 24 horas posteriores al pago y aún no hemos iniciado la gestión, procede el reembolso del 100% del monto pagado, sin penalización alguna.",
          ],
        },
        {
          id: "en-proceso",
          heading: "Cancelación con trabajo en curso",
          paragraphs: [
            "Cuando la gestión ya inició, descontamos del reembolso las horas profesionales invertidas y los pagos irrecuperables realizados a terceros. El remanente se devuelve íntegro.",
          ],
          bullets: [
            "Derechos, aprovechamientos y pagos a autoridades no son reembolsables una vez enterados.",
            "Honorarios de peritos y notarios no son reembolsables si el servicio ya se prestó.",
            "Te entregamos el desglose de lo devengado antes de aplicar cualquier descuento.",
          ],
        },
        {
          id: "no-procede",
          heading: "Supuestos en los que no procede reembolso",
          paragraphs: [
            "No procede el reembolso cuando el servicio fue entregado conforme a lo contratado, cuando la resolución de la autoridad fue desfavorable por causas ajenas a nuestra gestión, o cuando el cliente no entregó la documentación requerida en los plazos acordados.",
          ],
        },
        {
          id: "garantia",
          heading: "Garantía de retrabajo",
          paragraphs: [
            "Si un documento preparado por nosotros es observado por un error atribuible a nuestro equipo, lo corregimos y volvemos a presentarlo sin costo adicional. Esta garantía tiene una vigencia de 60 días naturales a partir de la entrega.",
          ],
        },
        {
          id: "procedimiento",
          heading: "Cómo solicitarlo",
          paragraphs: [
            "Envía tu solicitud a info@apoyolegalmx.com indicando el folio del pedido y el motivo. Confirmamos la recepción en un día hábil y resolvemos en un máximo de cinco días hábiles.",
            "Los reembolsos se aplican al mismo medio de pago utilizado en la compra. El tiempo de acreditación depende de tu banco emisor.",
          ],
        },
      ]}
    />
  );
}
