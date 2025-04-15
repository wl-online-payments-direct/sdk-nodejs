/*
 * This file was automatically generated.
 */
import { createPayment } from "./createPayment";
import { getPayment } from "./getPayment";
import { getPaymentDetails } from "./getPaymentDetails";
import { cancelPayment } from "./cancelPayment";
import { capturePayment } from "./capturePayment";
import { refundPayment } from "./refundPayment";
import { subsequentPayment } from "./subsequentPayment";
import { SdkContext } from "../../model";
import { PaymentsClient } from "../model/payments";

export function newPaymentsClient(sdkContext: SdkContext): PaymentsClient {
  return {
    createPayment: createPayment(sdkContext),
    getPayment: getPayment(sdkContext),
    getPaymentDetails: getPaymentDetails(sdkContext),
    cancelPayment: cancelPayment(sdkContext),
    capturePayment: capturePayment(sdkContext),
    refundPayment: refundPayment(sdkContext),
    subsequentPayment: subsequentPayment(sdkContext)
  };
}
