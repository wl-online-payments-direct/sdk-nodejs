/*
 * This file was automatically generated.
 */
import { createPaymentLink } from "./createPaymentLink";
import { getPaymentLinkById } from "./getPaymentLinkById";
import { cancelPaymentLinkById } from "./cancelPaymentLinkById";
import { SdkContext } from "../../model";
import { PaymentLinksClient } from "../model/paymentlinks";

export function newPaymentLinksClient(sdkContext: SdkContext): PaymentLinksClient {
  return {
    createPaymentLink: createPaymentLink(sdkContext),
    getPaymentLinkById: getPaymentLinkById(sdkContext),
    cancelPaymentLinkById: cancelPaymentLinkById(sdkContext)
  };
}
