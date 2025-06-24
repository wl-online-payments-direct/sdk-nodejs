/*
 * This file was automatically generated.
 */
import { getToken } from "./getToken.js";
import { deleteToken } from "./deleteToken.js";
import { createToken } from "./createToken.js";
import { SdkContext } from "../../model/index.js";
import { TokensClient } from "../model/tokens/index.js";

export function newTokensClient(sdkContext: SdkContext): TokensClient {
  return {
    getToken: getToken(sdkContext),
    deleteToken: deleteToken(sdkContext),
    createToken: createToken(sdkContext)
  };
}
