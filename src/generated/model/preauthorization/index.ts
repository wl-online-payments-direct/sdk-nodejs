/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import {
  AddAuthorizationDetailsResponse,
  IncrementAuthorizationRequest,
  IncrementAuthorizationResponse,
  PaymentErrorResponse,
  UpdateAuthorizationAdditionalDataRequest
} from "../domain/index.js";

export interface PreAuthorizationClient {
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/increment-authorization - Increment authorization
   */
  incrementAuthorization(
    merchantId: string,
    paymentId: string,
    body: IncrementAuthorizationRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<IncrementAuthorizationResponse, PaymentErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/payments/{paymentId}/authorization-additional-data - Add market specific additional data to a payment prior to capture.
   */
  addAuthorizationDetails(
    merchantId: string,
    paymentId: string,
    body: UpdateAuthorizationAdditionalDataRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<AddAuthorizationDetailsResponse, PaymentErrorResponse>>;
}
