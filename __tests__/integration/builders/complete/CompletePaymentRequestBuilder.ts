import { CompletePaymentRequest, Order } from "../../../../src/generated/model/domain/index.js";

export class CompletePaymentRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private cardNumber?: string;
  private cardholderName?: string;
  private expiryDate?: string;
  private orderOverride?: Order | null;
  private useOrderOverride = false;

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

  withCardholderName(cardholderName: string): this {
    this.cardholderName = cardholderName;
    return this;
  }

  withExpiryDate(expiryDate: string): this {
    this.expiryDate = expiryDate;
    return this;
  }

  withOrder(order: Order | null): this {
    this.orderOverride = order;
    this.useOrderOverride = true;

    return this;
  }

  build(): CompletePaymentRequest {
    const request: CompletePaymentRequest = {
      order: this.useOrderOverride
        ? this.orderOverride
        : {
            amountOfMoney: {
              amount: this.amount,
              currencyCode: this.currencyCode
            }
          }
    };

    if (this.cardNumber !== undefined || this.cardholderName !== undefined || this.expiryDate !== undefined) {
      request.cardPaymentMethodSpecificInput = {
        card: {
          cardNumber: this.cardNumber,
          cardholderName: this.cardholderName,
          expiryDate: this.expiryDate
        }
      };
    }

    return request;
  }
}
