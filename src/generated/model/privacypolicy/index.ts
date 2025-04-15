/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { ErrorResponse, GetPrivacyPolicyResponse } from "../domain";

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
