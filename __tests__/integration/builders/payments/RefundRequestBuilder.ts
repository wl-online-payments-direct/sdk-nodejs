import { RefundRequest } from "../../../../src/generated/model/domain/index.js";

export class RefundRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
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

  build(): RefundRequest {
    const request: RefundRequest = {
      amountOfMoney: {
        amount: this.amount,
        currencyCode: this.currencyCode
      }
    };

    if (this.isFinal !== undefined) {
      request.isFinal = this.isFinal;
    }

    return request;
  }
}
