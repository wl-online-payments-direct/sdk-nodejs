/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, GetPaymentProductGroupsResponse, PaymentProductGroup } from "../domain/index.js";

export interface ProductGroupsClient {
  /**
   * Resource /v2/{merchantId}/productgroups - Get product groups
   */
  getProductGroups(merchantId: string, params: GetProductGroupsParams): Promise<SdkResponse<GetPaymentProductGroupsResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/productgroups/{paymentProductGroupId} - Get product group
   */
  getProductGroup(merchantId: string, paymentProductGroupId: string, params: GetProductGroupParams): Promise<SdkResponse<PaymentProductGroup, ErrorResponse>>;
}

export interface GetProductGroupsParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
  /*
   * @deprecated This field has no effect.
   */
  locale?: string;
  amount?: number;
  isRecurring?: boolean;
  hide?: string[];
}

export interface GetProductGroupParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
  /*
   * @deprecated This field has no effect.
   */
  locale?: string;
  amount?: number;
  isRecurring?: boolean;
  hide?: string[];
}
