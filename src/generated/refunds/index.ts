/*
 * This file was automatically generated.
 */
import { getRefunds } from "./getRefunds.js";
import { SdkContext } from "../../model/index.js";
import { RefundsClient } from "../model/refunds/index.js";

export function newRefundsClient(sdkContext: SdkContext): RefundsClient {
  return {
    getRefunds: getRefunds(sdkContext)
  };
}
