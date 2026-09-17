/*
 * This file was automatically generated.
 */
import { createToken } from "./createToken.js";
import { getToken } from "./getToken.js";
import { deleteToken } from "./deleteToken.js";
import { SdkContext } from "../../model/index.js";
import { TokensClient } from "../model/tokens/index.js";

export function newTokensClient(sdkContext: SdkContext): TokensClient {
  return {
    createToken: createToken(sdkContext),
    getToken: getToken(sdkContext),
    deleteToken: deleteToken(sdkContext)
  };
}
