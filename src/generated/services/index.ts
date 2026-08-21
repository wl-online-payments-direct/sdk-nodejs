/*
 * This file was automatically generated.
 */
import { testConnection } from "./testConnection.js";
import { getIINDetails } from "./getIINDetails.js";
import { getDccRateInquiry } from "./getDccRateInquiry.js";
import { surchargeCalculation } from "./surchargeCalculation.js";
import { SdkContext } from "../../model/index.js";
import { ServicesClient } from "../model/services/index.js";

export function newServicesClient(sdkContext: SdkContext): ServicesClient {
  return {
    testConnection: testConnection(sdkContext),
    getIINDetails: getIINDetails(sdkContext),
    getDccRateInquiry: getDccRateInquiry(sdkContext),
    surchargeCalculation: surchargeCalculation(sdkContext)
  };
}
