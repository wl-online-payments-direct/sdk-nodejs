/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { DetokenizationResponse, ErrorResponse } from "../model/domain/index.js";
import { GetCardDataByTokensParams } from "../model/tokenization/index.js";

export function getCardDataByTokens(
  sdkContext: SdkContext
): (merchantId: string, params: GetCardDataByTokensParams) => Promise<SdkResponse<DetokenizationResponse, ErrorResponse>> {
  return function(merchantId, params): Promise<SdkResponse<DetokenizationResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/detokenize/tokens`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<DetokenizationResponse, ErrorResponse>>;
  };
}
