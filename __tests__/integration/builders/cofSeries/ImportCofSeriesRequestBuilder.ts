import { CardDataWithoutCvv, ImportCofSeriesRequest } from "../../../../src/generated/model/domain/index.js";

export class ImportCofSeriesRequestBuilder {
  private cardNumber = "4567350000427977";
  private cardholderName = "John Doe";
  private expiryDate = "1230";
  private currencyCode = "EUR";
  private paymentProductId = 1;
  private schemeReferenceData: string | null = "test_scheme_reference";
  private tokenId?: string;
  private transactionLinkIdentifier?: string;

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

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withPaymentProductId(paymentProductId: number): this {
    this.paymentProductId = paymentProductId;
    return this;
  }

  withSchemeReferenceData(schemeReferenceData: string | null): this {
    this.schemeReferenceData = schemeReferenceData;
    return this;
  }

  withTokenId(tokenId: string): this {
    this.tokenId = tokenId;
    return this;
  }

  withTransactionLinkIdentifier(transactionLinkIdentifier: string): this {
    this.transactionLinkIdentifier = transactionLinkIdentifier;
    return this;
  }

  build(): ImportCofSeriesRequest {
    const request: ImportCofSeriesRequest = {
      currencyCode: this.currencyCode,
      paymentProductId: this.paymentProductId,
      schemeReferenceData: this.schemeReferenceData
    };

    if (this.tokenId !== undefined) {
      request.tokenId = this.tokenId;
    } else {
      request.card = this.buildCard();
    }

    if (this.transactionLinkIdentifier !== undefined) {
      request.transactionLinkIdentifier = this.transactionLinkIdentifier;
    }

    return request;
  }

  private buildCard(): CardDataWithoutCvv {
    return {
      cardNumber: this.cardNumber,
      cardholderName: this.cardholderName,
      expiryDate: this.expiryDate
    };
  }
}
