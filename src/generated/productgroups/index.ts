/*
 * This file was automatically generated.
 */
import { getProductGroups } from "./getProductGroups";
import { getProductGroup } from "./getProductGroup";
import { SdkContext } from "../../model";
import { ProductGroupsClient } from "../model/productgroups";

export function newProductGroupsClient(sdkContext: SdkContext): ProductGroupsClient {
  return {
    getProductGroups: getProductGroups(sdkContext),
    getProductGroup: getProductGroup(sdkContext)
  };
}
