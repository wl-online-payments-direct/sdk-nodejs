/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentLinkResponse } from "../model/domain/index.js";

export function getPaymentLinkById(
  sdkContext: SdkContext
): (merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>> {
  return function(merchantId, paymentLinkId, paymentContext): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/paymentlinks/${paymentLinkId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  };
}
