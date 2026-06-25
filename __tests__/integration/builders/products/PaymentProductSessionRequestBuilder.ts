import { PaymentProductSession302SpecificInput, PaymentProductSessionRequest } from "../../../../src/generated/model/domain/index.js";

export class PaymentProductSessionRequestBuilder {
  private displayName = "Test Merchant";
  private domainName = "example.com";

  withDisplayName(displayName: string): this {
    this.displayName = displayName;
    return this;
  }

  withDomainName(domainName: string): this {
    this.domainName = domainName;
    return this;
  }

  build(): PaymentProductSessionRequest {
    const input: PaymentProductSession302SpecificInput = {
      displayName: this.displayName,
      domainName: this.domainName
    };

    return {
      paymentProductSession302SpecificInput: input
    };
  }
}
