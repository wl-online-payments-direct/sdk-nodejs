import { WebhookInbox, WebhooksEvent, WebhooksHelper } from "./webhooksSetup.js";

export class WebhooksEndpoint {
  public constructor(private readonly webhooksHelper: WebhooksHelper, private readonly inbox: WebhookInbox) {}

  // [START webhooks-receive]
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
  // [END webhooks-receive]
}
