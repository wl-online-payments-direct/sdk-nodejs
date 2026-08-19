import { GetPaymentsReportParams } from "../../../../src/generated/model/merchantbatch/index.js";

export class GetPaymentsReportParamsBuilder {
  private cursor?: string;
  private limit?: number;

  withCursor(cursor: string): this {
    this.cursor = cursor;
    return this;
  }

  withLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  build(): GetPaymentsReportParams {
    return {
      ...(this.cursor !== undefined && { cursor: this.cursor }),
      ...(this.limit !== undefined && { limit: this.limit })
    };
  }
}
