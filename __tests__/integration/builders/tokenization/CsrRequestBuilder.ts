import { CsrRequest } from "../../../../src/generated/model/domain/index.js";

const VALID_CSR =
  "-----BEGIN CERTIFICATE REQUEST-----\n" +
  "MIICljCCAX4CAQAwDQYJKoZIhvcNAQEBBQAwDTELMAkGA1UEAwwCQ0EwggEiMA0G\n" +
  "CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCQfbsVzv0L8pKH2l8q6EJf0fzxnDlW\n" +
  "-----END CERTIFICATE REQUEST-----\n";

export class CsrRequestBuilder {
  private csr: string | null = VALID_CSR;

  withCsr(csr: string | null): this {
    this.csr = csr;
    return this;
  }

  build(): CsrRequest {
    return {
      csr: this.csr
    };
  }
}
