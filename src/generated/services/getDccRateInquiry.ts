/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { CurrencyConversionRequest, CurrencyConversionResponse, ErrorResponse } from "../model/domain";

import requestSchema from "../../../schemas/CurrencyConversionRequest.json";

export function getDccRateInquiry(
  sdkContext: SdkContext
): (merchantId: string, body: CurrencyConversionRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CurrencyConversionResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CurrencyConversionResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/services/dccrate`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CurrencyConversionResponse, ErrorResponse>>;
  };
}
