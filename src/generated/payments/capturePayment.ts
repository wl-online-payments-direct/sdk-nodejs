/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CapturePaymentRequest, CaptureResponse, ErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/CapturePaymentRequest.js";

export function capturePayment(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, body: CapturePaymentRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CaptureResponse, ErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<CaptureResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/capture`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CaptureResponse, ErrorResponse>>;
  };
}
