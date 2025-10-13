/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { PaymentErrorResponse, SubsequentPaymentRequest, SubsequentPaymentResponse } from "../domain/index.js";

export interface SubsequentClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/subsequent - Subsequent payment
   */
  subsequentPayment(
    merchantId: string,
    paymentId: string,
    body: SubsequentPaymentRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<SubsequentPaymentResponse, PaymentErrorResponse>>;
}
