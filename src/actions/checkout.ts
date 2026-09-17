'use server';

import { processEtominPayment, PaymentData } from '@/lib/etomin';
import { sendOrderConfirmationEmail } from './email';

export async function processCheckoutAction(
  paymentData: PaymentData, 
  items: { name: string; qty: number; price: number }[],
  lang: "es" | "en" = "es"
) {
  // 1. Procesar el pago con Etomin
  const paymentResult = await processEtominPayment(paymentData);

  if (paymentResult.success) {
    // 2. Si es exitoso, enviar el correo transaccional en el idioma correcto con los items
    await sendOrderConfirmationEmail({
      nombre: paymentData.customer.nombre,
      email: paymentData.customer.email,
      orderId: paymentResult.orderId,
      total: paymentData.amount,
      method: 'Tarjeta',
      items: items,
      lang: lang
    });
  }

  return paymentResult;
}