import { assertSuccess, Client } from "onlinepayments-sdk-nodejs";
import { PaymentStatusExample } from "./paymentStatusExample.js";
import { OrderStore } from "./types.js";
import { WebhooksEvent } from "./webhooksSetup.js";

export class WebhookEventProcessor {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START webhooks-process]
  // Runs in a background job on events saved in the inbox. Events can arrive twice and out of order, so read the current
  // status instead of trusting the event; repeating this is harmless.
  public async process(webhooksEvent: WebhooksEvent): Promise<void> {
    const payment = webhooksEvent.payment;
    if (!payment?.id) {
      // Refund, payment link, payout and token events carry other objects, e.g. webhooksEvent.refund.
      return;
    }

    const orderId = payment.paymentOutput?.references?.merchantReference;
    if (!orderId) {
      return;
    }

    const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, payment.id)).body;
    await this.orders.savePaymentId(orderId, details.id ?? payment.id);
    await this.orders.saveState(orderId, PaymentStatusExample.toOrderState(details.status, details.statusOutput));
  }
  // [END webhooks-process]
}
