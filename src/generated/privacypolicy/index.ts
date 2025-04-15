/*
 * This file was automatically generated.
 */
import { getPrivacyPolicy } from "./getPrivacyPolicy";
import { SdkContext } from "../../model";
import { PrivacyPolicyClient } from "../model/privacypolicy";

export function newPrivacyPolicyClient(sdkContext: SdkContext): PrivacyPolicyClient {
  return {
    getPrivacyPolicy: getPrivacyPolicy(sdkContext)
  };
}
