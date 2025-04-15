/*
 * This file was automatically generated.
 */
import { getPayout } from "./getPayout";
import { createPayout } from "./createPayout";
import { SdkContext } from "../../model";
import { PayoutsClient } from "../model/payouts";

export function newPayoutsClient(sdkContext: SdkContext): PayoutsClient {
  return {
    getPayout: getPayout(sdkContext),
    createPayout: createPayout(sdkContext)
  };
}
