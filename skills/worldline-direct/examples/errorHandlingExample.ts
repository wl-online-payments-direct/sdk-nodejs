import { setTimeout as sleep } from "timers/promises";
import { assertSuccess, Client, Domain, PaymentContext, SdkApiError, SdkResponse } from "onlinepayments-sdk-nodejs";
import { handleCreatePaymentResponse } from "./createPaymentResponseHandler.js";
import { startPaymentAttempt } from "./paymentAttempt.js";
import { PaymentStatusExample } from "./paymentStatusExample.js";
import { OrderStore, PaymentStep } from "./types.js";

export class ErrorHandlingExample {
  public constructor(private readonly client: Client, private readonly merchantId: string, private readonly orders: OrderStore) {}

  // [START error-handling]
  // idempotenceKey is the stored key of the payment attempt (paymentAttemptKey). Reuse it when a request
  // got no answer; replace it, stored again, only when the platform answered with an error marked retriable.
  public async createPayment(orderId: string, request: Domain.CreatePaymentRequest, idempotenceKey: string): Promise<PaymentStep> {
    let context: PaymentContext = { idempotence: { key: idempotenceKey } };
    for (let attempt = 1; ; attempt++) {
      let response: SdkResponse<Domain.CreatePaymentResponse, Domain.PaymentErrorResponse>;
      try {
        response = await this.client.payments.createPayment(this.merchantId, request, context);
      } catch (error) {
        // No answer: timeout or connection error (an Error with a code such as ECONNRESET or ETIMEDOUT).
        // The payment may or may not exist. Retry with the same key; the platform returns the original result
        // instead of creating a second payment. Other errors, e.g. the SDK's check of the request against its
        // JSON schema before sending, are not retried.
        if (attempt >= 3 || !ErrorHandlingExample.isConnectionError(error)) {
          throw error;
        }
        await sleep(2000 * attempt);
        continue;
      }

      if (response.isSuccess) {
        return handleCreatePaymentResponse(response.body, orderId, this.orders);
      }

      // The platform answered with an error. The SDK does not throw: check the status and the body.
      const body = response.body;
      if (!body) {
        // An error answer with an empty body, e.g. from a proxy in front of the platform: there is nothing to read.
        throw new SdkApiError("createPayment failed", response.status, body);
      }
      if (body.paymentResult) {
        // Declined: the payment exists. Read its status before deciding anything.
        const paymentId = body.paymentResult.payment?.id;
        if (!paymentId) {
          await this.orders.saveState(orderId, "failed");
          return { kind: "done", state: "failed" };
        }
        await this.orders.savePaymentId(orderId, paymentId);
        const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, paymentId)).body;
        const state = PaymentStatusExample.toOrderState(details.status, details.statusOutput);
        await this.orders.saveState(orderId, state);
        return { kind: "done", state };
      }
      if (response.status === 409 && body.errors?.some(error => error.errorCode === "30001002")) {
        // The first request with this key is still running. Wait, then send the same request again.
        if (attempt >= 3) {
          throw new SdkApiError("createPayment still in progress", response.status, body);
        }
        await sleep(2000 * attempt);
        continue;
      }
      if (response.status === 400) {
        // The request is invalid. Fix the request; retrying does not help.
        // Log the error codes and the error ID, never the request (it can hold card data).
        const codes = (body.errors ?? []).map(error => `${error.errorCode} ${error.propertyName}`).join("; ");
        console.error(`createPayment rejected, errorId ${body.errorId}: ${codes}`);
        throw new SdkApiError("createPayment rejected", response.status, body);
      }
      // A technical error marked retriable: the request was not processed.
      // Send it again with a new key, stored before the call like the first one.
      // Other errors are not retried: 403 (wrong API key, secret or merchant ID), 404, 409, 410 (object not
      // found), and server errors without a retriable error.
      if (attempt >= 3 || !body.errors?.some(error => error.retriable === true)) {
        throw new SdkApiError("createPayment failed", response.status, body);
      }
      context = { idempotence: { key: await startPaymentAttempt(orderId, this.orders) } };
      await sleep(2000 * attempt);
    }
  }

  private static isConnectionError(error: unknown): boolean {
    return error instanceof Error && typeof (error as NodeJS.ErrnoException).code === "string";
  }
  // [END error-handling]
}
