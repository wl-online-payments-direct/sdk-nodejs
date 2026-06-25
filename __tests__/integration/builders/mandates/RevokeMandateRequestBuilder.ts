import { RevokeMandateRequest } from "../../../../src/generated/model/domain/index.js";

export class RevokeMandateRequestBuilder {
  private revocationReason = "userAction";

  withRevocationReason(revocationReason: string): this {
    this.revocationReason = revocationReason;
    return this;
  }

  build(): RevokeMandateRequest {
    return {
      revocationReason: this.revocationReason
    };
  }
}
