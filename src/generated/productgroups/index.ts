/*
 * This file was automatically generated.
 */
import { getProductGroups } from "./getProductGroups.js";
import { getProductGroup } from "./getProductGroup.js";
import { SdkContext } from "../../model/index.js";
import { ProductGroupsClient } from "../model/productgroups/index.js";

export function newProductGroupsClient(sdkContext: SdkContext): ProductGroupsClient {
  return {
    getProductGroups: getProductGroups(sdkContext),
    getProductGroup: getProductGroup(sdkContext)
  };
}
