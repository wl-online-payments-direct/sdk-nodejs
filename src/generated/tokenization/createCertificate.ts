/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { CreateCertificateResponse, CsrRequest, ErrorResponse } from "../model/domain/index.js";

import requestSchema from "../../../schemas/CsrRequest.js";

export function createCertificate(
  sdkContext: SdkContext
): (merchantId: string, body: CsrRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<CreateCertificateResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<CreateCertificateResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/detokenize/csr`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<CreateCertificateResponse, ErrorResponse>>;
  };
}
