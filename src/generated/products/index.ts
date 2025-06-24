/*
 * This file was automatically generated.
 */
import { getPaymentProducts } from "./getPaymentProducts.js";
import { getPaymentProduct } from "./getPaymentProduct.js";
import { getPaymentProductNetworks } from "./getPaymentProductNetworks.js";
import { getProductDirectory } from "./getProductDirectory.js";
import { SdkContext } from "../../model/index.js";
import { ProductsClient } from "../model/products/index.js";

export function newProductsClient(sdkContext: SdkContext): ProductsClient {
  return {
    getPaymentProducts: getPaymentProducts(sdkContext),
    getPaymentProduct: getPaymentProduct(sdkContext),
    getPaymentProductNetworks: getPaymentProductNetworks(sdkContext),
    getProductDirectory: getProductDirectory(sdkContext)
  };
}
