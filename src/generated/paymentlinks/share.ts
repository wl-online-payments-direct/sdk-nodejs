/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, SharePaymentLinkRequest } from "../model/domain/index.js";

import requestSchema from "../../../schemas/sharePaymentLinkRequest.js";

export function share(
  sdkContext: SdkContext
): (merchantId: string, paymentLinkId: string, body: SharePaymentLinkRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<void, ErrorResponse>> {
  return function(merchantId, paymentLinkId, body, paymentContext): Promise<SdkResponse<void, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/paymentlinks/${paymentLinkId}/share`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<void, ErrorResponse>>;
  };
}
