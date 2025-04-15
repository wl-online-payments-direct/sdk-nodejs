/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetPaymentProductGroupsResponse } from "../model/domain";
import { GetProductGroupsParams } from "../model/productgroups";

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
