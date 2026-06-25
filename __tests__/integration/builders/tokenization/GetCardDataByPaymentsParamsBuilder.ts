import { GetCardDataByPaymentsParams } from "../../../../src/generated/model/tokenization/index.js";

export class GetCardDataByPaymentsParamsBuilder {
  private payments: string[] | null = [];

  withPayments(payments: string[] | null): this {
    this.payments = payments;
    return this;
  }

  build(): GetCardDataByPaymentsParams {
    return {
      payments: this.payments as any
    };
  }
}
