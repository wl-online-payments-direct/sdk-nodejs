/*
 * This file was automatically generated.
 */
import { completePayment } from "./completePayment.js";
import { SdkContext } from "../../model/index.js";
import { CompleteClient } from "../model/complete/index.js";

export function newCompleteClient(sdkContext: SdkContext): CompleteClient {
  return {
    completePayment: completePayment(sdkContext)
  };
}
