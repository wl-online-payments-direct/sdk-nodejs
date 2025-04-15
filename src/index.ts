import { Client, Configuration, ObfuscationRules, SdkApiError, SdkBinaryResponse, SdkBinarySuccessResponse, SdkResponse, SdkSuccessResponse } from "./model";
import { newSdkContext } from "./utils/context";
import { all as obfuscateAll, allButFirst as obfuscateAllButFirst, allButLast as obfuscateAllButLast, withFixedLength as obfuscateWithFixedLength } from "./utils/obfuscate";
import { newClient } from "./client";
import wh from "./webhooks";
import { Webhooks } from "./model/webhooks";

export function init(configuration: Configuration): Client {
  const sdkContext = newSdkContext(configuration);
  return newClient(sdkContext);
}

export const webhooks: Webhooks = { ...wh };

export const obfuscate: ObfuscationRules = {
  all: obfuscateAll,
  allButLast: obfuscateAllButLast,
  allButFirst: obfuscateAllButFirst,
  withFixedLength: obfuscateWithFixedLength
};

/**
 * Asserts that an {@link SdkBinaryResponse} is successful.
 * @returns The response if it is successful.
 * @throws {@link SdkApiError} if the response is not successful.
 */
export function assertSuccess<E>(response: SdkBinaryResponse<E>): SdkBinarySuccessResponse;
/**
 * Asserts that an {@link SdkResponse} is successful.
 * @returns The response if it is successful.
 * @throws {@link SdkApiError} if the response is not successful.
 */
export function assertSuccess<T, E>(response: SdkResponse<T, E>): SdkSuccessResponse<T>;
export function assertSuccess<T, E>(response: SdkResponse<T, E> | SdkBinaryResponse<E>): SdkSuccessResponse<T> | SdkBinarySuccessResponse {
  if (response.isSuccess) {
    return response;
  }
  throw new SdkApiError("the Online Payments platform returned an error response", response.status, response.body);
}
