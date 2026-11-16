import { assertSuccess, Client, Domain } from "onlinepayments-sdk-nodejs";
import { OrderPaymentState, OrderStore } from "./types.js";

export class PaymentStatusExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START payment-status]
  public async refreshPaymentState(orderId: string): Promise<OrderPaymentState> {
    const paymentId = await this.orders.getPaymentId(orderId);
    if (!paymentId) {
      // No payment ID stored yet: nothing to read. Keep the order pending; a webhook or your reconciliation job settles it.
      return "pending";
    }
    // assertSuccess throws an SdkApiError if the platform answered with an error.
    const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, paymentId)).body;

    const state = PaymentStatusExample.toOrderState(details.status, details.statusOutput);
    await this.orders.saveState(orderId, state);
    return state;
  }

  // Decide on statusCategory. status and statusCode give more detail.
  // A missing statusOutput or statusCategory (or a value you do not know) is "pending", never "paid": an order is
  // only paid when the platform says COMPLETED.
  public static toOrderState(status: string | null | undefined, statusOutput: Domain.PaymentStatusOutput | null | undefined): OrderPaymentState {
    switch (statusOutput?.statusCategory) {
      case "COMPLETED":
        return "paid";
      case "PENDING_MERCHANT":
        // PENDING_CAPTURE: authorized but not captured yet, capture or cancel it.
        // Any other status (CANCELLED, waiting for its final result) is not final.
        return status === "PENDING_CAPTURE" ? "authorized" : "pending";
      case "REFUNDED":
        return "refunded";
      case "REVERSED":
        // Not paid: do not treat the order as paid.
        return "reversed";
      case "UNSUCCESSFUL":
        return status === "CANCELLED" ? "cancelled" : "failed";
      default:
        // CREATED, PENDING_PAYMENT, PENDING_CONNECT_OR_3RD_PARTY: not final.
        // Wait for a webhook or check again later.
        return "pending";
    }
  }
  // [END payment-status]
}
