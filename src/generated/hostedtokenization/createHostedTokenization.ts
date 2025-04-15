/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CreateHostedTokenizationRequest, CreateHostedTokenizationResponse, ErrorResponse } from "../model/domain";

import requestSchema from "../../../schemas/CreateHostedTokenizationRequest.json";

export function createHostedTokenization(
  sdkContext: SdkContext
): (merchantId: string, body: CreateHostedTokenizationRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreateHostedTokenizationResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreateHostedTokenizationResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/hostedtokenizations`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreateHostedTokenizationResponse, ErrorResponse>>;
  };
}
