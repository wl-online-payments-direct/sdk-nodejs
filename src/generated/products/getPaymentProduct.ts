/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentProduct } from "../model/domain/index.js";
import { GetPaymentProductParams } from "../model/products/index.js";

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
