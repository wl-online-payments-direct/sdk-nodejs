/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreateHostedFieldsSessionRequest, CreateHostedFieldsSessionResponse, ErrorResponse, GetHostedFieldsSessionResponse, ProblemDetailsResponse } from "../domain/index.js";

export interface HostedFieldsClient {
  /**
   * Resource /v2/{merchantId}/hostedfields/sessions - Create hosted fields session
   */
  createHostedFieldsSession(
    merchantId: string,
    body: CreateHostedFieldsSessionRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CreateHostedFieldsSessionResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/hostedfields/sessions/{sessionId} - Get hosted fields session
   */
  getHostedFieldsSession(
    merchantId: string,
    sessionId: string,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<GetHostedFieldsSessionResponse, ProblemDetailsResponse>>;
}
