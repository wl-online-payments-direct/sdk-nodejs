import { GetIINDetailsRequest } from "../../../../src/generated/model/domain/index.js";

export class GetIINDetailsRequestBuilder {
  private bin = "401200";

  withBin(bin: string): this {
    this.bin = bin;
    return this;
  }

  build(): GetIINDetailsRequest {
    return {
      bin: this.bin
    };
  }
}
