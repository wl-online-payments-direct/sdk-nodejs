import { CreateHostedFieldsSessionRequest } from "../../../../src/generated/model/domain/index.js";

export class CreateHostedFieldsSessionRequestBuilder {
  private locale: string | null = "en_US";
  private tokens?: string[];

  withLocale(locale: string | null): this {
    this.locale = locale;
    return this;
  }

  withTokens(tokens: string[]): this {
    this.tokens = tokens;
    return this;
  }

  build(): CreateHostedFieldsSessionRequest {
    return {
      locale: this.locale,
      ...(this.tokens !== undefined && { tokens: this.tokens })
    };
  }
}
