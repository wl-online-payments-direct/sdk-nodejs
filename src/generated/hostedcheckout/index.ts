/*
 * This file was automatically generated.
 */
import { createHostedCheckout } from "./createHostedCheckout";
import { getHostedCheckout } from "./getHostedCheckout";
import { SdkContext } from "../../model";
import { HostedCheckoutClient } from "../model/hostedcheckout";

export function newHostedCheckoutClient(sdkContext: SdkContext): HostedCheckoutClient {
  return {
    createHostedCheckout: createHostedCheckout(sdkContext),
    getHostedCheckout: getHostedCheckout(sdkContext)
  };
}
