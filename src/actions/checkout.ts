'use server';

import { processEtominPayment, PaymentData } from '@/lib/etomin';
import { sendOrderConfirmationEmail } from './email';

export async function processCheckoutAction(
  paymentData: PaymentData, 
  items: { name: string; qty: number; price: number }[],
  lang: "es" | "en" = "es",
  extraData?: { fullName: string; rfc: string; notas: string }
) {
  // 1. Procesar el pago con Etomin
  const paymentResult = await processEtominPayment(paymentData);

  if (paymentResult.success) {
    // 2. Si es exitoso, enviar el correo transaccional con todos los datos
    await sendOrderConfirmationEmail({
      nombre: extraData?.fullName || paymentData.customer.nombre, // Usamos el nombre completo sin dividir
      email: paymentData.customer.email,
      telefono: paymentData.customer.telefono,
      empresa: paymentData.customer.empresa,
      rfc: extraData?.rfc,
      direccion: paymentData.customer.direccion,
      ciudad: paymentData.customer.ciudad,
      cp: paymentData.customer.cp,
      notas: extraData?.notas,
      orderId: paymentResult.orderId,
      total: paymentData.amount,
      method: 'Tarjeta',
      items: items,
      lang: lang
    });
  }

  return paymentResult;
}