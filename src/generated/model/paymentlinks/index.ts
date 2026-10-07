/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import {
  CreatePaymentLinkRequest,
  ErrorResponse,
  GetPaymentLinksByMerchantGroupRequest,
  PaymentLinkOverviewResponse,
  PaymentLinkResponse,
  SharePaymentLinkRequest
} from "../domain/index.js";

export interface PaymentLinksClient {
  /**
   * Resource /v2/{merchantId}/paymentlinks/{paymentLinkId}/share - Share the specified payment link to a customer.
   */
  share(merchantId: string, paymentLinkId: string, body: SharePaymentLinkRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks - Create payment link
   */
  createPaymentLink(merchantId: string, body: CreatePaymentLinkRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  /**
   * Resource /v2/merchant-groups/{merchantGroupId}/paymentlinks/search - Retrieve payment links for a merchant group
   */
  getPaymentLinksByMerchantGroupId(
    merchantId: string,
    merchantGroupId: string,
    body: GetPaymentLinksByMerchantGroupRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<PaymentLinkOverviewResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks/{paymentLinkId} - Get payment link by ID
   */
  getPaymentLinkById(merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/paymentlinks/{paymentLinkId}/cancel - Cancel PaymentLink by ID
   */
  cancelPaymentLinkById(merchantId: string, paymentLinkId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
}
