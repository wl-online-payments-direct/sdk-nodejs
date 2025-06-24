/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse } from "../model/domain/index.js";

export function deleteToken(sdkContext: SdkContext): (merchantId: string, tokenId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<void, ErrorResponse>> {
  return function(merchantId, tokenId, paymentContext): Promise<SdkResponse<void, ErrorResponse>> {
    return json(
      {
        method: "DELETE",
        modulePath: `/v2/${merchantId}/tokens/${tokenId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<void, ErrorResponse>>;
  };
}
