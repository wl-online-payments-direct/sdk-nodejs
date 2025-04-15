/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, TokenResponse } from "../model/domain";

export function getToken(
  sdkContext: SdkContext
): (merchantId: string, tokenId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<TokenResponse, ErrorResponse>> {
  return function(merchantId, tokenId, paymentContext): Promise<SdkResponse<TokenResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/tokens/${tokenId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<TokenResponse, ErrorResponse>>;
  };
}
