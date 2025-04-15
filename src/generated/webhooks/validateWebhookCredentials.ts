/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, ValidateCredentialsRequest, ValidateCredentialsResponse } from "../model/domain";

import requestSchema from "../../../schemas/ValidateCredentialsRequest.json";

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
