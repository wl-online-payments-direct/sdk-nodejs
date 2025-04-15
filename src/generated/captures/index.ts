/*
 * This file was automatically generated.
 */
import { getCaptures } from "./getCaptures";
import { SdkContext } from "../../model";
import { CapturesClient } from "../model/captures";

export function newCapturesClient(sdkContext: SdkContext): CapturesClient {
  return {
    getCaptures: getCaptures(sdkContext)
  };
}
