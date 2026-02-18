/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, ImportCofSeriesRequest, ImportCofSeriesResponse } from "../domain/index.js";

export interface CofSeriesClient {
  /**
   * Resource /v2/{merchantId}/tokens/importCofSeries - Imports the COF Series token.
   */
  importCofSeries(merchantId: string, body: ImportCofSeriesRequest, paymentContext?: PaymentContext | null): Promise<SdkResponse<ImportCofSeriesResponse, ErrorResponse>>;
}
