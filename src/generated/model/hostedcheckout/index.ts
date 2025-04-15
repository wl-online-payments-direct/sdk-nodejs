/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { CreateHostedCheckoutRequest, CreateHostedCheckoutResponse, ErrorResponse, GetHostedCheckoutResponse } from "../domain";

export interface HostedCheckoutClient {
  /**
   * Resource /v2/{merchantId}/hostedcheckouts - Create hosted checkout
   */
  createHostedCheckout(
    merchantId: string,
    body: CreateHostedCheckoutRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CreateHostedCheckoutResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/hostedcheckouts/{hostedCheckoutId} - Get hosted checkout status
   */
  getHostedCheckout(merchantId: string, hostedCheckoutId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetHostedCheckoutResponse, ErrorResponse>>;
}
