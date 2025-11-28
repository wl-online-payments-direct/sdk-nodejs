import { V1HmacAuthenticator } from "../../../src/utils/authentication";
import { Header, V1HmacConfiguration } from "../../../src/model";

/**
 * @group unit
 */
describe("V1Hmac authentication", () => {
  describe("canonicalize headers", () => {
    test("test 1", async () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);

      expect(authenticator.toCanonicalizeHeaderValue("aap\nnoot  ")).toBe("aap noot");
      expect(authenticator.toCanonicalizeHeaderValue(" aap\r\n  noot")).toBe("aap noot");
    });

    test("test 2", async () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);

      expect(authenticator.toCanonicalizeHeaderValue(" some value  \r\n \n with  some \r\n  spaces ")).toBe("some value    with  some  spaces");
    });
  });

  describe("signature headers", () => {
    test("test 1", () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);

      const headers: Header[] = [
        {
          key: "X-GCS-ServerMetaInfo",
          value: "test value"
        },
        {
          key: "Content-Type",
          value: "test value"
        },
        {
          key: "X-GCS-ClientMetaInfo",
          value: "test value"
        },
        {
          key: "Date",
          value: "test value"
        }
      ];

      expect(authenticator.getSortedHeadersForContext(headers)).toBe("x-gcs-clientmetainfo:test value\nx-gcs-servermetainfo:test value\n");
    });
  });

  describe("create signature", () => {
    test("test delete", () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);
      const headers: Header[] = [
        { key: "x-gcs-clientmetainfo", value: "processed header value" },
        { key: "x-gcs-customerheader", value: "processed header value" },
        { key: "x-gcs-servermetainfo", value: "processed header value" }
      ];
      const signature = authenticator.getSignature("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/9991/tokens/123456789");

      expect(signature).toBe("ZwEzZQwZxSOSSlUcXqcLWllnw2REyh8abdJBsVWsQ1k=");
    });
    test("test get", () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "EC36A74A98D21",
        secretApiKey: "6Kj5HT0MQKC6D8eb7W3lTg71kVKVDSt1",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);
      const headers: Header[] = [];
      const signature = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/9991/tokens/123456789");

      expect(signature).toBe("Y3E5YaU3oQCt4osEotLGb9W0cMclIzlCpvbaD1KhWxE=");
    });
  });

  describe("create authorization header value", () => {
    test("minimal", async () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "5e45c937b9db33ae",
        secretApiKey: "I42Zf4pVnRdroHfuHnRiJjJ2B6+22h0yQt/R3nZR8Xg=",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);
      const headers: Header[] = [
        { key: "User-Agent", value: "Apache-HttpClient/4.3.4 (java 1.5)" },
        { key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }
      ];
      const authorization = await authenticator.getAuthorization("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123456789");

      expect(authorization).toBe("GCS v1HMAC:5e45c937b9db33ae:UpOoo/pmmj7tW03IbEcw2WtJURFCKL2/J6hqMc+1h1I=");
    });

    test("full", async () => {
      const configuration: V1HmacConfiguration = {
        apiKeyId: "5e45c937b9db33ae",
        secretApiKey: "I42Zf4pVnRdroHfuHnRiJjJ2B6+22h0yQt/R3nZR8Xg=",
        host: "dummy",
        integrator: "OnlinePayments"
      };
      const authenticator = new V1HmacAuthenticator(configuration);
      const headers: Header[] = [
        { key: "User-Agent", value: "Apache-HttpClient/4.3.4 (java 1.5)" },
        { key: "X-GCS-ServerMetaInfo", value: "processed header value" },
        { key: "X-GCS-ClientMetaInfo", value: "processed header value" },
        { key: "Content-Type", value: "application/json" },
        { key: "X-GCS-CustomerHeader", value: "processed header value" },
        { key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }
      ];
      const signature = await authenticator.getAuthorization("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123456789");

      expect(signature).toBe("GCS v1HMAC:5e45c937b9db33ae:grbqq87sHbkoDBhUKzhDOZV343XWHXHxUX7akPiXkVM=");

      const signatureNoContentType = await authenticator.getAuthorization("DELETE", "", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123456789");

      expect(signatureNoContentType).toBe("GCS v1HMAC:5e45c937b9db33ae:grbqq87sHbkoDBhUKzhDOZV343XWHXHxUX7akPiXkVM=");
    });
  });
});
