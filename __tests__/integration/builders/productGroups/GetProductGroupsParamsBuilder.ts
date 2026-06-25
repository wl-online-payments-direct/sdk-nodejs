import { GetProductGroupsParams } from "../../../../src/generated/model/productgroups/index.js";

export class GetProductGroupsParamsBuilder {
  private countryCode?: string;
  private currencyCode?: string;
  private amount?: number;
  private isRecurring?: boolean;
  private hideList: string[] = [];

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

  addHide(value: string): this {
    this.hideList.push(value);
    return this;
  }

  withHide(hide: string[]): this {
    this.hideList = [...hide];
    return this;
  }

  build(): GetProductGroupsParams {
    return {
      ...(this.countryCode !== undefined && { countryCode: this.countryCode }),
      ...(this.currencyCode !== undefined && { currencyCode: this.currencyCode }),
      ...(this.amount !== undefined && { amount: this.amount }),
      ...(this.isRecurring !== undefined && { isRecurring: this.isRecurring }),
      ...(this.hideList.length > 0 && { hide: [...this.hideList] })
    };
  }
}
