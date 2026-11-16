# Error handling

When the platform answers with an error, the SDK reports it as an exception or as an error response, depending on
the SDK; `nodejs.md` describes how this SDK does it and names its error types. Every API error carries the HTTP
status code and a list of errors with an `errorCode` and an `id`; a validation error names the field in
`propertyName` when it is about one field. A 404 also carries an `errorId` (quote it to support) and a `message`. A 400 validation error can
come without `errorId`, `message` and `retriable`: do not rely on them being set, and log the error codes, ids and
property names. A Hosted Checkout validation error does not repeat the values you sent.

## What to do per error

| Situation | HTTP | What to do |
|---|---|---|
| Payment declined | error with a payment result in the body (402 for an acquirer decline, 403 for a failed 3-D Secure authentication) | The payment exists. Read its status with `GetPaymentDetails` before deciding anything (mandatory rule 5). Show the customer a neutral message and let them try again. |
| Request still running for this idempotence key | 409 | The first request with the same key is still being processed. Wait a moment and send the same request with the same key. |
| Invalid request | 400 | Fix the request. Do not retry. The errors list names the property, if the error is about one. |
| Operation not allowed in the payment's state | 400 | The error id is `ACTION_NOT_ALLOWED_ON_TRANSACTION` and no property is named: for example a capture after the final capture or after a cancel, a refund before the capture or above the remaining amount, a second cancel. Read the status with `GetPaymentDetails`. Do not retry. |
| Wrong credentials or merchant ID | 403 with the error id `ACCESS_TO_MERCHANT_NOT_ALLOWED` and no payment in the body | Check the API key ID, secret, merchant ID and endpoint. Do not retry. |
| Object not found | 404 | Check the ID. |
| Technical error marked retriable | check `retriable` | If an error in the list has `retriable` = true, the request was not processed. Send it again with a **new** idempotence key, with a growing delay. Without `retriable`, do not retry. |
| Timeout or connection error | none | The request may or may not have been processed. Retry with the same idempotence key. For an operation that supports idempotence (see mandatory rule 1) the platform returns the original result instead of processing it twice. If retries fail, check with `GetPaymentDetails` before creating a new payment. |

## Rules

- Handle the most specific error first, for example a declined payment before a general API error. How the SDK
  reports errors, and which error type is the most general, differs per SDK; see `nodejs.md`.
- Reuse the idempotence key only when you got no answer (timeout, connection error) or a 409 for a request that is
  still running: the outcome is unknown, and a new key could create a second payment.
- Use a new key only when the platform answered with an error marked `retriable`: that request was not processed.
- Log fields, not bodies: the `errorId`, HTTP status, error codes and error ids. A payment ID with its status is
  also fine. Never log the request yourself. The SDK's own logging masks card data; it is off by default.
- Printing or serialising the SDK's error object can include the platform's response body; `nodejs.md` says
  how for this SDK. For Hosted Checkout create and get calls the body is a plain error response (an error ID and a
  list of errors), so logging the error object is fine there. Never log the body of a response that carries a
  payment: the error of a declined payment, or a successful `GetPaymentDetails` or `GetHostedCheckout`
  response. It holds the card's expiry date, which mandatory rule 6 forbids in logs, and customer data;
  only the card number arrives masked.
- Waiting between retries blocks the thread, and inside a customer's request it blocks the customer's browser. Keep
  the number of attempts and the delays small there, or hand the call to a background job.
- Show customers a neutral message. Do not show error codes or decline reasons.

```typescript
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
```
