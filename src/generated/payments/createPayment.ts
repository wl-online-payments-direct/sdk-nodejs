/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CreatePaymentRequest, CreatePaymentResponse, PaymentErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/createPaymentRequest.js";

export function createPayment(
  sdkContext: SdkContext
): (merchantId: string, body: CreatePaymentRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreatePaymentResponse, PaymentErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreatePaymentResponse, PaymentErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreatePaymentResponse, PaymentErrorResponse>>;
  };
}
