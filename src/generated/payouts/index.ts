/*
 * This file was automatically generated.
 */
import { createPayout } from "./createPayout.js";
import { getPayout } from "./getPayout.js";
import { SdkContext } from "../../model/index.js";
import { PayoutsClient } from "../model/payouts/index.js";

export function newPayoutsClient(sdkContext: SdkContext): PayoutsClient {
  return {
    createPayout: createPayout(sdkContext),
    getPayout: getPayout(sdkContext)
  };
}
