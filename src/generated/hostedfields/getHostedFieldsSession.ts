/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { GetHostedFieldsSessionResponse, ProblemDetailsResponse } from "../model/domain/index.js";

export function getHostedFieldsSession(
  sdkContext: SdkContext
): (merchantId: string, sessionId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<GetHostedFieldsSessionResponse, ProblemDetailsResponse>> {
  return function(merchantId, sessionId, paymentContext): Promise<SdkResponse<GetHostedFieldsSessionResponse, ProblemDetailsResponse>> {

    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/hostedfields/sessions/${sessionId}`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<GetHostedFieldsSessionResponse, ProblemDetailsResponse>>;
  };
}
