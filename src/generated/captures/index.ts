/*
 * This file was automatically generated.
 */
import { getCaptures } from "./getCaptures.js";
import { SdkContext } from "../../model/index.js";
import { CapturesClient } from "../model/captures/index.js";

export function newCapturesClient(sdkContext: SdkContext): CapturesClient {
  return {
    getCaptures: getCaptures(sdkContext)
  };
}
