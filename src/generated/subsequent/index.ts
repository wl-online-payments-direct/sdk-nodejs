/*
 * This file was automatically generated.
 */
import { subsequentPayment } from "./subsequentPayment.js";
import { SdkContext } from "../../model/index.js";
import { SubsequentClient } from "../model/subsequent/index.js";

export function newSubsequentClient(sdkContext: SdkContext): SubsequentClient {
  return {
    subsequentPayment: subsequentPayment(sdkContext)
  };
}
