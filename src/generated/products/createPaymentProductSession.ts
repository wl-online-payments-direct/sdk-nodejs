/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, PaymentProductSessionRequest, PaymentProductSessionResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/paymentProductSessionRequest.js";

export function createPaymentProductSession(
  sdkContext: SdkContext
): (
  merchantId: string,
  paymentProductId: number,
  body: PaymentProductSessionRequest,
  paymentContext?: PaymentContext | null
) => Promise<SdkResponse<PaymentProductSessionResponse, ErrorResponse>> {
  return function(merchantId, paymentProductId, body, paymentContext): Promise<SdkResponse<PaymentProductSessionResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/products/${paymentProductId}/sessions`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentProductSessionResponse, ErrorResponse>>;
  };
}
