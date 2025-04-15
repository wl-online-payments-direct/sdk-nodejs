/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, RefundsResponse } from "../model/domain";

export function getRefunds(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<RefundsResponse, ErrorResponse>> {
  return function(merchantId, paymentId, paymentContext): Promise<SdkResponse<RefundsResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/payments/${paymentId}/refunds`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<RefundsResponse, ErrorResponse>>;
  };
}
