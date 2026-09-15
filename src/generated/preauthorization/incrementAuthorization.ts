/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { IncrementAuthorizationRequest, IncrementAuthorizationResponse, PaymentErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/incrementAuthorizationRequest.js";

export function incrementAuthorization(
  sdkContext: SdkContext
): (
  merchantId: string,
  paymentId: string,
  body: IncrementAuthorizationRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<IncrementAuthorizationResponse, PaymentErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<IncrementAuthorizationResponse, PaymentErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/increment-authorization`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<IncrementAuthorizationResponse, PaymentErrorResponse>>;
  };
}
