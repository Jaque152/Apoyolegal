'use server';

import { processEtominPayment, PaymentData } from '@/lib/etomin';
import { sendOrderConfirmationEmail } from './email';

export async function processCheckoutAction(paymentData: PaymentData) {
  // 1. Procesar el pago con Etomin
  const paymentResult = await processEtominPayment(paymentData);

  if (paymentResult.success) {
    // 2. Si es exitoso, enviar el correo transaccional
    await sendOrderConfirmationEmail({
      nombre: paymentData.customer.nombre,
      email: paymentData.customer.email,
      orderId: paymentResult.orderId,
      total: paymentData.amount,
      method: 'Tarjeta',
    });
  }

  return paymentResult;
}