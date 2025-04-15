/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetPrivacyPolicyResponse } from "../model/domain";
import { GetPrivacyPolicyParams } from "../model/privacypolicy";

export function getPrivacyPolicy(sdkContext: SdkContext): (merchantId: string, params: GetPrivacyPolicyParams) => Promise<SdkResponse<GetPrivacyPolicyResponse, ErrorResponse>> {
  return function(merchantId, params): Promise<SdkResponse<GetPrivacyPolicyResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/services/privacypolicy`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<GetPrivacyPolicyResponse, ErrorResponse>>;
  };
}
