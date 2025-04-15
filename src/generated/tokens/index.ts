/*
 * This file was automatically generated.
 */
import { getToken } from "./getToken";
import { deleteToken } from "./deleteToken";
import { createToken } from "./createToken";
import { SdkContext } from "../../model";
import { TokensClient } from "../model/tokens";

export function newTokensClient(sdkContext: SdkContext): TokensClient {
  return {
    getToken: getToken(sdkContext),
    deleteToken: deleteToken(sdkContext),
    createToken: createToken(sdkContext)
  };
}
