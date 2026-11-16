import { assertSuccess, Client, Domain, PaymentContext } from "onlinepayments-sdk-nodejs";

// Each method takes an idempotence key. Create it once per operation (e.g. when someone clicks "Refund") and store
// it. Pass the same key again if the request got no answer; see ErrorHandlingExample.
export class AfterPaymentOperationsExample {
  public constructor(private readonly client: Client, private readonly merchantId: string) {}

  // [START capture-payment]
  // Captures an authorized payment (status PENDING_CAPTURE). Without an amount, the full amount is captured.
  public async capture(paymentId: string, amountInCents: number, isFinal: boolean, idempotenceKey: string): Promise<Domain.CaptureResponse> {
    const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, paymentId)).body;
    if (details.status !== "PENDING_CAPTURE") {
      throw new Error(`Payment ${paymentId} cannot be captured in status ${details.status}`);
    }

    const request: Domain.CapturePaymentRequest = {
      amount: amountInCents,
      // true: this capture is final, no further capture is accepted.
      isFinal
    };
    const context: PaymentContext = { idempotence: { key: idempotenceKey } };
    return assertSuccess(await this.client.payments.capturePayment(this.merchantId, paymentId, request, context)).body;
  }
  // [END capture-payment]

  // [START refund-payment]
  // Refunds a captured payment, fully or partly.
  public async refund(paymentId: string, amountInCents: number, currencyCode: string, idempotenceKey: string): Promise<Domain.RefundResponse> {
    const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, paymentId)).body;
    if (details.statusOutput?.isRefundable !== true) {
      throw new Error(`Payment ${paymentId} is not refundable in status ${details.status}`);
    }

    const request: Domain.RefundRequest = {
      amountOfMoney: { amount: amountInCents, currencyCode }
    };
    const context: PaymentContext = { idempotence: { key: idempotenceKey } };
    const refund = assertSuccess(await this.client.payments.refundPayment(this.merchantId, paymentId, request, context)).body;
    // REFUND_REQUESTED: the platform is processing the refund and waiting for the result. The status then becomes
    // REFUNDED or REJECTED; treat the refund as done only when it is REFUNDED.
    return refund;
  }
  // [END refund-payment]

  // [START cancel-payment]
  // Cancels (voids) an authorization that is not captured yet. No amount cancels the full amount.
  public async cancel(paymentId: string, idempotenceKey: string): Promise<Domain.CancelPaymentResponse> {
    const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, paymentId)).body;
    if (details.statusOutput?.isCancellable !== true) {
      throw new Error(`Payment ${paymentId} is not cancellable in status ${details.status}`);
    }

    const context: PaymentContext = { idempotence: { key: idempotenceKey } };
    return assertSuccess(await this.client.payments.cancelPayment(this.merchantId, paymentId, {}, context)).body;
  }
  // [END cancel-payment]
}
