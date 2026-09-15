/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { AddAuthorizationDetailsResponse, PaymentErrorResponse, UpdateAuthorizationAdditionalDataRequest } from "../model/domain/index.js";

import requestSchema from "../../../schemas/updateAuthorizationAdditionalDataRequest.js";

export function addAuthorizationDetails(
  sdkContext: SdkContext
): (
  merchantId: string,
  paymentId: string,
  body: UpdateAuthorizationAdditionalDataRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<AddAuthorizationDetailsResponse, PaymentErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<AddAuthorizationDetailsResponse, PaymentErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/authorization-additional-data`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<AddAuthorizationDetailsResponse, PaymentErrorResponse>>;
  };
}
