/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { RefundErrorResponse, RefundRequest, RefundResponse } from "../model/domain";

import requestSchema from "../../../schemas/RefundRequest.json";

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
