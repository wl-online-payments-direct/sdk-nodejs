import { ValidateCredentialsRequest } from "../../../../src/generated/model/domain/index.js";

export class ValidateCredentialsRequestBuilder {
  private key: string | null = null;
  private secret: string | null = null;

  withKey(key: string): this {
    this.key = key;
    return this;
  }

  withSecret(secret: string): this {
    this.secret = secret;
    return this;
  }

  build(): ValidateCredentialsRequest {
    const request: ValidateCredentialsRequest = {};

    if (this.key !== null) {
      request.key = this.key;
    }

    if (this.secret !== null) {
      request.secret = this.secret;
    }

    return request;
  }
}
