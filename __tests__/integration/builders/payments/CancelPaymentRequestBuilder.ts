import { CancelPaymentRequest } from "../../../../src/generated/model/domain/index.js";

export class CancelPaymentRequestBuilder {
  private amount?: number;
  private currencyCode?: string;
  private isFinal?: boolean;

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withIsFinal(isFinal: boolean): this {
    this.isFinal = isFinal;
    return this;
  }

  build(): CancelPaymentRequest {
    const request: CancelPaymentRequest = {};
    if (this.amount !== undefined && this.currencyCode !== undefined) {
      request.amountOfMoney = { amount: this.amount, currencyCode: this.currencyCode };
    }

    if (this.isFinal !== undefined) {
      request.isFinal = this.isFinal;
    }

    return request;
  }
}
