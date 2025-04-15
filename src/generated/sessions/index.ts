/*
 * This file was automatically generated.
 */
import { createSession } from "./createSession";
import { SdkContext } from "../../model";
import { SessionsClient } from "../model/sessions";

export function newSessionsClient(sdkContext: SdkContext): SessionsClient {
  return {
    createSession: createSession(sdkContext)
  };
}
