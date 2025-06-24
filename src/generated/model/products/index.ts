/*
 * This file was automatically generated.
 */
import { PaymentContext, SdkResponse } from "../../../model/index.js";
import { ErrorResponse, GetPaymentProductsResponse, PaymentProduct, PaymentProductNetworksResponse, ProductDirectory } from "../domain/index.js";

export interface ProductsClient {
  /**
   * Resource /v2/{merchantId}/products - Get payment products
   */
  getPaymentProducts(merchantId: string, params: GetPaymentProductsParams): Promise<SdkResponse<GetPaymentProductsResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/products/{paymentProductId} - Get payment product
   */
  getPaymentProduct(merchantId: string, paymentProductId: number, params: GetPaymentProductParams): Promise<SdkResponse<PaymentProduct, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/products/{paymentProductId}/networks - Get payment product networks
   */
  getPaymentProductNetworks(
    merchantId: string,
    paymentProductId: number,
    params: GetPaymentProductNetworksParams
  ): Promise<SdkResponse<PaymentProductNetworksResponse, ErrorResponse>>;
  /**
   * Resource /v2/{merchantId}/products/{paymentProductId}/directory - Get payment product directory
   */
  getProductDirectory(merchantId: string, paymentProductId: number, params: GetProductDirectoryParams): Promise<SdkResponse<ProductDirectory, ErrorResponse>>;
}

export interface GetPaymentProductsParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
  locale?: string;
  amount?: number;
  isRecurring?: boolean;
  hide?: string[];
}

export interface GetPaymentProductParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
  locale?: string;
  amount?: number;
  isRecurring?: boolean;
  hide?: string[];
}

export interface GetPaymentProductNetworksParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
  amount?: number;
  isRecurring?: boolean;
}

export interface GetProductDirectoryParams extends PaymentContext {
  countryCode?: string;
  currencyCode?: string;
}
