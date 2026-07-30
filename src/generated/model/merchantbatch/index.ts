/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, GetBatchStatusResponse, PaymentsReportResponse, SubmitBatchRequestBody, SubmitBatchResponse } from "../domain/index.js";

export interface MerchantBatchClient {
  /**
   * Resource /v2/{merchantId}/merchant-batches - Submit batch
   */
  submitBatch(merchantId: string, body: SubmitBatchRequestBody, paymentContext?: PaymentContext | null): Promise<SdkResponse<SubmitBatchResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/merchant-batches/{merchantBatchReference}/process - Process batch transactions
   */
  processBatch(merchantId: string, merchantBatchReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/merchant-batches/{merchantBatchReference} - Get batch status
   */
  getBatchStatus(merchantId: string, merchantBatchReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetBatchStatusResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/merchant-batches/{merchantBatchReference}/reports/payments - Get payments report
   */
  getPaymentsReport(merchantId: string, merchantBatchReference: string, params: GetPaymentsReportParams): Promise<SdkResponse<PaymentsReportResponse, ErrorResponse>>;
}

export interface GetPaymentsReportParams extends PaymentContext {
  cursor?: string;
  limit?: number;
}
