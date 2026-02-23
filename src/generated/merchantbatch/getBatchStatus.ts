/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetBatchStatusResponse } from "../model/domain/index.js";

export function getBatchStatus(
  sdkContext: SdkContext
): (merchantId: string, merchantBatchReference: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetBatchStatusResponse, ErrorResponse>> {
  return function(merchantId, merchantBatchReference, paymentContext): Promise<SdkResponse<GetBatchStatusResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/merchant-batches/${merchantBatchReference}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetBatchStatusResponse, ErrorResponse>>;
  };
}
