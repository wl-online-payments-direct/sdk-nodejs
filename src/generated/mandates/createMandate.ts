/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CreateMandateRequest, CreateMandateResponse, ErrorResponse } from "../model/domain";

import requestSchema from "../../../schemas/CreateMandateRequest.json";

export function createMandate(
  sdkContext: SdkContext
): (merchantId: string, body: CreateMandateRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreateMandateResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreateMandateResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/mandates`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreateMandateResponse, ErrorResponse>>;
  };
}
