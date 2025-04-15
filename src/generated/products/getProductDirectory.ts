/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, ProductDirectory } from "../model/domain";
import { GetProductDirectoryParams } from "../model/products";

export function getProductDirectory(
  sdkContext: SdkContext
): (merchantId: string, paymentProductId: number, params: GetProductDirectoryParams) => Promise<SdkResponse<ProductDirectory, ErrorResponse>> {
  return function(merchantId, paymentProductId, params): Promise<SdkResponse<ProductDirectory, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/products/${paymentProductId}/directory`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<ProductDirectory, ErrorResponse>>;
  };
}
