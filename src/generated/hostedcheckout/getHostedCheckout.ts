/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetHostedCheckoutResponse } from "../model/domain";

export function getHostedCheckout(
  sdkContext: SdkContext
): (merchantId: string, hostedCheckoutId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetHostedCheckoutResponse, ErrorResponse>> {
  return function(merchantId, hostedCheckoutId, paymentContext): Promise<SdkResponse<GetHostedCheckoutResponse, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/hostedcheckouts/${hostedCheckoutId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetHostedCheckoutResponse, ErrorResponse>>;
  };
}
