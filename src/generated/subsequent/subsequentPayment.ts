/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { PaymentErrorResponse, SubsequentPaymentRequest, SubsequentPaymentResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/subsequentPaymentRequest";

export function subsequentPayment(
  sdkContext: SdkContext
): (
  merchantId: string,
  paymentId: string,
  body: SubsequentPaymentRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<SubsequentPaymentResponse, PaymentErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<SubsequentPaymentResponse, PaymentErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/subsequent`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<SubsequentPaymentResponse, PaymentErrorResponse>>;
  };
}
