/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetPaymentLinksByMerchantGroupRequest, PaymentLinkOverviewResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/getPaymentLinksByMerchantGroupRequest.js";

export function getPaymentLinksByMerchantGroupId(
  sdkContext: SdkContext
): (
  merchantId: string,
  merchantGroupId: string,
  body: GetPaymentLinksByMerchantGroupRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<PaymentLinkOverviewResponse, ErrorResponse>> {
  return function(merchantId, merchantGroupId, body, paymentContext): Promise<SdkResponse<PaymentLinkOverviewResponse, ErrorResponse>> {
    // validate body
    const isValidRequest = validate(body, requestSchema);
    if (!isValidRequest.valid) {
      const logger = sdkContext.getLogger();
      if (sdkContext.isLoggingEnabled()) {
        logger("error", isValidRequest.errors);
      }
      throw new Error(isValidRequest.errors.toString());
    }

    return json(
      {
        method: "POST",
        modulePath: `/v2/merchant-groups/${merchantGroupId}/paymentlinks/search`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentLinkOverviewResponse, ErrorResponse>>;
  };
}
