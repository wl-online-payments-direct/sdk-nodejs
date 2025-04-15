/*
 * This file was automatically generated.
 */
import { completePayment } from "./completePayment";
import { SdkContext } from "../../model";
import { CompleteClient } from "../model/complete";

export function newCompleteClient(sdkContext: SdkContext): CompleteClient {
  return {
    completePayment: completePayment(sdkContext)
  };
}
