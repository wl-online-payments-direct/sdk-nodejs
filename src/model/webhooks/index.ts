import { InMemorySecretKeyStore, RequestHeaders, WebhooksContext } from "./types";
import { WebhooksEvent } from "../domain";

export interface Webhooks {
  init(context: WebhooksContext): WebhooksHelper;
  readonly inMemorySecretKeyStore: InMemorySecretKeyStore;
}

export * from "./types";

export interface WebhooksHelper {
  unmarshal(body: string | Buffer, requestHeaders: RequestHeaders): Promise<WebhooksEvent>;
  validate(body: string | Buffer, requestHeaders: RequestHeaders): Promise<void>;
}
