/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetPaymentProductsResponse } from "../model/domain/index.js";
import { GetPaymentProductsParams } from "../model/products/index.js";

export function getPaymentProducts(
  sdkContext: SdkContext
): (merchantId: string, params: GetPaymentProductsParams) => Promise<SdkResponse<GetPaymentProductsResponse, ErrorResponse>> {
  return function(merchantId, params): Promise<SdkResponse<GetPaymentProductsResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/products`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<GetPaymentProductsResponse, ErrorResponse>>;
  };
}
