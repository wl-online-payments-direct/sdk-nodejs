/*
 * This file was automatically generated.
 */
import { createHostedTokenization } from "./createHostedTokenization.js";
import { getHostedTokenization } from "./getHostedTokenization.js";
import { SdkContext } from "../../model/index.js";
import { HostedTokenizationClient } from "../model/hostedtokenization/index.js";

export function newHostedTokenizationClient(sdkContext: SdkContext): HostedTokenizationClient {
  return {
    createHostedTokenization: createHostedTokenization(sdkContext),
    getHostedTokenization: getHostedTokenization(sdkContext)
  };
}
