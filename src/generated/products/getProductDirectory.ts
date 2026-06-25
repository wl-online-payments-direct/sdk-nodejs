/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, ProductDirectory } from "../model/domain/index.js";
import { GetProductDirectoryParams } from "../model/products/index.js";

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
