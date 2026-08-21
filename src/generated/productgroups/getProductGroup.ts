/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentProductGroup } from "../model/domain/index.js";
import { GetProductGroupParams } from "../model/productgroups/index.js";

export function getProductGroup(
  sdkContext: SdkContext
): (merchantId: string, paymentProductGroupId: string, params: GetProductGroupParams) => Promise<SdkResponse<PaymentProductGroup, ErrorResponse>> {
  return function(merchantId, paymentProductGroupId, params): Promise<SdkResponse<PaymentProductGroup, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/productgroups/${paymentProductGroupId}`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentProductGroup, ErrorResponse>>;
  };
}
