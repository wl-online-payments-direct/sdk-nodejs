/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, PaymentProductNetworksResponse } from "../model/domain";
import { GetPaymentProductNetworksParams } from "../model/products";

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
