/*
 * This file was automatically generated.
 */
import { createCertificate } from "./createCertificate.js";
import { getCardDataByTokens } from "./getCardDataByTokens.js";
import { getCardDataByPayments } from "./getCardDataByPayments.js";
import { SdkContext } from "../../model/index.js";
import { TokenizationClient } from "../model/tokenization/index.js";

export function newTokenizationClient(sdkContext: SdkContext): TokenizationClient {
  return {
    createCertificate: createCertificate(sdkContext),
    getCardDataByTokens: getCardDataByTokens(sdkContext),
    getCardDataByPayments: getCardDataByPayments(sdkContext)
  };
}
