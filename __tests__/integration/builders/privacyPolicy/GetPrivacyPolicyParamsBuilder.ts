import { GetPrivacyPolicyParams } from "../../../../src/generated/model/privacypolicy/index.js";

export class GetPrivacyPolicyParamsBuilder {
  private locale = "en_US";
  private paymentProductId?: number;

  withLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  withPaymentProductId(paymentProductId: number): this {
    this.paymentProductId = paymentProductId;
    return this;
  }

  withEnglishLocale(): this {
    return this.withLocale("en_US");
  }

  withDutchLocale(): this {
    return this.withLocale("nl_NL");
  }

  withFrenchLocale(): this {
    return this.withLocale("fr_FR");
  }

  withGermanLocale(): this {
    return this.withLocale("de_DE");
  }

  withVisaProduct(): this {
    return this.withPaymentProductId(1);
  }

  withAmericanExpressProduct(): this {
    return this.withPaymentProductId(2);
  }

  withMasterCardProduct(): this {
    return this.withPaymentProductId(3);
  }

  build(): GetPrivacyPolicyParams {
    const params: GetPrivacyPolicyParams = { locale: this.locale };

    if (this.paymentProductId !== undefined) {
      params.paymentProductId = this.paymentProductId;
    }

    return params;
  }
}
