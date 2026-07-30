/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentsReportResponse } from "../model/domain/index.js";
import { GetPaymentsReportParams } from "../model/merchantbatch/index.js";

export function getPaymentsReport(
  sdkContext: SdkContext
): (merchantId: string, merchantBatchReference: string, params: GetPaymentsReportParams) => Promise<SdkResponse<PaymentsReportResponse, ErrorResponse>> {
  return function(merchantId, merchantBatchReference, params): Promise<SdkResponse<PaymentsReportResponse, ErrorResponse>> {

    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/merchant-batches/${merchantBatchReference}/reports/payments`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentsReportResponse, ErrorResponse>>;
  };
}
