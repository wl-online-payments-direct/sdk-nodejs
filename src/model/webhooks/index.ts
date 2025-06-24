import { InMemorySecretKeyStore, RequestHeaders, WebhooksContext } from "./types.js";
import { WebhooksEvent } from "../domain/index.js";

export interface Webhooks {
  init(context: WebhooksContext): WebhooksHelper;
  readonly inMemorySecretKeyStore: InMemorySecretKeyStore;
}

export * from "./types.js";

export interface WebhooksHelper {
  unmarshal(body: string | Buffer, requestHeaders: RequestHeaders): Promise<WebhooksEvent>;
  validate(body: string | Buffer, requestHeaders: RequestHeaders): Promise<void>;
}
