/*
 * This file was automatically generated.
 */
import { createMandate } from "./createMandate";
import { getMandate } from "./getMandate";
import { blockMandate } from "./blockMandate";
import { unblockMandate } from "./unblockMandate";
import { revokeMandate } from "./revokeMandate";
import { SdkContext } from "../../model";
import { MandatesClient } from "../model/mandates";

export function newMandatesClient(sdkContext: SdkContext): MandatesClient {
  return {
    createMandate: createMandate(sdkContext),
    getMandate: getMandate(sdkContext),
    blockMandate: blockMandate(sdkContext),
    unblockMandate: unblockMandate(sdkContext),
    revokeMandate: revokeMandate(sdkContext)
  };
}
