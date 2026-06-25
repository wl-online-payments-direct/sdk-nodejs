import { GetProductDirectoryParams } from "../../../../src/generated/model/products/index.js";

export class GetProductDirectoryParamsBuilder {
  private countryCode?: string;
  private currencyCode?: string;

  withCountryCode(countryCode: string): this {
    this.countryCode = countryCode;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  build(): GetProductDirectoryParams {
    return {
      ...(this.countryCode !== undefined && { countryCode: this.countryCode }),
      ...(this.currencyCode !== undefined && { currencyCode: this.currencyCode })
    };
  }
}
