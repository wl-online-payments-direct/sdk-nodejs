/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetMandateResponse } from "../model/domain/index.js";

export function getMandate(
  sdkContext: SdkContext
): (merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
  return function(merchantId, uniqueMandateReference, paymentContext): Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  };
}
