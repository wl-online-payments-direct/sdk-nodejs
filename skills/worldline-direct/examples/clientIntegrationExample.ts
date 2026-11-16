import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";
import { handleCreatePaymentResponse } from "./createPaymentResponseHandler.js";
import { paymentAttemptKey } from "./paymentAttempt.js";
import { OrderStore, PaymentStep } from "./types.js";

export class ClientIntegrationExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START client-session-create]
  // Creates the session that a Client SDK (JavaScript, iOS, Android, Flutter...) needs to encrypt card data.
  public async createClientSession(): Promise<Domain.SessionResponse> {
    const session = assertSuccess(await this.client.sessions.createSession(this.merchantId, {})).body;

    // Send clientSessionId, customerId, clientApiUrl and assetUrl to the app. Never send your API key.
    return session;
  }
  // [END client-session-create]

  // [START client-encrypted-payment]
  // The Client SDK returns an encrypted string; the app posts it to your server.
  public async pay(
    orderId: string,
    encryptedCustomerInput: string,
    amountInCents: number,
    currencyCode: string,
    device: Domain.CustomerDevice,
    returnUrl: string
  ): Promise<PaymentStep> {
    const request: Domain.CreatePaymentRequest = {
      encryptedCustomerInput,
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
  // [END client-encrypted-payment]
}
