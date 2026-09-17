'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'info@apoyolegalmx.com';

const colors = {
  forest: '#1B3B2F',
  cream: '#F5F2EB',
  brass: '#AE8B3B',
  ink: '#1B211F',
  white: '#FFFFFF',
  border: '#E5E2DA'
};

const getBaseHtml = (title: string, content: string) => `
<!DOCTYPE html>
<html>
<body style="background-color: ${colors.cream}; padding: 40px 20px; font-family: Helvetica, Arial, sans-serif; color: ${colors.ink};">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border: 1px solid ${colors.border};">
    <tr>
      <td style="background-color: ${colors.forest}; padding: 30px; text-align: center; border-bottom: 4px solid ${colors.brass};">
        <h1 style="color: ${colors.cream}; margin: 0; font-size: 20px; font-weight: normal; letter-spacing: 2px; text-transform: uppercase;">Apoyo Legal MX</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="margin-top: 0; color: ${colors.ink}; font-size: 22px;">${title}</h2>
        ${content}
      </td>
    </tr>
    <tr>
      <td style="background-color: ${colors.cream}; padding: 20px; text-align: center; border-top: 1px solid ${colors.border}; font-size: 12px; color: #666666;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Apoyo Legal MX · CDMX, México</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function sendContactEmail(data: { nombre: string; email: string; telefono: string; asunto: string; mensaje: string; lang?: "es" | "en" }) {
  try {
    const isEn = data.lang === "en";

    const subject = isEn ? `New contact message: ${data.asunto}` : `Nuevo mensaje de contacto: ${data.asunto}`;
    const title = isEn ? "We have received your message" : "Hemos recibido tu mensaje";
    const greeting = isEn 
      ? `<p>Hello <strong>${data.nombre}</strong>, thank you for contacting us. A lawyer from our team will review your case and get back to you shortly.</p>`
      : `<p>Hola <strong>${data.nombre}</strong>, gracias por contactarnos. Un abogado de nuestro equipo revisará tu caso y se pondrá en contacto a la brevedad.</p>`;
    const detailsTitle = isEn ? "Request details:" : "Detalles de tu solicitud:";
    const lPhone = isEn ? "Phone" : "Teléfono";
    const lTopic = isEn ? "Topic" : "Asunto";
    const lMsg = isEn ? "Message" : "Mensaje";

    const content = `
      ${greeting}
      <hr style="border: none; border-top: 1px solid ${colors.border}; margin: 25px 0;" />
      <h3 style="color: ${colors.forest}; font-size: 16px;">${detailsTitle}</h3>
      <ul style="line-height: 1.6; padding-left: 20px; color: ${colors.ink};">
        <li><strong>${lPhone}:</strong> ${data.telefono || 'N/A'}</li>
        <li><strong>${lTopic}:</strong> ${data.asunto}</li>
        <li><strong>${lMsg}:</strong> ${data.mensaje}</li>
      </ul>
    `;

    await resend.emails.send({
      from: 'Apoyo Legal MX <info@apoyolegalmx.com>',
      to: data.email,
      bcc: ADMIN_EMAIL,
      subject: subject,
      html: getBaseHtml(title, content),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error enviando correo de contacto:', error);
    return { success: false, error: 'No se pudo enviar el correo' };
  }
}

// ⚠️ ACTUALIZADO: Recibe el arreglo de items comprados
export async function sendOrderConfirmationEmail(data: { 
  nombre: string; 
  email: string; 
  orderId: string; 
  total: number; 
  method: string; 
  items: { name: string; qty: number; price: number }[];
  lang?: "es" | "en" 
}) {
  try {
    const isEn = data.lang === "en";

    const subject = isEn ? `Order confirmation ${data.orderId}` : `Confirmación de pedido ${data.orderId}`;
    const title = isEn ? "Your order is confirmed" : "Tu pedido está confirmado";
    const greeting = isEn 
      ? `<p>Thank you for your payment, <strong>${data.nombre}</strong>. Your transaction was processed successfully and operations will begin the same business day.</p>`
      : `<p>Gracias por tu pago, <strong>${data.nombre}</strong>. Tu transacción ha sido procesada con éxito y la gestión iniciará el mismo día hábil.</p>`;
    const ref = isEn ? "Reference" : "Referencia";
    const totalLabel = isEn ? "Total paid" : "Total pagado";
    const method = isEn ? "Method" : "Método";
    const nextStepsTitle = isEn ? "Next steps" : "Siguientes pasos";
    const nextStepsDesc = isEn 
      ? "We will contact you shortly with the exact list of requirements to start your process."
      : "Te contactaremos en breve con la lista exacta de requisitos para iniciar tu trámite.";
    const itemsTitle = isEn ? "Purchased services:" : "Servicios contratados:";

    // Generamos la tabla de productos
    const itemsHtml = `
      <h3 style="color: ${colors.forest}; font-size: 16px; margin-top: 25px;">${itemsTitle}</h3>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px; border-collapse: collapse;">
        ${data.items.map(item => `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid ${colors.border}; color:${colors.ink}; font-size: 14px;">
              ${item.name} <span style="color: #666666; font-size: 12px; margin-left: 8px;">x${item.qty}</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid ${colors.border}; text-align: right; color: ${colors.ink}; font-size: 14px; font-family: monospace;">               $${(item.price * item.qty).toFixed(2)}
            </td>
          </tr>
        `).join('')}
      </table>
    `;

    const content = `
      ${greeting}
      ${itemsHtml}
      <div style="background-color: ${colors.cream}; border-left: 4px solid ${colors.brass}; padding: 15px; margin: 25px 0;">
        <p style="margin: 0 0 8px 0;"><strong>${ref}:</strong> ${data.orderId}</p>
        <p style="margin: 0 0 8px 0;"><strong>${totalLabel}:</strong> $${data.total.toFixed(2)} MXN</p>
        <p style="margin: 0;"><strong>${method}:</strong> ${data.method}</p>
      </div>
      <h3 style="color: ${colors.forest}; font-size: 16px;">${nextStepsTitle}</h3>
      <p style="line-height: 1.5;">${nextStepsDesc}</p>
    `;

    await resend.emails.send({
      from: 'Apoyo Legal MX <info@apoyolegalmx.com>',
      to: data.email,
      bcc: ADMIN_EMAIL,
      subject: subject,
      html: getBaseHtml(title, content),
    });

    return { success: true };
  } catch (error) {
    console.error('Error enviando confirmación de pedido:', error);
    return { success: false, error: 'No se pudo enviar el correo' };
  }
}