import crypto from "crypto";
import { Authenticator, Header, V1HmacConfiguration } from "../model/index.js";
import _ from "lodash";

export class V1HmacAuthenticator implements Authenticator {
  private readonly apiKeyId: string;
  private readonly secretApiKey: string;

  constructor(configuration: V1HmacConfiguration) {
    this.apiKeyId = configuration.apiKeyId;
    this.secretApiKey = configuration.secretApiKey;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAuthorization(_method: string, _contentType: string, _date: string, _headers: Header[], _path: string): Promise<string> {
    return "GCS v1HMAC:" + this.apiKeyId + ":" + this.getSignature(_method, _contentType, _date, _headers, _path);
  }

  getSignature(method: string, contentType: string, date: string, gcsHeaders: Header[], path: string): string {
    const headers = this.getSortedHeadersForContext(gcsHeaders);

    let contentTypeSignature = "";
    if (method === "POST" || method === "PUT") {
      contentTypeSignature = contentType;
    }

    return crypto
      .createHmac("SHA256", this.secretApiKey)
      .update(method + "\n" + contentTypeSignature + "\n" + date + "\n" + headers + path + "\n")
      .digest("base64");
  }

  getSortedHeadersForContext(gcsHeaders: Header[]): string {
    let headers = "";
    if (gcsHeaders) {
      let sortedXGCSHeaders: Header[] = [];
      _.forEach(gcsHeaders, header => {
        if (header.key.toUpperCase().indexOf("X-GCS") === 0) {
          // add this header
          sortedXGCSHeaders.push(header);
        }
      });
      sortedXGCSHeaders = sortedXGCSHeaders.sort((a, b) => a.key.toUpperCase().localeCompare(b.key.toUpperCase()));
      _.forEach(sortedXGCSHeaders, header => {
        headers += header.key.toLowerCase() + ":" + this.toCanonicalizeHeaderValue(header.value) + "\n";
      });
    }
    return headers;
  }

  toCanonicalizeHeaderValue(originalValue: string): string {
    const headerValuePattern: RegExp = /\r?\n[^\S\r\n]*/g;
    return originalValue.replace(headerValuePattern, " ").trim();
  }
}
