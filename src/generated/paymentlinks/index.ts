/*
 * This file was automatically generated.
 */
import { share } from "./share.js";
import { createPaymentLink } from "./createPaymentLink.js";
import { getPaymentLinksByMerchantGroupId } from "./getPaymentLinksByMerchantGroupId.js";
import { getPaymentLinkById } from "./getPaymentLinkById.js";
import { cancelPaymentLinkById } from "./cancelPaymentLinkById.js";
import { SdkContext } from "../../model/index.js";
import { PaymentLinksClient } from "../model/paymentlinks/index.js";

export function newPaymentLinksClient(sdkContext: SdkContext): PaymentLinksClient {
  return {
    share: share(sdkContext),
    createPaymentLink: createPaymentLink(sdkContext),
    getPaymentLinksByMerchantGroupId: getPaymentLinksByMerchantGroupId(sdkContext),
    getPaymentLinkById: getPaymentLinkById(sdkContext),
    cancelPaymentLinkById: cancelPaymentLinkById(sdkContext)
  };
}
