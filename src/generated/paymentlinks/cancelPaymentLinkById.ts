/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse } from "../model/domain/index.js";

export function cancelPaymentLinkById(
  sdkContext: SdkContext
): (merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<void, ErrorResponse>> {
  return function(merchantId, paymentLinkId, paymentContext): Promise<SdkResponse<void, ErrorResponse>> {
    return json(
      {
        method: "POST",
        modulePath: `/v2/${merchantId}/paymentlinks/${paymentLinkId}/cancel`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<void, ErrorResponse>>;
  };
}
