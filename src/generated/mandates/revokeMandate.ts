/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, GetMandateResponse, RevokeMandateRequest } from "../model/domain/index.js";

import requestSchema from "../../../schemas/RevokeMandateRequest.js";

export function revokeMandate(
  sdkContext: SdkContext
): (
  merchantId: string,
  uniqueMandateReference: string,
  body: RevokeMandateRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
  return function(merchantId, uniqueMandateReference, body, paymentContext): Promise<SdkResponse<GetMandateResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}/revoke`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  };
}
