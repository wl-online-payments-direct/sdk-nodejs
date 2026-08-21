/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetPaymentProductGroupsResponse } from "../model/domain/index.js";
import { GetProductGroupsParams } from "../model/productgroups/index.js";

export function getProductGroups(
  sdkContext: SdkContext
): (merchantId: string, params: GetProductGroupsParams) => Promise<SdkResponse<GetPaymentProductGroupsResponse, ErrorResponse>> {
  return function(merchantId, params): Promise<SdkResponse<GetPaymentProductGroupsResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/productgroups`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<GetPaymentProductGroupsResponse, ErrorResponse>>;
  };
}
