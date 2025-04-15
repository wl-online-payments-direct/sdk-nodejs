/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { ErrorResponse, RefundsResponse } from "../domain";

export interface RefundsClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/refunds - Get refunds of payment
   */
  getRefunds(merchantId: string, paymentId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<RefundsResponse, ErrorResponse>>;
}
