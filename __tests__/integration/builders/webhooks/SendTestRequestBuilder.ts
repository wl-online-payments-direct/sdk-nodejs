import { SendTestRequest } from "../../../../src/generated/model/domain/index.js";

export class SendTestRequestBuilder {
  private url: string | null = null;

  withUrl(url: string | null): this {
    this.url = url;
    return this;
  }

  build(): SendTestRequest {
    return this.url !== null ? { url: this.url } : {};
  }
}
