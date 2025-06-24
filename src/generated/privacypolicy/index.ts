/*
 * This file was automatically generated.
 */
import { getPrivacyPolicy } from "./getPrivacyPolicy.js";
import { SdkContext } from "../../model/index.js";
import { PrivacyPolicyClient } from "../model/privacypolicy/index.js";

export function newPrivacyPolicyClient(sdkContext: SdkContext): PrivacyPolicyClient {
  return {
    getPrivacyPolicy: getPrivacyPolicy(sdkContext)
  };
}
