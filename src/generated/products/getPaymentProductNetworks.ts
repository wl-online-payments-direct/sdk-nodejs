/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentProductNetworksResponse } from "../model/domain/index.js";
import { GetPaymentProductNetworksParams } from "../model/products/index.js";

export function getPaymentProductNetworks(
  sdkContext: SdkContext
): (merchantId: string, paymentProductId: number, params: GetPaymentProductNetworksParams) => Promise<SdkResponse<PaymentProductNetworksResponse, ErrorResponse>> {
  return function(merchantId, paymentProductId, params): Promise<SdkResponse<PaymentProductNetworksResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/products/${paymentProductId}/networks`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentProductNetworksResponse, ErrorResponse>>;
  };
}
