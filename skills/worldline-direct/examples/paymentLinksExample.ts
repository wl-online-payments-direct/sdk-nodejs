import { assertSuccess, Client, Domain } from "onlinepayments-sdk-nodejs";

export class PaymentLinksExample {
  public constructor(private readonly client: Client, private readonly merchantId: string) {}

  // [START payment-link-create]
  // Returns the link to send to the customer (email, chat, invoice).
  public async createLink(orderId: string, amountInCents: number, currencyCode: string, description: string): Promise<Domain.PaymentLinkResponse> {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const request: Domain.CreatePaymentLinkRequest = {
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId }
      },
      paymentLinkSpecificInput: {
        description,
        // Required. ISO 8601 with Z or a UTC offset, at most 6 months in the future.
        expirationDate: new Date(Date.now() + sevenDaysInMs).toISOString()
      }
    };

    // CreatePaymentLink does not support idempotent requests, so no idempotence key is sent.
    const link = assertSuccess(await this.client.paymentLinks.createPaymentLink(this.merchantId, request)).body;

    // Store paymentLinkId with the order. Send redirectionUrl exactly as returned.
    // The paymentlink.paid webhook (or getPaymentLinkById) tells you when it is paid.
    // Once paid, the link's paymentId has no attempt suffix: use it with "_0" appended in
    // GetPaymentDetails, and read the payment's status.
    return link;
  }
  // [END payment-link-create]
}
