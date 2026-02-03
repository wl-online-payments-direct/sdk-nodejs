/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreatePayoutRequest, ErrorResponse, PayoutErrorResponse, PayoutResponse } from "../domain/index.js";

export interface PayoutsClient {
  /**
   * Resource /v2/{merchantId}/payouts - Create payout
   */
  createPayout(merchantId: string, body: CreatePayoutRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<PayoutResponse, PayoutErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payouts/{payoutId} - Get payout
   */
  getPayout(merchantId: string, payoutId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PayoutResponse, ErrorResponse>>;
}
