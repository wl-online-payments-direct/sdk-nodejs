/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CompletePaymentRequest, CompletePaymentResponse, PaymentErrorResponse } from "../domain/index.js";

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
