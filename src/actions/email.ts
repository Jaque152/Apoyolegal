'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = 'info@apoyolegalmx.com';

export async function sendContactEmail(data: { nombre: string; email: string; telefono: string; asunto: string; mensaje: string }) {
  try {
    await resend.emails.send({
      from: 'Apoyo Legal MX <info@apoyolegalmx.com>',
      to: [ADMIN_EMAIL, data.email],
      subject: `Nuevo mensaje de contacto: ${data.asunto}`,
      html: `
        <h2>Hemos recibido tu mensaje</h2>
        <p>Hola ${data.nombre}, gracias por contactarnos. Un abogado revisará tu caso.</p>
        <hr />
        <h3>Detalles de tu solicitud:</h3>
        <ul>
          <li><strong>Teléfono:</strong> ${data.telefono || 'N/A'}</li>
          <li><strong>Asunto:</strong> ${data.asunto}</li>
          <li><strong>Mensaje:</strong> ${data.mensaje}</li>
        </ul>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error enviando correo de contacto:', error);
    return { success: false, error: 'No se pudo enviar el correo' };
  }
}

export async function sendOrderConfirmationEmail(data: { nombre: string; email: string; orderId: string; total: number; method: string }) {
  try {
    await resend.emails.send({
      from: 'Apoyo Legal MX <info@apoyolegalmx.com>',
      to: [ADMIN_EMAIL, data.email],
      subject: `Confirmación de pedido ${data.orderId}`,
      html: `
        <h2>Tu pedido está confirmado</h2>
        <p>Gracias por tu pago, ${data.nombre}.</p>
        <p><strong>Referencia:</strong> ${data.orderId}</p>
        <p><strong>Total:</strong> $${data.total.toFixed(2)} MXN</p>
        <p><strong>Método:</strong> ${data.method}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error enviando confirmación de pedido:', error);
    return { success: false, error: 'No se pudo enviar el correo' };
  }
}