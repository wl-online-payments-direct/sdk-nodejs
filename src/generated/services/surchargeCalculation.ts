/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CalculateSurchargeRequest, CalculateSurchargeResponse, ErrorResponse } from "../model/domain";

import requestSchema from "../../../schemas/CalculateSurchargeRequest.json";

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
