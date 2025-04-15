/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { ErrorResponse, SendTestRequest, ValidateCredentialsRequest, ValidateCredentialsResponse } from "../domain";

export interface WebhooksClient {
  /**
   * Resource /v2/{merchantId}/webhooks/validateCredentials - Validate credentials
   */
  validateWebhookCredentials(
    merchantId: string,
    body: ValidateCredentialsRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<ValidateCredentialsResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/webhooks/sendtest - Send test
   */
  sendTestWebhook(merchantId: string, body: SendTestRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
}
