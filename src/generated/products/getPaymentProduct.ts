/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, PaymentProduct } from "../model/domain";
import { GetPaymentProductParams } from "../model/products";

export function getPaymentProduct(
  sdkContext: SdkContext
): (merchantId: string, paymentProductId: number, params: GetPaymentProductParams) => Promise<SdkResponse<PaymentProduct, ErrorResponse>> {
  return function(merchantId, paymentProductId, params): Promise<SdkResponse<PaymentProduct, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/products/${paymentProductId}`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentProduct, ErrorResponse>>;
  };
}
