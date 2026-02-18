/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, ImportCofSeriesRequest, ImportCofSeriesResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/ImportCofSeriesRequest.js";

export function importCofSeries(
  sdkContext: SdkContext
): (merchantId: string, body: ImportCofSeriesRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<ImportCofSeriesResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<ImportCofSeriesResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/tokens/importCofSeries`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<ImportCofSeriesResponse, ErrorResponse>>;
  };
}
