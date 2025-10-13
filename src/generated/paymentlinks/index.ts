/*
 * This file was automatically generated.
 */
import { getPaymentLinksInBulk } from "./getPaymentLinksInBulk.js";
import { createPaymentLink } from "./createPaymentLink.js";
import { getPaymentLinkById } from "./getPaymentLinkById.js";
import { cancelPaymentLinkById } from "./cancelPaymentLinkById.js";
import { SdkContext } from "../../model/index.js";
import { PaymentLinksClient } from "../model/paymentlinks/index.js";

export function newPaymentLinksClient(sdkContext: SdkContext): PaymentLinksClient {
  return {
    getPaymentLinksInBulk: getPaymentLinksInBulk(sdkContext),
    createPaymentLink: createPaymentLink(sdkContext),
    getPaymentLinkById: getPaymentLinkById(sdkContext),
    cancelPaymentLinkById: cancelPaymentLinkById(sdkContext)
  };
}
