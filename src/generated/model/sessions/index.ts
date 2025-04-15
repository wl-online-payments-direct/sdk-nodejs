/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import { ErrorResponse, SessionRequest, SessionResponse } from "../domain";

export interface SessionsClient {
  /**
   * Resource /v2/{merchantId}/sessions - Create session
   */
  createSession(merchantId: string, body: SessionRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<SessionResponse, ErrorResponse>>;
}
