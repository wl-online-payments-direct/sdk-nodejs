import { IncrementAuthorizationRequest } from "../../../../src/generated/model/domain/index.js";

export class IncrementAuthorizationRequestBuilder {
  private amount = 1500;
  private currencyCode = "EUR";

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  build(): IncrementAuthorizationRequest {
    return {
      amountOfMoney: {
        amount: this.amount,
        currencyCode: this.currencyCode
      }
    };
  }
}
