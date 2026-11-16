import { timingSafeEqual } from "crypto";
import { setTimeout as sleep } from "timers/promises";
import { assertSuccess, Client, Domain, SdkApiError, SdkResponse } from "onlinepayments-sdk-nodejs";
import { PaymentStatusExample } from "./paymentStatusExample.js";
import { OrderPaymentState, OrderStore } from "./types.js";

export class HostedCheckoutExample {
  private readonly paymentStatus: PaymentStatusExample;

  // publicBaseUrl is the absolute public URL of your shop from configuration (getPublicBaseUrl in the client setup).
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore, private readonly publicBaseUrl: string) {
    this.paymentStatus = new PaymentStatusExample(client, merchantId, orders);
  }

  // [START hosted-checkout-create]
  // Returns the URL to redirect the customer to.
  public async startCheckout(orderId: string, amountInCents: number, currencyCode: string): Promise<string> {
    const request: Domain.CreateHostedCheckoutRequest = {
      order: {
        amountOfMoney: { amount: amountInCents, currencyCode },
        references: { merchantReference: orderId }
      },
      hostedCheckoutSpecificInput: {
        returnUrl: this.buildReturnUrl(orderId),
        locale: "en-GB"
      }
    };

    const response = await this.createWithRetry(request);

    // Store both values with the order before the customer leaves your site.
    await this.orders.saveHostedCheckout(orderId, response.hostedCheckoutId ?? "", response.RETURNMAC ?? "");

    // Redirect to this URL exactly as returned. Do not build it from partialRedirectUrl.
    return response.redirectUrl ?? "";
  }

  // Your own order reference goes in the query string, escaped. The base URL comes from configuration: never use the
  // Host header of a request, the sender controls it.
  public buildReturnUrl(orderId: string): string {
    return `${this.publicBaseUrl}/return?orderId=${encodeURIComponent(orderId)}`;
  }
  // [END hosted-checkout-create]

  // [START hosted-checkout-retry]
  // CreateHostedCheckout does not support idempotent requests: the platform ignores an idempotence key, so every
  // resend creates a new session. That is harmless until the customer pays in it; the unused session expires. Send it
  // again after no answer or after an error marked retriable. The waiting happens inside the customer's request, so the
  // browser waits too: keep the attempts few and the delays short, or move the call to a background job.
  public async createWithRetry(request: Domain.CreateHostedCheckoutRequest): Promise<Domain.CreateHostedCheckoutResponse> {
    for (let attempt = 1; ; attempt++) {
      let response: SdkResponse<Domain.CreateHostedCheckoutResponse, Domain.ErrorResponse>;
      try {
        response = await this.client.hostedCheckout.createHostedCheckout(this.merchantId, request);
      } catch (error) {
        // No answer: timeout or connection error (an Error with a code such as ECONNRESET or ETIMEDOUT). Send it again.
        // Other errors, e.g. the SDK's check of the request against its JSON schema, are not retried.
        if (attempt >= 3 || !HostedCheckoutExample.isConnectionError(error)) {
          throw error;
        }
        await sleep(2000 * attempt);
        continue;
      }

      if (response.isSuccess) {
        return response.body;
      }

      // The platform answered with an error. The SDK does not throw: check the status and the errors.
      const errors = response.body?.errors ?? [];
      if (attempt < 3 && errors.some(error => error.retriable === true)) {
        // Marked retriable: the request was not processed. Send it again.
        await sleep(2000 * attempt);
        continue;
      }

      // Other errors reach the caller: invalid request, wrong credentials, not found, or no attempts left.
      // The error of a Hosted Checkout call is a plain error response (error ID and errors), so logging the error is
      // fine here; log at least the status, error ID and error codes.
      const codes = errors.map(error => `${error.errorCode} ${error.propertyName}`).join("; ");
      console.error(`createHostedCheckout failed: status ${response.status}, errorId ${response.body?.errorId}: ${codes}`);
      throw new SdkApiError("createHostedCheckout failed", response.status, response.body);
    }
  }

  private static isConnectionError(error: unknown): boolean {
    return error instanceof Error && typeof (error as NodeJS.ErrnoException).code === "string";
  }
  // [END hosted-checkout-retry]

  // [START hosted-checkout-return]
  // Called when the customer comes back on your return URL, e.g. with req.query.RETURNMAC in Express.
  public async handleReturn(orderId: string, returnMacFromQuery: string | undefined): Promise<OrderPaymentState> {
    const stored = await this.orders.getHostedCheckout(orderId);

    // The platform appends RETURNMAC to the return URL. It identifies the returning customer:
    // a missing or different value means the request does not belong to this checkout.
    if (!returnMacFromQuery || !HostedCheckoutExample.sameValue(stored.returnMac, returnMacFromQuery)) {
      throw new Error(`RETURNMAC does not match the stored value for order ${orderId}`);
    }

    // Never trust the redirect alone: read the result from the platform.
    let hostedCheckout: Domain.GetHostedCheckoutResponse;
    try {
      hostedCheckout = assertSuccess(await this.client.hostedCheckout.getHostedCheckout(this.merchantId, stored.hostedCheckoutId)).body;
    } catch (error) {
      // The SDK has no dedicated not-found error class: catch SdkApiError and rethrow it unless the status is 404.
      // Other API errors must not be swallowed.
      if (!(error instanceof SdkApiError) || error.status !== 404) {
        throw error;
      }
      // The API reference documents a 404 for this call. If it fails with not found, read the payment instead
      // (refreshPaymentState, see "Payment status"), with the payment ID that your webhook handler stored. Without a stored payment ID this returns "pending", not "failed": the webhook or your
      // reconciliation job settles the order. Other errors reach the caller.
      console.warn(`getHostedCheckout failed for order ${orderId}: status ${error.status}, using the payment status instead`);
      return this.paymentStatus.refreshPaymentState(orderId);
    }

    const payment = hostedCheckout.createdPaymentOutput?.payment;
    if (hostedCheckout.status === "PAYMENT_CREATED" && payment) {
      await this.orders.savePaymentId(orderId, payment.id ?? "");
      const state = PaymentStatusExample.toOrderState(payment.status, payment.statusOutput);
      await this.orders.saveState(orderId, state);
      return state;
    }
    if (hostedCheckout.status === "CANCELLED_BY_CONSUMER") {
      // The customer cancelled, or the session expired (the created payment is then cancelled with the error id
      // CANCELLED_BY_EXPIRATION).
      await this.orders.saveState(orderId, "cancelled");
      return "cancelled";
    }
    // IN_PROGRESS: the customer has not finished. A webhook will report the result.
    return "pending";
  }

  // Compares in constant time, so the comparison does not reveal the stored value.
  // timingSafeEqual throws for values of different length, so compare the lengths first.
  private static sameValue(expected: string, actual: string): boolean {
    const expectedBytes = Buffer.from(expected);
    const actualBytes = Buffer.from(actual);
    return expectedBytes.length === actualBytes.length && timingSafeEqual(expectedBytes, actualBytes);
  }
  // [END hosted-checkout-return]
}
