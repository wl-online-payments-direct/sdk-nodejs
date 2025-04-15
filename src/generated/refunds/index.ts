/*
 * This file was automatically generated.
 */
import { getRefunds } from "./getRefunds";
import { SdkContext } from "../../model";
import { RefundsClient } from "../model/refunds";

export function newRefundsClient(sdkContext: SdkContext): RefundsClient {
  return {
    getRefunds: getRefunds(sdkContext)
  };
}
