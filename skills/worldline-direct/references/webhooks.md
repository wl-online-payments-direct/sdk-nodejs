# Webhooks

The platform sends an HTTP POST to your endpoint when a payment, refund, payment link, payout or token changes.
Webhooks are how you learn the result when the customer never returns to your site, and how you learn about changes
made later (captures, refunds, chargebacks).

## Set up

1. In the Merchant Portal, go to Developer > Webhooks. Generate the webhook key ID and secret, and enter your
   endpoint URL (HTTPS). The secret is displayed for 60 seconds only: store it at once. Generating a new pair
   revokes the existing one immediately.
2. Store the key ID and secret like the API secret: configuration or a secret store, never in code.
3. You can also send up to five endpoint URLs with each request in `feedbacks.webhooksUrls`;
   `feedbacks.webhookUrl` is deprecated.
4. Let the platform reach your endpoint: whitelist its IP range in your firewall (see the Firewall documentation on
   the documentation portal).
5. Create the SDK's webhooks helper once at startup with a secret key store that holds the key ID and secret.
6. Check the setup with the `ValidateWebhookCredentials` operation (your key and secret) and the `SendTestWebhook`
   operation (a test event, type `payment.test`; your endpoint must answer 2xx).

```typescript
// The package does not export the helper and event types; derive them from webhooks.init.
export type WebhooksHelper = ReturnType<typeof webhooks.init>;
export type WebhooksEvent = Awaited<ReturnType<WebhooksHelper["unmarshal"]>>;

// Create the helper once at startup: a missing or blank key ID or secret stops the application with a message that names
// the setting. The key ID and secret come from the Merchant Portal (Developer > Webhooks); keep them in a secret store
// (locally: your shell or run configuration, never a file in the repository).
// In production you can pass your own object with getSecretKey(keyId): Promise<string> on top of your secret storage.
export function createWebhooksHelper(): WebhooksHelper {
  webhooks.inMemorySecretKeyStore.storeSecretKey(requiredEnv("ONLINEPAYMENTS_WEBHOOK_KEY_ID"), requiredEnv("ONLINEPAYMENTS_WEBHOOK_SECRET"));
  return webhooks.init(webhooks.inMemorySecretKeyStore);
}
```

## Receive

Mandatory rule 4: verify every webhook with the SDK's webhooks helper before processing the event.

1. Read the raw request body as bytes or an unchanged string. The signature is calculated over the exact body; a
   body that was parsed and serialised again fails verification.
2. Pass the body and all request headers to the helper. It checks the `X-GCS-Signature` and `X-GCS-KeyId` headers
   and returns the parsed event. A repeated `X-GCS-Signature` or `X-GCS-KeyId` must fail verification, so never pass
   only the first value of a header. How to pass a repeated header depends on the helper: see `nodejs.md`.
3. If verification fails, answer with an error status and do not process the event. Do not add a way to skip
   verification, such as a configuration flag or a check for the development environment. For local testing, use a
   test webhook key ID and secret from the Merchant Portal, or send a test event with SendTestWebhook; both go
   through normal verification.
4. Save the verified event before you answer: a database row or a persistent queue, ignoring duplicates (the
   webhooks guide identifies a duplicate by identical `payment.id` and `type`). Then answer with HTTP 2xx right away,
   as the guide recommends, and do the work in the background. Do nothing else before the answer.
5. If the event passed verification but the SDK cannot read it (API version mismatch, malformed body), the sender
   is the platform, so do not answer with an error status. Save the raw body, log it with an alert, and answer 2xx.
   A retry would send the same body and fail the same way; the saved body can be replayed after you upgrade the
   SDK. Only a failed verification gets an error status.

When the platform gets no 2xx answer in time, it sends the event again: after 10 minutes, 1 hour, 2 hours, 8 hours
and 24 hours. Each delivery has a `retry-count` header: 0 for the first attempt, higher for a retry. Log it; it
tells a new event from a retry. A 2xx tells the platform the event arrived, so do not count on another delivery after
you answered 2xx. An event that is only in memory when the process dies can be lost, and retrying failed background
work does not make the platform send it again. Keep your own retry for saved events that failed. The guide also
recommends a back-up mechanism, so run a reconciliation job: for every order that stays pending longer than a
customer normally needs to pay, read the status with `GetPaymentDetails` (see "Payment status" in `flows.md`) and
update the order.

```typescript
// Call this from your HTTP endpoint with the raw body and the raw headers, e.g. in Express:
//   app.post("/webhooks", express.raw({ type: "*/*" }), async (req, res) => {
//     res.sendStatus(await endpoint.receive(req.body, req.rawHeaders));
//   });
// The route must get the raw body: a JSON body parser (express.json()) on this route breaks the signature check.
// Returns the HTTP status to answer with.
public async receive(body: Buffer | string, rawHeaders: readonly string[]): Promise<number> {
  let webhooksEvent: WebhooksEvent;
  try {
    // Checks the X-GCS-Signature and X-GCS-KeyId headers before parsing the event.
    webhooksEvent = await this.webhooksHelper.unmarshal(body, WebhooksEndpoint.distinctHeaders(rawHeaders));
  } catch (error) {
    // The signature is valid, but the SDK cannot read the event: a different API version (ApiVersionMismatchError,
    // a class the package does not export, so test its name) or a body that is not JSON (SyntaxError). The sender is
    // the platform, and a retry would fail the same way. Keep the body, raise an alert and answer 2xx; replay the
    // saved body after you upgrade the SDK.
    if (error instanceof SyntaxError || (error instanceof Error && error.name === "ApiVersionMismatchError")) {
      await this.inbox.saveUnreadableBody(body, error.message);
      console.error(`ALERT: saved a webhook that the SDK cannot read: ${error.name}: ${error.message}`);
      return 200;
    }
    // Failed verification: wrong or missing signature, a duplicate or missing header, or an unknown key ID
    // (SecretKeyNotAvailableError). Not sent by the platform, or the wrong secret is configured. Do nothing else.
    return 401;
  }

  // Save first, answer second. Do not count on the platform sending the event again after a 2xx, so an event that is
  // only in memory when the process dies can be lost. If saving fails, let the error through: a 5xx answer makes the
  // platform send the event again. Process it in a background job, not here.
  await this.inbox.saveEvent(webhooksEvent);
  return 200;
}

// req.headers joins repeated headers with ", " and hides a duplicate X-GCS-Signature or X-GCS-KeyId, which the helper
// rejects. req.headersDistinct would work, but it returns an array for every header, even a single one, and the helper
// rejects an array value. So build the map from rawHeaders ([name, value, name, value, ...]): a string for a header
// that was sent once, an array only for a repeated one.
private static distinctHeaders(rawHeaders: readonly string[]): Record<string, string | string[]> {
  const headers: Record<string, string | string[]> = Object.create(null);
  for (let i = 0; i + 1 < rawHeaders.length; i += 2) {
    const name = rawHeaders[i].toLowerCase();
    const value = rawHeaders[i + 1];
    const previous = headers[name];
    headers[name] = previous === undefined ? value : ([] as string[]).concat(previous, value);
  }
  return headers;
}
```

## Process

- **Duplicates are normal.** The same event can arrive more than once. Processing must be idempotent.
- **Order is not guaranteed.** A `payment.created` event can arrive after `payment.captured`.
- **Read the current status.** Treat the event as a signal: call `GetPaymentDetails` and update the order from its
  `statusOutput` (see "Payment status" in `flows.md`). This also makes duplicates and old events harmless. The
  `payment.id` of a payment changes when a maintenance operation (capture, refund, ...) is performed, and a hosted
  checkout session numbers its authorization attempts (`<id>_0`, `<id>_1`, ...). The platform strongly recommends not
  building your business operations around the ID. `GetPaymentDetails` with the ID of an earlier authorization
  attempt returns the payment's current state, with all operations in `operations` and the latest one as `id`, so
  reading the status by ID gives the current state even for an event about an older operation. Status changes made
  by the platform send webhooks too, without changing the `payment.id`.
- **Do not log the event or the request body.** The event's `payment` contains card details and customer data (see
  the logging rules in `errors.md`). Log the event `id`, `type` and the payment ID.
- **Find your order** with `payment.paymentOutput.references.merchantReference`, which holds the order reference you
  sent. The payment ID changes when you perform a maintenance operation such as a capture or refund, so do not use it as
  your only key.
- **Do not use webhooks for decisions during checkout.** While the customer waits, use `GetHostedCheckout` or
  `GetPaymentDetails`.

```typescript
// Runs in a background job on events saved in the inbox. Events can arrive twice and out of order, so read the current
// status instead of trusting the event; repeating this is harmless.
public async process(webhooksEvent: WebhooksEvent): Promise<void> {
  const payment = webhooksEvent.payment;
  if (!payment?.id) {
    // Refund, payment link, payout and token events carry other objects, e.g. webhooksEvent.refund.
    return;
  }

  const orderId = payment.paymentOutput?.references?.merchantReference;
  if (!orderId) {
    return;
  }

  const details = assertSuccess(await this.client.payments.getPaymentDetails(this.merchantId, payment.id)).body;
  await this.orders.savePaymentId(orderId, details.id ?? payment.id);
  await this.orders.saveState(orderId, PaymentStatusExample.toOrderState(details.status, details.statusOutput));
}
```

## Event types

| Object | Types |
|---|---|
| Payment | `payment.created`, `payment.redirected`, `payment.authorization_requested`, `payment.pending_approval`, `payment.pending_completion`, `payment.pending_capture`, `payment.capture_requested`, `payment.captured`, `payment.rejected`, `payment.rejected_capture`, `payment.cancelled`, `payment.refunded` |
| Refund | `refund.refund_requested` |
| Payment link | `paymentlink.created`, `paymentlink.clicked`, `paymentlink.paid`, `paymentlink.cancelled`, `paymentlink.expired`, `paymentlink.payment.rejected`, `paymentlink.payment.cancelled` |
| Test | `payment.test` (sent by the SendTestWebhook operation) |

The event's `type` field holds the type. The object that changed is in the matching field of the event (`payment`,
`refund`, `paymentLink`, `payout`, `token`).

Webhooks guide: https://docs.direct.worldline-solutions.com/en/integration/api-developer-guide/webhooks
