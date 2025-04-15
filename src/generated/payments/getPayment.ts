/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, PaymentResponse } from "../model/domain";

export function getPayment(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PaymentResponse, ErrorResponse>> {
  return function(merchantId, paymentId, paymentContext): Promise<SdkResponse<PaymentResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/payments/${paymentId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentResponse, ErrorResponse>>;
  };
}
