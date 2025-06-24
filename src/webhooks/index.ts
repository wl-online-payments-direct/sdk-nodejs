/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ApiVersionMismatchError,
  InMemorySecretKeyStore,
  RequestHeaders,
  SecretKeyNotAvailableError,
  SignatureValidator,
  WebhooksContext,
  WebhooksHelper
} from "../model/webhooks/index.js";
import { newSignatureValidator } from "./validation.js";
import { WebhooksEvent } from "../model/domain/index.js";

function validateApiVersion(event: WebhooksEvent): void {
  if ("v1" !== event.apiVersion) {
    throw new ApiVersionMismatchError(`event API version ${event.apiVersion} is not compatible with SDK API version v1`, event.apiVersion!, "v1");
  }
}

async function unmarshal(body: string | Buffer, requestHeaders: RequestHeaders, validator: SignatureValidator): Promise<WebhooksEvent> {
  await validator.validate(body, requestHeaders);
  const event = JSON.parse(body.toString());
  validateApiVersion(event);
  return event;
}

function newWebhooksHelper(validator: SignatureValidator): WebhooksHelper {
  return {
    unmarshal: (body, requestHeaders): Promise<WebhooksEvent> => unmarshal(body, requestHeaders, validator),
    validate: (body, requestHeaders): Promise<void> => validator.validate(body, requestHeaders)
  };
}

export function init(context: WebhooksContext): WebhooksHelper {
  return newWebhooksHelper(newSignatureValidator(context));
}

const secretKeyStore: object = {};

export const inMemorySecretKeyStore: InMemorySecretKeyStore = {
  getSecretKey(keyId): Promise<string> {
    const secretKey = secretKeyStore[keyId];
    if (secretKey) {
      return Promise.resolve(secretKey);
    } else {
      return Promise.reject(new SecretKeyNotAvailableError(`could not find secret key for key id ${keyId}`, keyId));
    }
  },
  storeSecretKey(keyId, secretKey): void {
    if (!keyId || !keyId.trim()) {
      throw new Error("keyId is required");
    }
    if (!secretKey || !secretKey.trim()) {
      throw new Error("secretKey is required");
    }
    secretKeyStore[keyId] = secretKey;
  },
  removeSecretKey(keyId): void {
    delete secretKeyStore[keyId];
  },
  clear(): void {
    for (const prop in secretKeyStore) {
      if (Object.prototype.hasOwnProperty.call(secretKeyStore, prop)) {
        delete secretKeyStore[prop];
      }
    }
  }
};

export default {
  init,
  inMemorySecretKeyStore
};
