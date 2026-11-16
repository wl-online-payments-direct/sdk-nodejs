import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";
import { HostedCheckoutExample } from "./hostedCheckoutExample.js";
import { PaymentStatusExample } from "./paymentStatusExample.js";
import { OrderPaymentState, OrderStore } from "./types.js";

export class RecurringPaymentsExample {
  public constructor(
    private readonly client: Client,
    private readonly merchantId: string,
    private readonly orders: OrderStore,
    private readonly hostedCheckout: HostedCheckoutExample
  ) {}

  // [START recurring-first]
  // First payment of a subscription, made by the customer on the Hosted Checkout Page.
  // The recurring flag marks it as the first payment of the series.
  // It follows the Hosted Checkout flow: the return URL is built from your configuration and the call goes through the
  // same retry helper. Handle the return as there.
  public async startSubscription(orderId: string, amountInCents: number, currencyCode: string): Promise<string> {
    const request: Domain.CreateHostedCheckoutRequest = {
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId }
      },
      hostedCheckoutSpecificInput: {
        returnUrl: this.hostedCheckout.buildReturnUrl(orderId),
        isRecurring: true
      }
    };

    const response = await this.hostedCheckout.createWithRetry(request);
    await this.orders.saveHostedCheckout(orderId, response.hostedCheckoutId ?? "", response.RETURNMAC ?? "");
    return response.redirectUrl ?? "";
  }

  // When the first payment is authorised or captured, keep its payment ID: later charges refer to it.
  public async onFirstPaymentSucceeded(customerId: string, firstPaymentId: string): Promise<void> {
    await this.orders.saveRecurringPaymentId(customerId, firstPaymentId);
  }
  // [END recurring-first]

  // [START recurring-subsequent]
  // Later charge started by you, without the customer (merchant-initiated).
  // The caller creates ONE idempotence key per charge and stores it with the charge (orders.saveIdempotenceKey(orderId,
  // key)) before the first call, then passes the same key to every retry of that charge; retry rules are in the error
  // handling section.
  public async chargeRenewal(customerId: string, orderId: string, amountInCents: number, currencyCode: string, idempotenceKey: string): Promise<OrderPaymentState> {
    const firstPaymentId = await this.orders.getRecurringPaymentId(customerId);

    const request: Domain.SubsequentPaymentRequest = {
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId }
      },
      subsequentcardPaymentMethodSpecificInput: {
        // Recurring = fixed amount, regular intervals (at most one year), started by you.
        // Other allowed values: Unscheduled, Installment, NoShow, DelayedCharge, PartialShipment,
        // Resubmission, RecurringVariable, UnscheduledFixed.
        subsequentType: "Recurring",
        // SALE: authorised and captured at once. Acquirers that do not support it ignore it.
        authorizationMode: "SALE"
      }
    };

    const context: PaymentContext = { idempotence: { key: idempotenceKey } };
    // A declined charge is an error response with body.paymentResult; assertSuccess throws it as an SdkApiError.
    const response = assertSuccess(await this.client.subsequent.subsequentPayment(this.merchantId, firstPaymentId, request, context)).body;

    const payment = response.payment;
    await this.orders.savePaymentId(orderId, payment?.id ?? "");
    const state = PaymentStatusExample.toOrderState(payment?.status, payment?.statusOutput);
    await this.orders.saveState(orderId, state);
    return state;
  }
  // [END recurring-subsequent]
}
