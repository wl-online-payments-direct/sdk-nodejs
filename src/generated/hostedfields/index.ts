/*
 * This file was automatically generated.
 */
import { createHostedFieldsSession } from "./createHostedFieldsSession.js";
import { SdkContext } from "../../model/index.js";
import { HostedFieldsClient } from "../model/hostedfields/index.js";

export function newHostedFieldsClient(sdkContext: SdkContext): HostedFieldsClient {
  return {
    createHostedFieldsSession: createHostedFieldsSession(sdkContext)
  };
}
