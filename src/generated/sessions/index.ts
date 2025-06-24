/*
 * This file was automatically generated.
 */
import { createSession } from "./createSession.js";
import { SdkContext } from "../../model/index.js";
import { SessionsClient } from "../model/sessions/index.js";

export function newSessionsClient(sdkContext: SdkContext): SessionsClient {
  return {
    createSession: createSession(sdkContext)
  };
}
