/*
 * This file was automatically generated.
 */
import { validateWebhookCredentials } from "./validateWebhookCredentials";
import { sendTestWebhook } from "./sendTestWebhook";
import { SdkContext } from "../../model";
import { WebhooksClient } from "../model/webhooks";

export function newWebhooksClient(sdkContext: SdkContext): WebhooksClient {
  return {
    validateWebhookCredentials: validateWebhookCredentials(sdkContext),
    sendTestWebhook: sendTestWebhook(sdkContext)
  };
}
