import { GetPaymentProductNetworksParams } from "../../../../src/generated/model/products/index.js";

export class GetPaymentProductNetworksParamsBuilder {
  private countryCode?: string;
  private currencyCode?: string;
  private amount?: number;
  private isRecurring?: boolean;

  withCountryCode(countryCode: string): this {
    this.countryCode = countryCode;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withIsRecurring(isRecurring: boolean): this {
    this.isRecurring = isRecurring;
    return this;
  }

  build(): GetPaymentProductNetworksParams {
    return {
      ...(this.countryCode !== undefined && { countryCode: this.countryCode }),
      ...(this.currencyCode !== undefined && { currencyCode: this.currencyCode }),
      ...(this.amount !== undefined && { amount: this.amount }),
      ...(this.isRecurring !== undefined && { isRecurring: this.isRecurring })
    };
  }
}
