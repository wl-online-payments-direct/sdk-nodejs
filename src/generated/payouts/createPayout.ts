/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CreatePayoutRequest, PayoutErrorResponse, PayoutResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/createPayoutRequest.js";

export function createPayout(
  sdkContext: SdkContext
): (merchantId: string, body: CreatePayoutRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PayoutResponse, PayoutErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<PayoutResponse, PayoutErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payouts`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PayoutResponse, PayoutErrorResponse>>;
  };
}
