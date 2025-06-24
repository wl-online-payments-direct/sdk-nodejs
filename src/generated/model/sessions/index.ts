/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, SessionRequest, SessionResponse } from "../domain/index.js";

export interface SessionsClient {
  /**
   * Resource /v2/{merchantId}/sessions - Create session
   */
  createSession(merchantId: string, body: SessionRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<SessionResponse, ErrorResponse>>;
}
