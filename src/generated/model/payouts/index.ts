/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { CreatePayoutRequest, ErrorResponse, PayoutErrorResponse, PayoutResponse } from "../domain";

export interface PayoutsClient {
  /**
   * Resource /v2/{merchantId}/payouts/{payoutId} - Get payout
   */
  getPayout(merchantId: string, payoutId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PayoutResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payouts - Create payout
   */
  createPayout(merchantId: string, body: CreatePayoutRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<PayoutResponse, PayoutErrorResponse>>;
}
