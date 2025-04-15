/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { CompletePaymentRequest, CompletePaymentResponse, PaymentErrorResponse } from "../domain";

export interface CompleteClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/complete - Complete payment
   */
  completePayment(
    merchantId: string,
    paymentId: string,
    body: CompletePaymentRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CompletePaymentResponse, PaymentErrorResponse>>;
}
