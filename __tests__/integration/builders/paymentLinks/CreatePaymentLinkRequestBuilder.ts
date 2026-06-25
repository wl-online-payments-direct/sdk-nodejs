import { v4 as uuidv4 } from "uuid";
import { CreatePaymentLinkRequest } from "../../../../src/generated/model/domain/index.js";

function generateMerchantReference(): string {
  return `pl-${uuidv4()}`;
}

export class CreatePaymentLinkRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private merchantReference = generateMerchantReference();
  private description = "Test payment link";
  private recipientName = "Wile E. Coyote";
  private displayQRCode?: boolean = true;
  private isReusableLink?: boolean = true;
  private expirationDate?: string;

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withDescription(description: string): this {
    this.description = description;
    return this;
  }

  withRecipientName(recipientName: string): this {
    this.recipientName = recipientName;
    return this;
  }

  withDisplayQRCode(displayQRCode: boolean): this {
    this.displayQRCode = displayQRCode;
    return this;
  }

  withIsReusableLink(isReusableLink: boolean): this {
    this.isReusableLink = isReusableLink;
    return this;
  }

  withMerchantReference(merchantReference: string): this {
    this.merchantReference = merchantReference;
    return this;
  }

  withExpirationDate(expirationDate: string): this {
    this.expirationDate = expirationDate;
    return this;
  }

  build(): CreatePaymentLinkRequest {
    const expirationDate = this.expirationDate ?? new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();

    const request: CreatePaymentLinkRequest = {
      order: {
        amountOfMoney: {
          amount: this.amount,
          currencyCode: this.currencyCode
        },
        references: {
          merchantReference: this.merchantReference
        }
      },
      paymentLinkSpecificInput: {
        description: this.description,
        expirationDate,
        recipientName: this.recipientName
      }
    };

    if (this.displayQRCode !== undefined) {
      request.displayQRCode = this.displayQRCode;
    }

    if (this.isReusableLink !== undefined) {
      request.isReusableLink = this.isReusableLink;
    }

    return request;
  }
}
