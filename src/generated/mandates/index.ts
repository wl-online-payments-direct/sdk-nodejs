/*
 * This file was automatically generated.
 */
import { createMandate } from "./createMandate.js";
import { getMandate } from "./getMandate.js";
import { blockMandate } from "./blockMandate.js";
import { unblockMandate } from "./unblockMandate.js";
import { revokeMandate } from "./revokeMandate.js";
import { SdkContext } from "../../model/index.js";
import { MandatesClient } from "../model/mandates/index.js";

export function newMandatesClient(sdkContext: SdkContext): MandatesClient {
  return {
    createMandate: createMandate(sdkContext),
    getMandate: getMandate(sdkContext),
    blockMandate: blockMandate(sdkContext),
    unblockMandate: unblockMandate(sdkContext),
    revokeMandate: revokeMandate(sdkContext)
  };
}
