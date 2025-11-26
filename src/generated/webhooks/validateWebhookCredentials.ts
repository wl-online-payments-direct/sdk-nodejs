/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, ValidateCredentialsRequest, ValidateCredentialsResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/validateCredentialsRequest";

export function validateWebhookCredentials(
  sdkContext: SdkContext
): (merchantId: string, body: ValidateCredentialsRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<ValidateCredentialsResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<ValidateCredentialsResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/webhooks/validateCredentials`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ValidateCredentialsResponse, ErrorResponse>>;
  };
}
