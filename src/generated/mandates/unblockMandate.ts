/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetMandateResponse } from "../model/domain";

export function unblockMandate(
  sdkContext: SdkContext
): (merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
  return function(merchantId, uniqueMandateReference, paymentContext): Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
    return json(
      {
        method: "POST",
        modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}/unblock`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  };
}
