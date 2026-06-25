/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentDetailsResponse } from "../model/domain/index.js";

export function getPaymentDetails(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PaymentDetailsResponse, ErrorResponse>> {
  return function(merchantId, paymentId, paymentContext): Promise<SdkResponse<PaymentDetailsResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/payments/${paymentId}/details`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentDetailsResponse, ErrorResponse>>;
  };
}
