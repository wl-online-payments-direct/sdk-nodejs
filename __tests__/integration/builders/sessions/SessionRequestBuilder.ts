import { SessionRequest } from "../../../../src/generated/model/domain/index.js";

export class SessionRequestBuilder {
  private tokens: string[] = [];

  withToken(token: string): this {
    this.tokens.push(token);
    return this;
  }

  withTokens(tokens: string[]): this {
    this.tokens = [...tokens];
    return this;
  }

  build(): SessionRequest {
    return this.tokens.length > 0 ? { tokens: this.tokens } : {};
  }
}
