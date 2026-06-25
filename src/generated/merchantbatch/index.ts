/*
 * This file was automatically generated.
 */
import { submitBatch } from "./submitBatch.js";
import { processBatch } from "./processBatch.js";
import { getBatchStatus } from "./getBatchStatus.js";
import { SdkContext } from "../../model/index.js";
import { MerchantBatchClient } from "../model/merchantbatch/index.js";

export function newMerchantBatchClient(sdkContext: SdkContext): MerchantBatchClient {
  return {
    submitBatch: submitBatch(sdkContext),
    processBatch: processBatch(sdkContext),
    getBatchStatus: getBatchStatus(sdkContext)
  };
}
