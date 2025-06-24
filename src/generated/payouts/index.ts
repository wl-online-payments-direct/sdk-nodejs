/*
 * This file was automatically generated.
 */
import { getPayout } from "./getPayout.js";
import { createPayout } from "./createPayout.js";
import { SdkContext } from "../../model/index.js";
import { PayoutsClient } from "../model/payouts/index.js";

export function newPayoutsClient(sdkContext: SdkContext): PayoutsClient {
  return {
    getPayout: getPayout(sdkContext),
    createPayout: createPayout(sdkContext)
  };
}
