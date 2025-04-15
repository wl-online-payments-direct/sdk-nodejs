/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CreateHostedCheckoutRequest, CreateHostedCheckoutResponse, ErrorResponse } from "../model/domain";

import requestSchema from "../../../schemas/CreateHostedCheckoutRequest.json";

export function createHostedCheckout(
  sdkContext: SdkContext
): (merchantId: string, body: CreateHostedCheckoutRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreateHostedCheckoutResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreateHostedCheckoutResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/hostedcheckouts`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreateHostedCheckoutResponse, ErrorResponse>>;
  };
}
