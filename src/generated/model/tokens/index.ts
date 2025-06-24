/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreateTokenRequest, CreatedTokenResponse, ErrorResponse, TokenResponse } from "../domain/index.js";

export interface TokensClient {
  /**
   * Resource /v2/{merchantId}/tokens/{tokenId} - Get token
   */
  getToken(merchantId: string, tokenId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<TokenResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/tokens/{tokenId} - Delete token
   */
  deleteToken(merchantId: string, tokenId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<void, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/tokens - Create token
   */
  createToken(merchantId: string, body: CreateTokenRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CreatedTokenResponse, ErrorResponse>>;
}
