/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CreateHostedFieldsSessionRequest, CreateHostedFieldsSessionResponse, ErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/CreateHostedFieldsSessionRequest.js";

export function createHostedFieldsSession(
  sdkContext: SdkContext
): (merchantId: string, body: CreateHostedFieldsSessionRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreateHostedFieldsSessionResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreateHostedFieldsSessionResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/hostedfields/sessions`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreateHostedFieldsSessionResponse, ErrorResponse>>;
  };
}
