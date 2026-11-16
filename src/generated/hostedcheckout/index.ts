/*
 * This file was automatically generated.
 */
import { createHostedCheckout } from "./createHostedCheckout.js";
import { getHostedCheckout } from "./getHostedCheckout.js";
import { SdkContext } from "../../model/index.js";
import { HostedCheckoutClient } from "../model/hostedcheckout/index.js";

export function newHostedCheckoutClient(sdkContext: SdkContext): HostedCheckoutClient {
  return {
    createHostedCheckout: createHostedCheckout(sdkContext),
    getHostedCheckout: getHostedCheckout(sdkContext)
  };
}
