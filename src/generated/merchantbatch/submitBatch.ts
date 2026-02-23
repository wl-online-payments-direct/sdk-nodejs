/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, SubmitBatchRequestBody, SubmitBatchResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/submitBatchRequestBody.js";

export function submitBatch(
  sdkContext: SdkContext
): (merchantId: string, body: SubmitBatchRequestBody, paymentContext?: PaymentContext | null) => Promise<SdkResponse<SubmitBatchResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<SubmitBatchResponse, ErrorResponse>> {
    // validate body
    const isValidRequest = validate(body, requestSchema);
    if (!isValidRequest.valid) {
      const logger = sdkContext.getLogger();
      if (sdkContext.isLoggingEnabled()) {
        logger("error", isValidRequest.errors);
      }
      throw new Error(isValidRequest.errors.toString());
    }
    const context: PaymentContext = { gzip: true, ...(paymentContext ?? {}) };

    return json(
      {
        method: "POST",
        modulePath: `/v2/${merchantId}/merchant-batches`,
        body,
        paymentContext: context
      },
      sdkContext
    ) as Promise<SdkResponse<SubmitBatchResponse, ErrorResponse>>;
  };
}
