/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PayoutResponse } from "../model/domain/index.js";

export function getPayout(
  sdkContext: SdkContext
): (merchantId: string, payoutId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PayoutResponse, ErrorResponse>> {
  return function(merchantId, payoutId, paymentContext): Promise<SdkResponse<PayoutResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/payouts/${payoutId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PayoutResponse, ErrorResponse>>;
  };
}
