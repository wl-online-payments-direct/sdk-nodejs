/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CompletePaymentRequest, CompletePaymentResponse, PaymentErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/completePaymentRequest";

export function completePayment(
  sdkContext: SdkContext
): (
  merchantId: string,
  paymentId: string,
  body: CompletePaymentRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<CompletePaymentResponse, PaymentErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<CompletePaymentResponse, PaymentErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/complete`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CompletePaymentResponse, PaymentErrorResponse>>;
  };
}
