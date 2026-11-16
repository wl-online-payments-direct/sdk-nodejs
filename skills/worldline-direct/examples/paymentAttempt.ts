import { randomUUID } from "crypto";
import { OrderStore } from "./types.js";

// [START payment-attempt-key]
// One idempotence key per payment attempt, stored with the order.
// Call startPaymentAttempt when the customer begins to pay, for example when you show the payment form, and again
// before a new attempt after a decline or a rejected request. It stores the key before any createPayment call.
export async function startPaymentAttempt(orderId: string, orders: OrderStore): Promise<string> {
  const key = randomUUID();
  await orders.saveIdempotenceKey(orderId, key);
  return key;
}

// The request that creates the payment reads the stored key. A double submit, a retry after a timeout and a restart
// then send the same key, so the platform does not create a second payment.
export async function paymentAttemptKey(orderId: string, orders: OrderStore): Promise<string> {
  const key = await orders.getIdempotenceKey(orderId);
  if (key === undefined) {
    throw new Error(`No payment attempt was started for order ${orderId}`);
  }
  return key;
}
// [END payment-attempt-key]
