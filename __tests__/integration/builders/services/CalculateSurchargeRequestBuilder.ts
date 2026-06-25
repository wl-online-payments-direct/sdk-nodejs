import { CalculateSurchargeRequest } from "../../../../src/generated/model/domain/index.js";

export class CalculateSurchargeRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private cardNumber?: string;

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withCardNumber(cardNumber: string): this {
    this.cardNumber = cardNumber;
    return this;
  }

  build(): CalculateSurchargeRequest {
    return {
      amountOfMoney: {
        amount: this.amount,
        currencyCode: this.currencyCode
      },
      ...(this.cardNumber !== undefined && {
        cardSource: {
          card: {
            cardNumber: this.cardNumber
          }
        }
      })
    };
  }
}
