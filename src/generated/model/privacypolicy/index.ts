/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, GetPrivacyPolicyResponse } from "../domain/index.js";

export interface PrivacyPolicyClient {
  /**
   * Resource /v2/{merchantId}/services/privacypolicy - Get Privacy Policy
   */
  getPrivacyPolicy(merchantId: string, params: GetPrivacyPolicyParams): Promise<SdkResponse<GetPrivacyPolicyResponse, ErrorResponse>>;
}

export interface GetPrivacyPolicyParams extends PaymentContext {
  locale?: string;
  paymentProductId?: number;
}
