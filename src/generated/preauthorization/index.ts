/*
 * This file was automatically generated.
 */
import { incrementAuthorization } from "./incrementAuthorization.js";
import { addAuthorizationDetails } from "./addAuthorizationDetails.js";
import { SdkContext } from "../../model/index.js";
import { PreAuthorizationClient } from "../model/preauthorization/index.js";

export function newPreAuthorizationClient(sdkContext: SdkContext): PreAuthorizationClient {
  return {
    incrementAuthorization: incrementAuthorization(sdkContext),
    addAuthorizationDetails: addAuthorizationDetails(sdkContext),
  };
}
