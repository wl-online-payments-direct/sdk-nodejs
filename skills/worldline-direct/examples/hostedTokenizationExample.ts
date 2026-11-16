import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";
import { handleCreatePaymentResponse } from "./createPaymentResponseHandler.js";
import { paymentAttemptKey } from "./paymentAttempt.js";
import { OrderStore, PaymentStep } from "./types.js";

export class HostedTokenizationExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START hosted-tokenization-create]
  // Creates the session for the card form iframe on your checkout page.
  public async createSession(): Promise<Domain.CreateHostedTokenizationResponse> {
    const request: Domain.CreateHostedTokenizationRequest = {
      locale: "en-GB"
      // Optional: variant: "MyTemplate.html", the file name of a custom template.
    };

    const response = assertSuccess(await this.client.hostedTokenization.createHostedTokenization(this.merchantId, request)).body;

    // Send hostedTokenizationUrl (iframe URL) and sri (script integrity) to the page.
    return response;
  }
  // [END hosted-tokenization-create]

  // [START hosted-tokenization-payment]
  // The page calls tokenizer.submitTokenization() and posts result.hostedTokenizationId to your server.
  public async pay(
    orderId: string,
    hostedTokenizationId: string,
    amountInCents: number,
    currencyCode: string,
    device: Domain.CustomerDevice,
    returnUrl: string
  ): Promise<PaymentStep> {
    const request: Domain.CreatePaymentRequest = {
      hostedTokenizationId,
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId },
        customer: { device }
      },
      cardPaymentMethodSpecificInput: {
        authorizationMode: "SALE",
        threeDSecure: { redirectionData: { returnUrl } }
      }
    };

    const context: PaymentContext = { idempotence: { key: await paymentAttemptKey(orderId, this.orders) } };
    const response = assertSuccess(await this.client.payments.createPayment(this.merchantId, request, context)).body;
    return handleCreatePaymentResponse(response, orderId, this.orders);
  }
  // [END hosted-tokenization-payment]
}
