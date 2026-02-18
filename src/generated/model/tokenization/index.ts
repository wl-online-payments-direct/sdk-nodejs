/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreateCertificateResponse, CsrRequest, DetokenizationResponse, ErrorResponse } from "../domain/index.js";

export interface TokenizationClient {
  /**
   * Resource /v2/{merchantId}/detokenize/csr - Sign certificate
   */
  createCertificate(merchantId: string, body: CsrRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CreateCertificateResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/detokenize/tokens - Get sensitive card details by card alias tokens
   */
  getCardDataByTokens(merchantId: string, params: GetCardDataByTokensParams): Promise<SdkResponse<DetokenizationResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/detokenize/payments - Get sensitive card details by card payment identifiers
   */
  getCardDataByPayments(merchantId: string, params: GetCardDataByPaymentsParams): Promise<SdkResponse<DetokenizationResponse, ErrorResponse>>;
}

export interface GetCardDataByTokensParams extends PaymentContext {
  tokens?: string[];
}

export interface GetCardDataByPaymentsParams extends PaymentContext {
  payments?: string[];
}
