import { CapturePaymentRequest } from "../../../../src/generated/model/domain/index.js";

export class CapturePaymentRequestBuilder {
  private amount?: number;
  private isFinal?: boolean;

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withIsFinal(isFinal: boolean): this {
    this.isFinal = isFinal;
    return this;
  }

  build(): CapturePaymentRequest {
    const request: CapturePaymentRequest = {};
    if (this.amount !== undefined) {
      request.amount = this.amount;
    }

    if (this.isFinal !== undefined) {
      request.isFinal = this.isFinal;
    }

    return request;
  }
}
