import { V1HmacAuthenticator } from "../../../src/utils/authentication";
import { Header } from "../../../src";

/**
 * @group authentication
 */
describe("V1Hmac authentication", () => {
  describe("constructor", () => {
    test("shouldProduceEmptyKeyIdSegmentInAuthorizationHeaderWhenApiKeyIdIsEmpty", async () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const authorization = await authenticator.getAuthorization("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/123");

      expect(authorization).toMatch(/^GCS v1HMAC::/);
    });

    test("shouldNotThrowWhenApiKeyIdIsNull", () => {
      expect(
        () =>
          new V1HmacAuthenticator({
            apiKeyId: (null as unknown) as string,
            secretApiKey: "secretApiKey",
            host: "dummy",
            integrator: "OnlinePayments"
          })
      ).not.toThrow();
    });

    test("shouldNotThrowWhenSecretApiKeyIsNull", () => {
      expect(
        () =>
          new V1HmacAuthenticator({
            apiKeyId: "apiKeyId",
            secretApiKey: (null as unknown) as string,
            host: "dummy",
            integrator: "OnlinePayments"
          })
      ).not.toThrow();
    });

    test("shouldNotThrowWhenSecretApiKeyIsEmpty", () => {
      expect(
        () =>
          new V1HmacAuthenticator({
            apiKeyId: "apiKeyId",
            secretApiKey: "",
            host: "dummy",
            integrator: "OnlinePayments"
          })
      ).not.toThrow();
    });

    test("shouldNotThrowWhenSecretApiKeyIsWhitespace", () => {
      expect(
        () =>
          new V1HmacAuthenticator({
            apiKeyId: "apiKeyId",
            secretApiKey: "   ",
            host: "dummy",
            integrator: "OnlinePayments"
          })
      ).not.toThrow();
    });
  });

  describe("canonicalize headers", () => {
    let authenticator: V1HmacAuthenticator;

    beforeEach(() => {
      authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });
    });

    test("shouldReturnNormalizedValueWhenCanonicalizingHeaderValueWithWhitespaceAndNewLines", () => {
      expect(authenticator.toCanonicalizeHeaderValue("aap\nnoot  ")).toBe("aap noot");
      expect(authenticator.toCanonicalizeHeaderValue(" aap\r\n  noot")).toBe("aap noot");
      expect(authenticator.toCanonicalizeHeaderValue(" some value  \r\n \n with  some \r\n  spaces ")).toBe("some value    with  some  spaces");
    });

    test("shouldThrowWhenValueIsNull", () => {
      expect(() => authenticator.toCanonicalizeHeaderValue((null as unknown) as string)).toThrow();
    });

    test("shouldReturnEmptyStringWhenValueIsEmpty", () => {
      expect(authenticator.toCanonicalizeHeaderValue("")).toBe("");
    });

    test("shouldReturnEmptyStringWhenValueIsWhitespaceOnly", () => {
      expect(authenticator.toCanonicalizeHeaderValue("   ")).toBe("");
    });

    test("shouldReturnNormalizedValueWhenValueContainsCarriageReturnLineFeed", () => {
      expect(authenticator.toCanonicalizeHeaderValue("a\r\nb\r\nc")).toBe("a b c");
    });
  });

  describe("signature headers", () => {
    test("shouldReturnSortedLowercaseXGCSHeadersWhenGettingContextHeaders", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [
        { key: "X-GCS-ServerMetaInfo", value: "test value" },
        { key: "Content-Type", value: "test value" },
        { key: "X-GCS-ClientMetaInfo", value: "test value" },
        { key: "Date", value: "test value" }
      ];

      expect(authenticator.getSortedHeadersForContext(headers)).toBe("x-gcs-clientmetainfo:test value\nx-gcs-servermetainfo:test value\n");
    });
  });

  describe("data to sign", () => {
    test("shouldReturnExpectedCanonicalStringWhenCreatingDataToSignWithValidHeaders", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [
        { key: "Content-Type", value: "application/json" },
        { key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }
      ];

      const signature = authenticator.getSignature("GET", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123");

      expect(signature).toBeDefined();
      expect(typeof signature).toBe("string");
    });

    test("shouldReturnCorrectCanonicalPathWhenCreatingDataToSignWithSpecialCharactersInMerchantId", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const merchantId = "m/er#ch@nt 123";
      const path = `/v2/${merchantId}/tokens/123456789`;

      const signature = authenticator.getSignature("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", [], path);

      expect(signature).toBeDefined();
      expect(typeof signature).toBe("string");
    });

    test("shouldProduceSameSignatureForDeleteRegardlessOfContentType", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const sigEmpty = authenticator.getSignature("DELETE", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      const sigWithContentType = authenticator.getSignature("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");

      expect(sigEmpty).toBe(sigWithContentType);
    });

    test("shouldProduceDifferentSignatureForPathWithAndWithoutQueryString", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const sigWithoutQuery = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      const sigWithQuery = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2?foo=bar");

      expect(sigWithoutQuery).not.toBe(sigWithQuery);
    });

    test("shouldProduceSameSignatureForGetWithAndWithoutContentType", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const sigWithoutContentType = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      const sigWithContentType = authenticator.getSignature("GET", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");

      expect(sigWithoutContentType).toBe(sigWithContentType);
    });

    test("shouldProduceDifferentSignatureForPostWithDifferentContentTypes", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const sigWithoutContentType = authenticator.getSignature("POST", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/payments");
      const sigWithContentType = authenticator.getSignature("POST", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/payments");

      expect(sigWithoutContentType).not.toBe(sigWithContentType);
    });

    test("shouldProduceDifferentSignaturesForDifferentDates", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const sigDateA = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      const sigDateB = authenticator.getSignature("GET", "", "Mon, 09 Jun 2014 09:00:00 GMT", [], "/v2/1/tokens/2");

      expect(sigDateA).not.toBe(sigDateB);
    });
  });

  describe("create signature", () => {
    test("shouldReturnExpectedSignatureWhenCreatingAuthenticationSignatureForDeleteRequest", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [
        { key: "x-gcs-clientmetainfo", value: "processed header value" },
        { key: "x-gcs-customerheader", value: "processed header value" },
        { key: "x-gcs-servermetainfo", value: "processed header value" }
      ];

      const signature = authenticator.getSignature("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/9991/tokens/123456789");

      expect(signature).toBe("ZwEzZQwZxSOSSlUcXqcLWllnw2REyh8abdJBsVWsQ1k=");
    });

    test("shouldReturnExpectedSignatureWhenCreatingAuthenticationSignatureForGetRequest", () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "EC36A74A98D21",
        secretApiKey: "6Kj5HT0MQKC6D8eb7W3lTg71kVKVDSt1",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const signature = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/9991/tokens/123456789");

      expect(signature).toBe("Y3E5YaU3oQCt4osEotLGb9W0cMclIzlCpvbaD1KhWxE=");
    });
  });

  describe("create authorization header value", () => {
    test("shouldReturnExpectedAuthorizationHeaderWhenGettingAuthorizationForMinimalExample", async () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "5e45c937b9db33ae",
        secretApiKey: "I42Zf4pVnRdroHfuHnRiJjJ2B6+22h0yQt/R3nZR8Xg=",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [
        { key: "User-Agent", value: "Apache-HttpClient/4.3.4 (java 1.5)" },
        { key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }
      ];

      const authorization = await authenticator.getAuthorization("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123456789");

      expect(authorization).toBe("GCS v1HMAC:5e45c937b9db33ae:UpOoo/pmmj7tW03IbEcw2WtJURFCKL2/J6hqMc+1h1I=");
    });

    test("shouldReturnExpectedAuthorizationHeaderWhenGettingAuthorizationForFullExample", async () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "5e45c937b9db33ae",
        secretApiKey: "I42Zf4pVnRdroHfuHnRiJjJ2B6+22h0yQt/R3nZR8Xg=",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [
        { key: "User-Agent", value: "Apache-HttpClient/4.3.4 (java 1.5)" },
        { key: "X-GCS-ServerMetaInfo", value: "processed header value" },
        { key: "X-GCS-ClientMetaInfo", value: "processed header value" },
        { key: "Content-Type", value: "application/json" },
        { key: "X-GCS-CustomerHeader", value: "processed header value" },
        { key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }
      ];

      const authorization = await authenticator.getAuthorization("DELETE", "application/json", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/tokens/123456789");

      expect(authorization).toBe("GCS v1HMAC:5e45c937b9db33ae:grbqq87sHbkoDBhUKzhDOZV343XWHXHxUX7akPiXkVM=");
    });

    test("shouldContainV1HmacAuthorizationTypeWhenGettingAuthorizationWithDefaultConfiguration", async () => {
      const authenticator = new V1HmacAuthenticator({
        apiKeyId: "testKey",
        secretApiKey: "testSecret",
        host: "dummy",
        integrator: "OnlinePayments"
      });

      const headers: Header[] = [{ key: "Date", value: "Fri, 06 Jun 2014 13:39:43 GMT" }];

      const authorization = await authenticator.getAuthorization("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", headers, "/v2/1/test");

      expect(authorization).toContain("GCS v1HMAC:");
      expect(authorization).toContain("testKey");
    });
  });

  describe("getAuthorization invalid input", () => {
    let authenticator: V1HmacAuthenticator;

    beforeEach(() => {
      authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });
    });

    test("shouldResolveWithStringWhenHttpMethodIsNull", async () => {
      const result = await authenticator.getAuthorization((null as unknown) as string, "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldResolveWithStringWhenHttpMethodIsEmpty", async () => {
      const result = await authenticator.getAuthorization("", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldResolveWithStringWhenHttpMethodIsWhitespace", async () => {
      const result = await authenticator.getAuthorization("   ", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldResolveWithStringWhenPathIsNull", async () => {
      const result = await authenticator.getAuthorization("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], (null as unknown) as string);
      expect(typeof result).toBe("string");
    });
  });

  describe("getSignature invalid input", () => {
    let authenticator: V1HmacAuthenticator;

    beforeEach(() => {
      authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });
    });

    test("shouldReturnStringWhenHttpMethodIsNull", () => {
      const result = authenticator.getSignature((null as unknown) as string, "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldReturnStringWhenHttpMethodIsEmpty", () => {
      const result = authenticator.getSignature("", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldReturnStringWhenHttpMethodIsWhitespace", () => {
      const result = authenticator.getSignature("   ", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], "/v2/1/tokens/2");
      expect(typeof result).toBe("string");
    });

    test("shouldReturnStringWhenPathIsNull", () => {
      const result = authenticator.getSignature("GET", "", "Fri, 06 Jun 2014 13:39:43 GMT", [], (null as unknown) as string);
      expect(typeof result).toBe("string");
    });
  });

  describe("getSortedHeadersForContext", () => {
    let authenticator: V1HmacAuthenticator;

    beforeEach(() => {
      authenticator = new V1HmacAuthenticator({
        apiKeyId: "apiKeyId",
        secretApiKey: "secretApiKey",
        host: "dummy",
        integrator: "OnlinePayments"
      });
    });

    test("should canonicalize X-GCS header names to lowercase", () => {
      const headers: Header[] = [
        { key: "X-GCS-ServerMetaInfo", value: "server-value" },
        { key: "X-GCS-CLIENTMETAINFO", value: "client-value" },
        { key: "X-GCS-CustomerHeader", value: "customer-value" },
        { key: "Date", value: "Mon, 07 Jul 2014 12:12:40 GMT" }
      ];

      const result = authenticator.getSortedHeadersForContext(headers);

      expect(result).toContain("x-gcs-clientmetainfo:client-value\n");
      expect(result).toContain("x-gcs-customerheader:customer-value\n");
      expect(result).toContain("x-gcs-servermetainfo:server-value\n");
    });

    test("should sort X-GCS headers alphabetically", () => {
      const headers: Header[] = [
        { key: "X-GCS-ServerMetaInfo", value: "server-value" },
        { key: "X-GCS-CustomerHeader", value: "customer-value" },
        { key: "X-GCS-ClientMetaInfo", value: "client-value" },
        { key: "Date", value: "Mon, 07 Jul 2014 12:12:40 GMT" }
      ];

      const result = authenticator.getSortedHeadersForContext(headers);

      const clientIndex = result.indexOf("x-gcs-clientmetainfo:client-value\n");
      const customerIndex = result.indexOf("x-gcs-customerheader:customer-value\n");
      const serverIndex = result.indexOf("x-gcs-servermetainfo:server-value\n");

      expect(clientIndex).toBeLessThan(customerIndex);
      expect(customerIndex).toBeLessThan(serverIndex);
    });

    test("should ignore non-X-GCS headers", () => {
      const headers: Header[] = [
        { key: "User-Agent", value: "test-agent" },
        { key: "Accept", value: "application/json" },
        { key: "Date", value: "Mon, 07 Jul 2014 12:12:40 GMT" }
      ];

      const result = authenticator.getSortedHeadersForContext(headers);

      expect(result).not.toContain("user-agent");
      expect(result).not.toContain("accept:application/json");
    });

    test("should return empty string when headers list is empty", () => {
      expect(authenticator.getSortedHeadersForContext([])).toBe("");
    });

    test("should return empty string when headers list is null/undefined", () => {
      expect(authenticator.getSortedHeadersForContext((null as unknown) as Header[])).toBe("");
    });
  });
});
