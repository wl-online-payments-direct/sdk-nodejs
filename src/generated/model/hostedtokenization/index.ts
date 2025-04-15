/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { CreateHostedTokenizationRequest, CreateHostedTokenizationResponse, ErrorResponse, GetHostedTokenizationResponse } from "../domain";

export interface HostedTokenizationClient {
  /**
   * Resource /v2/{merchantId}/hostedtokenizations - Create hosted tokenization session
   */
  createHostedTokenization(
    merchantId: string,
    body: CreateHostedTokenizationRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CreateHostedTokenizationResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/hostedtokenizations/{hostedTokenizationId} - Get hosted tokenization session
   */
  getHostedTokenization(
    merchantId: string,
    hostedTokenizationId: string,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<GetHostedTokenizationResponse, ErrorResponse>>;
}
