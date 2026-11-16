# Node.js SDK reference

How to install and set up the Node.js SDK (`onlinepayments-sdk-nodejs`), and the SDK calls for the API operations used in
this skill.
Source code and README: https://github.com/wl-online-payments-direct/sdk-nodejs

## Install

```
npm install onlinepayments-sdk-nodejs
```

Requires Node.js 18 or later. The package contains its TypeScript declarations and works with both `import` (ES
modules) and `require` (CommonJS).

## Modules

Everything is imported from the package root; the package does not allow imports of its internal files.

| Export | Contains |
|---|---|
| `init` | Creates the `Client` from a `Configuration` |
| `Domain` | Namespace with all request and response types (`Domain.CreatePaymentRequest`, `Domain.Order`, `Domain.AmountOfMoney`, ...) |
| `Client`, `Configuration`, `PaymentContext`, `SdkResponse`, `CommunicatorLogger` | Types for the client, its configuration, the call options and the call result |
| `assertSuccess`, `SdkApiError` | Turn an error response into an exception |
| `webhooks` | `webhooks.init(secretKeyStore)` creates the webhooks helper; `webhooks.inMemorySecretKeyStore` |
| `obfuscate` | Rules for masking extra fields in the SDK log |

`import onlinePaymentsSdk from "onlinepayments-sdk-nodejs"` gives an object with `init`, `webhooks`, `obfuscate` and
`assertSuccess`. The webhooks helper and webhook event types are not exported; derive them as in the webhooks setup
example: `ReturnType<typeof webhooks.init>`.

## Client setup

```typescript
// Create the client once when the application starts and reuse it for every request.
// Call createClient, getMerchantId and getPublicBaseUrl at startup: a missing or invalid setting then stops the
// application with a message that names it, instead of failing on the first customer's request.
export function createClient(): Client {
  return init({
    // Test or live endpoint, e.g. https://payment.direct.ecom.preprod.worldline-solutions.com. The SDK takes the host
    // name only; the scheme defaults to https and the port to 443.
    host: requiredUrl("ONLINEPAYMENTS_API_ENDPOINT").hostname,
    apiKeyId: requiredEnv("ONLINEPAYMENTS_API_KEY_ID"),
    secretApiKey: requiredEnv("ONLINEPAYMENTS_API_SECRET"),
    // Required: init() throws "integrator is required" without it (it only tests that the value is not empty, so
    // validate it yourself, as here). Your company or application name; it identifies your requests in the platform logs.
    integrator: requiredEnv("ONLINEPAYMENTS_INTEGRATOR"),
    // The agent holds the connection pool and the timeout (in milliseconds).
    connectionOptions: { agent: createAgent(300000) }
  });
}

// The merchant ID is your PSPID. Every API call takes it as its first argument.
export function getMerchantId(): string {
  return requiredEnv("ONLINEPAYMENTS_MERCHANT_ID");
}

// The SDK has no timeout setting, and the timeout option of an agent alone does not stop a request: without this,
// a call can wait forever. This agent closes a connection that has been inactive for timeoutMs milliseconds; the
// call then rejects with "socket hang up" (code ECONNRESET), like any other connection error.
function createAgent(timeoutMs: number): https.Agent {
  const agent = new https.Agent({ keepAlive: true, timeout: timeoutMs });
  // createConnection is a documented Agent method that custom agents may override; older @types/node versions do
  // not declare it.
  const connections = (agent as unknown) as { createConnection: CreateConnection };
  const createConnection = connections.createConnection.bind(agent);
  connections.createConnection = (options, callback) => {
    const socket = createConnection(options, callback);
    socket?.on("timeout", () => socket.destroy());
    return socket;
  };
  return agent;
}

type CreateConnection = (options: https.RequestOptions, callback?: (error: Error | null, socket: Duplex) => void) => Duplex | null | undefined;

// The public base URL of your shop, e.g. https://shop.example. Return URLs are built from it, never from the Host
// header of a request. Origin and path only, without a trailing slash.
export function getPublicBaseUrl(): string {
  const url = requiredUrl("SHOP_PUBLIC_BASE_URL");
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Configuration error: SHOP_PUBLIC_BASE_URL must be an http:// or https:// URL`);
  }
  return url.origin + url.pathname.replace(/\/+$/, "");
}

// Read settings from the environment, filled from a secret store of your platform. For local development keep the
// secrets in your shell or run configuration, never in a file in the repository. A blank value counts as missing.
export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Configuration error: environment variable ${name} is not set or blank`);
  }
  return value;
}

export function requiredUrl(name: string): URL {
  const value = requiredEnv(name);
  try {
    return new URL(value);
  } catch {
    // Do not repeat the value: a URL can hold credentials.
    throw new Error(`Configuration error: ${name} must be an absolute URL, e.g. https://shop.example`);
  }
}
```

- `integrator` is required: `init()` throws a plain `Error` (`integrator is required`) when it is missing. The check is a
  truthiness test, so a blank value such as `" "` passes; the example validates it as non-blank.
- `host` is the host name of the endpoint only, without `https://` or a path. `scheme` defaults to `https` and `port`
  to 443.
- The SDK has no timeout setting and no connection pool of its own: requests use the agent in
  `connectionOptions.agent` when you pass one (the example does). Create the client once and reuse it.
- In NestJS or another framework with dependency injection, register the client and the merchant ID as singletons.

## Conventions

- Every call returns a `Promise<SdkResponse<T, E>>`. The SDK does not throw for API errors: check
  `response.isSuccess`. When it is `true`, `response.body` is the response (`T`); when it is `false`,
  `response.status` is the HTTP status and `response.body` the error body (`E`). See "Errors" below.
- There is no merchant client: every call takes the merchant ID as its first argument, e.g.
  `client.payments.createPayment(merchantId, request, context)`.
- Requests and responses are plain objects typed with the interfaces in `Domain`, with the API property names:
  `{ order: { amountOfMoney: { amount: 1000, currencyCode: "EUR" } } }`. All properties are optional and can be
  `null` or `undefined` in responses; use `?.` and compare flags with `=== true`.
- Every call takes an optional `PaymentContext` as last argument. Set the idempotence key with
  `const context: PaymentContext = { idempotence: { key } }`, for example with `randomUUID()` from `crypto`. After
  the call, `context.idempotence.requestTimestamp` is set if the platform returned the result of an earlier request
  with the same key. `createHostedCheckout` and `createPaymentLink` ignore the key: send none.
- Before sending, the SDK checks a request body against its JSON schema and throws an `Error` (without a `code`) if
  it does not match. Fix the request; do not retry.
- Properties marked `@deprecated` are deprecated in the API. Use the replacement named in the doc comment.

## API operations used in this skill

All calls take the merchant ID (your PSPID) as first argument.

| API operation | SDK call | Used in |
|---|---|---|
| CreateHostedCheckout | `client.hostedCheckout.createHostedCheckout(merchantId, request)` | Hosted Checkout, recurring payments |
| GetHostedCheckout | `client.hostedCheckout.getHostedCheckout(merchantId, hostedCheckoutId)` | Hosted Checkout |
| CreateHostedTokenization | `client.hostedTokenization.createHostedTokenization(merchantId, request)` | Hosted Tokenization |
| CreateHostedFieldsSession | `client.hostedFields.createHostedFieldsSession(merchantId, request)` | Hosted Fields |
| CreateSession | `client.sessions.createSession(merchantId, request)` | Client integration |
| CreatePayment | `client.payments.createPayment(merchantId, request, context)` | Server-to-server, Hosted Tokenization, Hosted Fields, client integration |
| GetPaymentDetails | `client.payments.getPaymentDetails(merchantId, paymentId)` | Payment status, webhooks, error handling |
| CapturePayment | `client.payments.capturePayment(merchantId, paymentId, request, context)` | After-payment operations |
| RefundPayment | `client.payments.refundPayment(merchantId, paymentId, request, context)` | After-payment operations |
| CancelPayment | `client.payments.cancelPayment(merchantId, paymentId, request, context)` | After-payment operations |
| SubsequentPayment | `client.subsequent.subsequentPayment(merchantId, paymentId, request, context)` | Recurring payments |
| CreatePaymentLink | `client.paymentLinks.createPaymentLink(merchantId, request)` | Payment Links |
| GetPaymentLinkById | `client.paymentLinks.getPaymentLinkById(merchantId, paymentLinkId)` | Payment Links |

For anything else, use the API reference; the SDK's sub-clients and method names match the operation names there.

## Errors

The SDK reports errors in two ways:

- **Error response.** When the platform answers with an error, the promise resolves with `isSuccess: false`. Use
  `response.status` and `response.body`. `assertSuccess(response)` returns the success response or throws an
  `SdkApiError` with the same `status` and `body`; the examples use it where they do not handle the error
  themselves.
- **Rejected promise.** When there is no valid answer, the promise rejects with an `Error`.

| Error | How to recognise it |
|---|---|
| Declined payment | `isSuccess` is `false` and `body.paymentResult` is set (`Domain.PaymentErrorResponse`). `body.paymentResult.payment.id` is the created payment. Also for `subsequentPayment`. |
| Request still running for this idempotence key | `status` 409 and an error with `errorCode` `30001002`. |
| Invalid request | `status` 400, including an operation that the payment's state does not allow (error `id` `ACTION_NOT_ALLOWED_ON_TRANSACTION`). |
| Wrong credentials or not allowed | `status` 403 (a wrong API key ID, secret or merchant ID has the error `id` `ACCESS_TO_MERCHANT_NOT_ALLOWED`). |
| Object not found | `status` 404. |
| Technical error | `status` 500, 502 or 503. Retry only if an error has `retriable === true`, with a new idempotence key. |
| Timeout or connection error | The promise rejects with an `Error` that has a `code`. |
| Response that is not JSON | The promise rejects with a native `SyntaxError` that has `status` and `body` attached, whatever the status (also 2xx). |
| Request does not match the SDK's JSON schema | The call throws an `Error` without a `code` before sending. |
| `SdkApiError` | Thrown by `assertSuccess` for any error response. Has `status` and `body`. The most general API error type; there is no `statusCode` field. |
| Webhook signature failure | `unmarshal` rejects with a plain `Error` (wrong signature, missing header, duplicate `X-GCS-Signature` / `X-GCS-KeyId`), or with `SecretKeyNotAvailableError` (unknown key ID). |
| Webhook of another API version | `unmarshal` rejects with `ApiVersionMismatchError` (`eventApiVersion`, `sdkApiVersion`), after the signature was verified. |
| Webhook body is not JSON | `unmarshal` rejects with a native `SyntaxError`, after the signature was verified. |

`SecretKeyNotAvailableError` and `ApiVersionMismatchError` extend `Error` but are not exported from the package; recognise
them by `error.name`. `SdkApiError` and `SyntaxError` work with `instanceof`.

The error body has `errorId` and `errors`, a list of `Domain.APIError` with `errorCode`, `propertyName`, `message`,
`httpStatusCode` and `retriable`. `body` is `null` for an error response with an empty body: check it before you read
`body.errorId`. The body of a declined payment also carries the payment; do not log it.

An `SdkApiError` has a fixed message (`the Online Payments platform returned an error response`); the response body is
in its public, enumerable `body` property. `JSON.stringify(error)` and `util.inspect(error)` (so also `console.error(error)`)
include the body; `error.stack` and `error.toString()` do not. So "log the error object" in the shared text means
`JSON.stringify` or `inspect`: do it only for Hosted Checkout calls, whose error body is a plain error response. For a
declined payment log `error.status`, `error.body.errorId` and the `errorCode` values.

The created payment output of Hosted Checkout (`createdPaymentOutput` of `getHostedCheckout`) has the payment status
category as `paymentStatusCategory`, next to `payment`.

## Webhooks

`webhooks.init(secretKeyStore)` creates the helper; `secretKeyStore` is any object with
`getSecretKey(keyId): Promise<string>`, for example `webhooks.inMemorySecretKeyStore` after `storeSecretKey(keyId,
secret)` (a second call with the same key ID overwrites; blank values throw; the store is one shared object).
`await helper.unmarshal(body, headers)` takes the raw body (`Buffer` or unchanged `string`) and returns the event with
`id`, `type`, `created`, `merchantId` and one of `payment`, `refund`, `paymentLink`, `payout`, `token`. For the errors it
rejects with, see "Errors". Use `helper.validate(body, headers)` to only check the signature.

Headers are a map from name to `string | string[]`. The helper finds a name case-insensitively and rejects with a plain
`Error` when the value is an array, which it treats as a duplicate `X-GCS-Signature` or `X-GCS-KeyId` (also an array
with one element). Node's `req.headers` joins repeated headers with `, `, which hides the duplicate. `req.headersDistinct`
returns an array for every header, which the helper rejects. So build the map from `req.rawHeaders` as the example does: a
string for a header sent once, an array only for a repeated one.

In Express, read the body with `express.raw({ type: "*/*" })` on the webhook route, not `express.json()`. See
`webhooks.md` for the full handler.

## Logging

Set `enableLogging: true` in the configuration, or call `client.context.setEnableLogging(true)`, to log requests and
responses with card data and secrets masked. By default the SDK logs with `console`; set `logger` in the
configuration to an object with `info`, `warn` and `error` functions to use your own logger. Add masking for other
fields with `obfuscationRules` and the `obfuscate` rules. Do not log request or response objects yourself.
