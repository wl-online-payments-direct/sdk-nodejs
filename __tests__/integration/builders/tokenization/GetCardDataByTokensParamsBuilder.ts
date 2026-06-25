import { GetCardDataByTokensParams } from "../../../../src/generated/model/tokenization/index.js";

export class GetCardDataByTokensParamsBuilder {
  private tokens: string[] | null = [];

  withTokens(tokens: string[] | null): this {
    this.tokens = tokens;
    return this;
  }

  build(): GetCardDataByTokensParams {
    return {
      tokens: this.tokens as any
    };
  }
}
