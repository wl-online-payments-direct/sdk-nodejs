/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CreatePaymentLinkRequest, ErrorResponse, PaymentLinkResponse } from "../model/domain";

import requestSchema from "../../../schemas/CreatePaymentLinkRequest.json";

export function createPaymentLink(
  sdkContext: SdkContext
): (merchantId: string, body: CreatePaymentLinkRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/paymentlinks`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<PaymentLinkResponse, ErrorResponse>>;
  };
}
