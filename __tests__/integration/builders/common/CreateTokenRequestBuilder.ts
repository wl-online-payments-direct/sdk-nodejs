import { CreateTokenRequest } from "../../../../src/generated/model/domain/index.js";

export class CreateTokenRequestBuilder {
  private cardNumber = "4567350000427977";
  private cvv = "123";
  private expiryDate = "1230";
  private cardholderName = "John Doe";
  private paymentProductId = 1;
  private encryptedCustomerInput: string | undefined;
  private cobrandSelectionIndicator: string | undefined;

  withCardNumber(cardNumber: string): this {
    this.cardNumber = cardNumber;
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

  withCardholderName(cardholderName: string): this {
    this.cardholderName = cardholderName;
    return this;
  }

  withPaymentProductId(paymentProductId: number): this {
    this.paymentProductId = paymentProductId;
    return this;
  }

  withEncryptedCustomerInput(encryptedCustomerInput: string): this {
    this.encryptedCustomerInput = encryptedCustomerInput;
    return this;
  }

  withCobrandSelectionIndicator(cobrandSelectionIndicator: string): this {
    this.cobrandSelectionIndicator = cobrandSelectionIndicator;
    return this;
  }

  build(): CreateTokenRequest {
    const request: CreateTokenRequest = {
      paymentProductId: this.paymentProductId
    };

    if (this.encryptedCustomerInput !== undefined) {
      request.encryptedCustomerInput = this.encryptedCustomerInput;
    } else {
      request.card = {
        data: {
          card: {
            cardNumber: this.cardNumber,
            cardholderName: this.cardholderName,
            cvv: this.cvv,
            expiryDate: this.expiryDate
          },
          ...(this.cobrandSelectionIndicator !== undefined && {
            cobrandSelectionIndicator: this.cobrandSelectionIndicator
          })
        }
      };
    }

    return request;
  }
}
