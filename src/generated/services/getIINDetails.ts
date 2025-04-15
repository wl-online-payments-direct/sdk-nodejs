/*
 * This file was automatically generated.
 */
import { validate } from "jsonschema";
import { json } from "../../utils/communicator";
import { PaymentContext, SdkContext, SdkResponse } from "../../model";
import { ErrorResponse, GetIINDetailsRequest, GetIINDetailsResponse } from "../model/domain";

import requestSchema from "../../../schemas/GetIINDetailsRequest.json";

export function getIINDetails(
  sdkContext: SdkContext
): (merchantId: string, body: GetIINDetailsRequest, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetIINDetailsResponse, ErrorResponse>> {
  return function(merchantId, body, paymentContext): Promise<SdkResponse<GetIINDetailsResponse, ErrorResponse>> {
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
        modulePath: `/v2/${merchantId}/services/getIINdetails`,
        body,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetIINDetailsResponse, ErrorResponse>>;
  };
}
