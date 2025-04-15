/*
 * This file was automatically generated.
 */
import { createHostedTokenization } from "./createHostedTokenization";
import { getHostedTokenization } from "./getHostedTokenization";
import { SdkContext } from "../../model";
import { HostedTokenizationClient } from "../model/hostedtokenization";

export function newHostedTokenizationClient(sdkContext: SdkContext): HostedTokenizationClient {
  return {
    createHostedTokenization: createHostedTokenization(sdkContext),
    getHostedTokenization: getHostedTokenization(sdkContext)
  };
}
