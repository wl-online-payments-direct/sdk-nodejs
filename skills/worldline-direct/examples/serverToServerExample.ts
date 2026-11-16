import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";
import { handleCreatePaymentResponse } from "./createPaymentResponseHandler.js";
import { paymentAttemptKey } from "./paymentAttempt.js";
import { CardInput, OrderStore, PaymentStep } from "./types.js";

export class ServerToServerExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START server-to-server-create]
  // Card data on your server puts you in scope of PCI DSS SAQ D.
  // Use Hosted Tokenization or Hosted Fields unless you are certified for it.
  public async payWithCard(
    orderId: string,
    amountInCents: number,
    currencyCode: string,
    paymentProductId: number,
    card: CardInput,
    device: Domain.CustomerDevice,
    returnUrl: string
  ): Promise<PaymentStep> {
    const request: Domain.CreatePaymentRequest = {
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId },
        customer: { device }
      },
      cardPaymentMethodSpecificInput: {
        // e.g. 1 = Visa, 3 = Mastercard.
        paymentProductId,
        card: {
          cardNumber: card.number,
          cardholderName: card.holderName,
          expiryDate: card.expiryDate,
          cvv: card.cvv
        },
        // SALE: authorised and captured at once. Acquirers that do not support it ignore it.
        // FINAL_AUTHORIZATION: capture the full amount within 7 days.
        // PRE_AUTHORIZATION: can be reversed; capture the authorised amount or less within 30 days.
        authorizationMode: "SALE",
        threeDSecure: { redirectionData: { returnUrl } }
      }
    };

    const context: PaymentContext = { idempotence: { key: await paymentAttemptKey(orderId, this.orders) } };
    // assertSuccess throws an SdkApiError if the platform answered with an error, including a declined payment;
    // see ErrorHandlingExample for handling each case.
    const response = assertSuccess(await this.client.payments.createPayment(this.merchantId, request, context)).body;
    return handleCreatePaymentResponse(response, orderId, this.orders);
  }
  // [END server-to-server-create]
}
