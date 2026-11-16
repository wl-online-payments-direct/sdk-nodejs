import { Domain } from "onlinepayments-sdk-nodejs";
import { PaymentStatusExample } from "./paymentStatusExample.js";
import { OrderStore, PaymentStep } from "./types.js";

// [START payment-response-handle]
// Use for every successful createPayment response (response.body when response.isSuccess is true):
// server-to-server, Hosted Tokenization, Hosted Fields and client integration.
export async function handleCreatePaymentResponse(response: Domain.CreatePaymentResponse, orderId: string, orders: OrderStore): Promise<PaymentStep> {
  await orders.savePaymentId(orderId, response.payment?.id ?? "");

  const redirectUrl = response.merchantAction?.redirectData?.redirectURL;
  if (response.merchantAction?.actionType === "REDIRECT" && redirectUrl) {
    // 3-D Secure challenge or a third-party page. Redirect to the URL exactly as returned.
    // The customer comes back on your return URL; then read the status with getPaymentDetails.
    return { kind: "redirect", redirectUrl };
  }

  // No customer action needed: the result is already known.
  const state = PaymentStatusExample.toOrderState(response.payment?.status, response.payment?.statusOutput);
  await orders.saveState(orderId, state);
  return { kind: "done", state };
}
// [END payment-response-handle]
