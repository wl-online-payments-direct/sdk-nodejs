export class ApiVersionMismatchError extends Error {
  public constructor(message: string, public readonly eventApiVersion: string, public readonly sdkApiVersion: string) {
    super(message);
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ApiVersionMismatchError.prototype);
  }
  name = "ApiVersionMismatchError";
}

export interface InMemorySecretKeyStore extends SecretKeyStore {
  storeSecretKey(keyId: string, secretKey: string): void;
  removeSecretKey(keyId: string): void;
  clear(): void;
}

export type RequestHeaders = { [header: string]: string | string[] | undefined };

export class SecretKeyNotAvailableError extends Error {
  public constructor(message: string, public readonly keyId: string) {
    super(message);
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SecretKeyNotAvailableError.prototype);
  }
  name = "SecretKeyNotAvailableError";
}

export interface SecretKeyStore {
  getSecretKey(keyId: string): Promise<string>;
}

export interface SignatureValidator {
  validate(body: string | Buffer, requestHeaders: RequestHeaders): Promise<void>;
}

export interface WebhooksContext {
  getSecretKey(keyId: string): Promise<string>;
}
