import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";
import { handleCreatePaymentResponse } from "./createPaymentResponseHandler.js";
import { paymentAttemptKey } from "./paymentAttempt.js";
import { OrderStore, PaymentStep } from "./types.js";

export class HostedFieldsExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START hosted-fields-create]
  // Creates the session that the Hosted Fields script on your checkout page needs.
  public async createSession(checkoutPageOrigin: string): Promise<Domain.CreateHostedFieldsSessionResponse> {
    const request: Domain.CreateHostedFieldsSessionRequest = {
      locale: "en-GB",
      // The origin of your checkout page, e.g. https://shop.example
      origin: checkoutPageOrigin
    };

    const response = assertSuccess(await this.client.hostedFields.createHostedFieldsSession(this.merchantId, request)).body;

    // Send sdkUrl, sdkSri and sessionData to the page. Pass sessionData on unchanged.
    return response;
  }
  // [END hosted-fields-create]

  // [START hosted-fields-payment]
  // The page calls tokenize() and tells your server the card is ready.
  // hostedFieldsSessionId is hostedFieldsSessionId of the createSession response; sessionData.hostedFieldsSessionId holds the same value.
  public async pay(
    orderId: string,
    hostedFieldsSessionId: string,
    amountInCents: number,
    currencyCode: string,
    device: Domain.CustomerDevice,
    returnUrl: string
  ): Promise<PaymentStep> {
    const request: Domain.CreatePaymentRequest = {
      hostedFieldsSessionId,
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
  // [END hosted-fields-payment]
}
