/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CapturesResponse, ErrorResponse } from "../domain/index.js";

export interface CapturesClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/captures - Get captures of payment
   */
  getCaptures(merchantId: string, paymentId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<CapturesResponse, ErrorResponse>>;
}
