/*
 * This file was automatically generated.
 */
import { validateWebhookCredentials } from "./validateWebhookCredentials.js";
import { sendTestWebhook } from "./sendTestWebhook.js";
import { SdkContext } from "../../model/index.js";
import { WebhooksClient } from "../model/webhooks/index.js";

export function newWebhooksClient(sdkContext: SdkContext): WebhooksClient {
  return {
    validateWebhookCredentials: validateWebhookCredentials(sdkContext),
    sendTestWebhook: sendTestWebhook(sdkContext)
  };
}
