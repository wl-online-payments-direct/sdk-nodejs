/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CapturesResponse, ErrorResponse } from "../model/domain";

export function getCaptures(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CapturesResponse, ErrorResponse>> {
  return function(merchantId, paymentId, paymentContext): Promise<SdkResponse<CapturesResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/payments/${paymentId}/captures`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CapturesResponse, ErrorResponse>>;
  };
}
