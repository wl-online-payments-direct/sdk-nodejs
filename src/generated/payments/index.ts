/*
 * This file was automatically generated.
 */
import { createPayment } from "./createPayment.js";
import { getPayment } from "./getPayment.js";
import { getPaymentDetails } from "./getPaymentDetails.js";
import { cancelPayment } from "./cancelPayment.js";
import { capturePayment } from "./capturePayment.js";
import { refundPayment } from "./refundPayment.js";
import { SdkContext } from "../../model/index.js";
import { PaymentsClient } from "../model/payments/index.js";

export function newPaymentsClient(sdkContext: SdkContext): PaymentsClient {
  return {
    createPayment: createPayment(sdkContext),
    getPayment: getPayment(sdkContext),
    getPaymentDetails: getPaymentDetails(sdkContext),
    cancelPayment: cancelPayment(sdkContext),
    capturePayment: capturePayment(sdkContext),
    refundPayment: refundPayment(sdkContext)
  };
}
