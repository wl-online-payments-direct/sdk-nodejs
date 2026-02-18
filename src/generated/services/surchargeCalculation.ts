/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CalculateSurchargeRequest, CalculateSurchargeResponse, ErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/CalculateSurchargeRequest.js";

export function surchargeCalculation(
  sdkContext: SdkContext
): (merchantId: string, body: CalculateSurchargeRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CalculateSurchargeResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CalculateSurchargeResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/services/surchargecalculation`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CalculateSurchargeResponse, ErrorResponse>>;
  };
}
