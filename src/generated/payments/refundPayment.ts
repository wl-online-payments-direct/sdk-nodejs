/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { RefundErrorResponse, RefundRequest, RefundResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/refundRequest";

export function refundPayment(
  sdkContext: SdkContext
): (merchantId: string, paymentId: string, body: RefundRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<RefundResponse, RefundErrorResponse>> {
  return function(merchantId, paymentId, body, paymentContext): Promise<SdkResponse<RefundResponse, RefundErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/payments/${paymentId}/refund`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<RefundResponse, RefundErrorResponse>>;
  };
}
