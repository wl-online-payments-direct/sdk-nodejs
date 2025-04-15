/*
 * This file was automatically generated.
 */
import { getPaymentProducts } from "./getPaymentProducts";
import { getPaymentProduct } from "./getPaymentProduct";
import { getPaymentProductNetworks } from "./getPaymentProductNetworks";
import { getProductDirectory } from "./getProductDirectory";
import { SdkContext } from "../../model";
import { ProductsClient } from "../model/products";

export function newProductsClient(sdkContext: SdkContext): ProductsClient {
  return {
    getPaymentProducts: getPaymentProducts(sdkContext),
    getPaymentProduct: getPaymentProduct(sdkContext),
    getPaymentProductNetworks: getPaymentProductNetworks(sdkContext),
    getProductDirectory: getProductDirectory(sdkContext)
  };
}
