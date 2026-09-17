/*
 * This file was automatically generated.
 */
import { importCofSeries } from "./importCofSeries.js";
import { SdkContext } from "../../model/index.js";
import { CofSeriesClient } from "../model/cofseries/index.js";

export function newCofSeriesClient(sdkContext: SdkContext): CofSeriesClient {
  return {
    importCofSeries: importCofSeries(sdkContext)
  };
}
