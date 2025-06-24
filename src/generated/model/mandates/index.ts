/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { CreateMandateRequest, CreateMandateResponse, ErrorResponse, GetMandateResponse } from "../domain/index.js";

export interface MandatesClient {
  /**
   * Resource /v2/{merchantId}/mandates - Create mandate
   */
  createMandate(merchantId: string, body: CreateMandateRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CreateMandateResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/mandates/{uniqueMandateReference} - Get mandate
   */
  getMandate(merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/mandates/{uniqueMandateReference}/block - Block mandate
   */
  blockMandate(merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/mandates/{uniqueMandateReference}/unblock - Unblock mandate
   */
  unblockMandate(merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/mandates/{uniqueMandateReference}/revoke - Revoke mandate
   */
  revokeMandate(merchantId: string, uniqueMandateReference: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetMandateResponse, ErrorResponse>>;
}
