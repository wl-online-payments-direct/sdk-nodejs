import { webhooks } from "onlinepayments-sdk-nodejs";
import { requiredEnv } from "./clientSetup.js";

// [START webhooks-setup]
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
// [END webhooks-setup]

/**
 * Stand-in for your durable inbox: a database table or a persistent queue, not memory. A background job reads the
 * saved events and processes them (see WebhookEventProcessor), and retries the ones that failed.
 */
export interface WebhookInbox {
  /**
   * Saves a verified event. Ignores a duplicate: the platform can send the same event more than once, and the webhooks
   * guide identifies a duplicate by identical payment.id and type. Resolves when it is stored.
   */
  saveEvent(webhooksEvent: WebhooksEvent): Promise<void>;
  /** Saves the raw body of an event that passed verification but that the SDK cannot read, to replay it later. */
  saveUnreadableBody(rawBody: Buffer | string, reason: string): Promise<void>;
}
