import { CreatePayoutRequest } from "../../../../src/generated/model/domain/index.js";

export class CreatePayoutRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private cardNumber = "4012000033330026";
  private cardholderName = "Wile E. Coyote";
  private cvv = "123";
  private expiryDate = "1230";
  private paymentProductId = 1;
  private payoutReason = "Refund";

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

  withCvv(cvv: string): this {
    this.cvv = cvv;
    return this;
  }

  withExpiryDate(expiryDate: string): this {
    this.expiryDate = expiryDate;
    return this;
  }

  withPaymentProductId(paymentProductId: number): this {
    this.paymentProductId = paymentProductId;
    return this;
  }

  withPayoutReason(payoutReason: string): this {
    this.payoutReason = payoutReason;
    return this;
  }

  build(): CreatePayoutRequest {
    return {
      amountOfMoney: {
        amount: this.amount,
        currencyCode: this.currencyCode
      },
      cardPayoutMethodSpecificInput: {
        card: {
          cardNumber: this.cardNumber,
          cardholderName: this.cardholderName,
          cvv: this.cvv,
          expiryDate: this.expiryDate
        },
        paymentProductId: this.paymentProductId,
        payoutReason: this.payoutReason
      }
    };
  }
}
