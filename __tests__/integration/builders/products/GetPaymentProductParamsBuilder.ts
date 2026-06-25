import { GetPaymentProductParams } from "../../../../src/generated/model/products/index.js";

export class GetPaymentProductParamsBuilder {
  private countryCode?: string;
  private currencyCode?: string;
  private locale?: string;
  private amount?: number;
  private isRecurring?: boolean;
  private operationType?: string;
  private hideList: string[] = [];

  withCountryCode(countryCode: string): this {
    this.countryCode = countryCode;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withLocale(locale: string): this {
    this.locale = locale;
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

  withOperationType(operationType: string): this {
    this.operationType = operationType;
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

  build(): GetPaymentProductParams {
    return {
      ...(this.countryCode !== undefined && { countryCode: this.countryCode }),
      ...(this.currencyCode !== undefined && { currencyCode: this.currencyCode }),
      ...(this.locale !== undefined && { locale: this.locale }),
      ...(this.amount !== undefined && { amount: this.amount }),
      ...(this.isRecurring !== undefined && { isRecurring: this.isRecurring }),
      ...(this.operationType !== undefined && { operationType: this.operationType }),
      ...(this.hideList.length > 0 && { hide: [...this.hideList] })
    };
  }
}
