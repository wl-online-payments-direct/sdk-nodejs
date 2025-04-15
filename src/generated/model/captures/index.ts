/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { CapturesResponse, ErrorResponse } from "../domain";

export interface CapturesClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/captures - Get captures of payment
   */
  getCaptures(merchantId: string, paymentId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<CapturesResponse, ErrorResponse>>;
}
