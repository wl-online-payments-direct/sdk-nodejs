/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse } from "../model/domain/index.js";

export function processBatch(
  sdkContext: SdkContext
): (merchantId: string, merchantBatchReference: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<void, ErrorResponse>> {
  return function(merchantId, merchantBatchReference, paymentContext): Promise<SdkResponse<void, ErrorResponse>> {
    return json(
      {
        method: "POST",
        modulePath: `/v2/${merchantId}/merchant-batches/${merchantBatchReference}/process`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<void, ErrorResponse>>;
  };
}
