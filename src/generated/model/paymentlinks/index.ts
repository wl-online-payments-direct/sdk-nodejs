/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreatePaymentLinkRequest, ErrorResponse, PaymentLinkResponse, PaymentLinksResponse } from "../domain/index.js";

export interface PaymentLinksClient {
  /**
   * Resource /v2/{merchantId}/paymentlinks - Get payment links
   */
  getPaymentLinksInBulk(merchantId: string, params: GetPaymentLinksInBulkParams): Promise<SdkResponse<PaymentLinksResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks - Create payment link
   */
  createPaymentLink(merchantId: string, body: CreatePaymentLinkRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks/{paymentLinkId} - Get payment link by ID
   */
  getPaymentLinkById(merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks/{paymentLinkId}/cancel - Cancel PaymentLink by ID
   */
  cancelPaymentLinkById(merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
}

export interface GetPaymentLinksInBulkParams extends PaymentContext {
  operationGroupReference?: string;
}
