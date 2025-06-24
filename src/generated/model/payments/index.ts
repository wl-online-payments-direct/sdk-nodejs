/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import {
  CancelPaymentRequest,
  CancelPaymentResponse,
  CapturePaymentRequest,
  CaptureResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  ErrorResponse,
  PaymentDetailsResponse,
  PaymentErrorResponse,
  PaymentResponse,
  RefundErrorResponse,
  RefundRequest,
  RefundResponse,
  SubsequentPaymentRequest,
  SubsequentPaymentResponse
} from "../domain/index.js";

export interface PaymentsClient {
  /**
   * Resource /v2/{merchantId}/payments - Create payment
   */
  createPayment(merchantId: string, body: CreatePaymentRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CreatePaymentResponse, PaymentErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId} - Get payment
   */
  getPayment(merchantId: string, paymentId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/details - Get payment details
   */
  getPaymentDetails(merchantId: string, paymentId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentDetailsResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/cancel - Cancel payment
   */
  cancelPayment(
    merchantId: string,
    paymentId: string,
    body: CancelPaymentRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CancelPaymentResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/capture - Capture payment
   */
  capturePayment(merchantId: string, paymentId: string, body: CapturePaymentRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CaptureResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/refund - Refund payment
   */
  refundPayment(merchantId: string, paymentId: string, body: RefundRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<RefundResponse, RefundErrorResponse>>;
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
