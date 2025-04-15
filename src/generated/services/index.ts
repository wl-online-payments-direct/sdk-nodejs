/*
 * This file was automatically generated.
 */
import { testConnection } from "./testConnection";
import { getIINDetails } from "./getIINDetails";
import { getDccRateInquiry } from "./getDccRateInquiry";
import { surchargeCalculation } from "./surchargeCalculation";
import { SdkContext } from "../../model";
import { ServicesClient } from "../model/services";

export function newServicesClient(sdkContext: SdkContext): ServicesClient {
  return {
    testConnection: testConnection(sdkContext),
    getIINDetails: getIINDetails(sdkContext),
    getDccRateInquiry: getDccRateInquiry(sdkContext),
    surchargeCalculation: surchargeCalculation(sdkContext)
  };
}
