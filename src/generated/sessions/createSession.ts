/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, SessionRequest, SessionResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/sessionRequest.js";

export function createSession(
  sdkContext: SdkContext
): (merchantId: string, body: SessionRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<SessionResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<SessionResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/sessions`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<SessionResponse, ErrorResponse>>;
  };
}
