/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetHostedTokenizationResponse } from "../model/domain";

export function getHostedTokenization(
  sdkContext: SdkContext
): (merchantId: string, hostedTokenizationId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetHostedTokenizationResponse, ErrorResponse>> {
  return function(merchantId, hostedTokenizationId, paymentContext): Promise<SdkResponse<GetHostedTokenizationResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/hostedtokenizations/${hostedTokenizationId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetHostedTokenizationResponse, ErrorResponse>>;
  };
}
