/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentLinksResponse } from "../model/domain/index.js";
import { GetPaymentLinksInBulkParams } from "../model/paymentlinks/index.js";

export function getPaymentLinksInBulk(
  sdkContext: SdkContext
): (merchantId: string, params: GetPaymentLinksInBulkParams) => Promise<SdkResponse<PaymentLinksResponse, ErrorResponse>> {
  return function(merchantId, params): Promise<SdkResponse<PaymentLinksResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/paymentlinks`,
        body: null,
        paymentContext: params
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentLinksResponse, ErrorResponse>>;
  };
}
