/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model";
import {
  CalculateSurchargeRequest,
  CalculateSurchargeResponse,
  CurrencyConversionRequest,
  CurrencyConversionResponse,
  ErrorResponse,
  GetIINDetailsRequest,
  GetIINDetailsResponse,
  TestConnection
} from "../domain";

export interface ServicesClient {
  /**
   * Resource /v2/{merchantId}/services/testconnection - Test connection
   */
  testConnection(merchantId: string, paymentContext?: PaymentContext | null): Promise<SdkResponse<TestConnection, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/services/getIINdetails - Get IIN details
   */
  getIINDetails(merchantId: string, body: GetIINDetailsRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<GetIINDetailsResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/services/dccrate - Get currency conversion quote
   */
  getDccRateInquiry(merchantId: string, body: CurrencyConversionRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<CurrencyConversionResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/services/surchargecalculation - Surcharge Calculation
   */
  surchargeCalculation(
    merchantId: string,
    body: CalculateSurchargeRequest,
    paymentContext?: PaymentContext | null
  ): Promise<SdkResponse<CalculateSurchargeResponse, ErrorResponse>>;
}
