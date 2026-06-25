import { SubsequentPaymentRequest } from "../../../../src/generated/model/domain/index.js";

export class SubsequentPaymentRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private subsequentType = "Recurring";
  private authorizationMode = "FINAL_AUTHORIZATION";

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withSubsequentType(subsequentType: string): this {
    this.subsequentType = subsequentType;
    return this;
  }

  withAuthorizationMode(authorizationMode: string): this {
    this.authorizationMode = authorizationMode;
    return this;
  }

  build(): SubsequentPaymentRequest {
    return {
      order: {
        amountOfMoney: {
          amount: this.amount,
          currencyCode: this.currencyCode
        }
      },
      subsequentcardPaymentMethodSpecificInput: {
        subsequentType: this.subsequentType,
        authorizationMode: this.authorizationMode
      }
    };
  }
}
