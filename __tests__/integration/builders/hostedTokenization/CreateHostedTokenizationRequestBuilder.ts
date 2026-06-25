import { CreateHostedTokenizationRequest } from "../../../../src/generated/model/domain/index.js";

export class CreateHostedTokenizationRequestBuilder {
  private askConsumerConsent = true;
  private locale = "en_US";
  private tokenList: string[] = [];

  withAskConsumerConsent(askConsumerConsent: boolean): this {
    this.askConsumerConsent = askConsumerConsent;
    return this;
  }

  withLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  withToken(token: string): this {
    this.tokenList.push(token);
    return this;
  }

  withTokens(...tokens: string[]): this {
    this.tokenList = [...tokens];
    return this;
  }

  build(): CreateHostedTokenizationRequest {
    const request: CreateHostedTokenizationRequest = {
      askConsumerConsent: this.askConsumerConsent
    };

    request.locale = this.locale;

    if (this.tokenList.length > 0) {
      request.tokens = this.tokenList.join(",");
    }

    return request;
  }
}
