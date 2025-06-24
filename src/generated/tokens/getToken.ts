/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, TokenResponse } from "../model/domain/index.js";

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
