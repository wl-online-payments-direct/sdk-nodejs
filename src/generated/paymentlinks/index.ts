/*
 * This file was automatically generated.
 */
import { createPaymentLink } from "./createPaymentLink.js";
import { getPaymentLinkById } from "./getPaymentLinkById.js";
import { cancelPaymentLinkById } from "./cancelPaymentLinkById.js";
import { SdkContext } from "../../model/index.js";
import { PaymentLinksClient } from "../model/paymentlinks/index.js";

export function newPaymentLinksClient(sdkContext: SdkContext): PaymentLinksClient {
  return {
    createPaymentLink: createPaymentLink(sdkContext),
    getPaymentLinkById: getPaymentLinkById(sdkContext),
    cancelPaymentLinkById: cancelPaymentLinkById(sdkContext)
  };
}
