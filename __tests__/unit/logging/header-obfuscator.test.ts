import each from "jest-each";
import http from "http";
import obfuscate from "../../../src/utils/obfuscate";
import { SdkContext } from "../../../src";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group logging
 */
describe("headerObfuscator", () => {
  let sdkContext: SdkContext;

  beforeEach(() => {
    const sdkConfig = dummySdkConfig();
    sdkConfig.host = "example.org";
    sdkConfig.scheme = "https";
    sdkConfig.port = -1;
    sdkConfig.integrator = "Integration tests";

    sdkContext = newSdkContext(sdkConfig);
  });

  const headersTestData = [
    ["Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["AUTHORIZATION", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],

    ["Content-Type", "application/json", "application/json"],
    ["content-type", "application/json", "application/json"],
    ["CONTENT-TYPE", "application/json", "application/json"]
  ];

  each(headersTestData).test("shouldObfuscateSensitiveHeadersWithDefaultRule", (name, originalValue, expectedObfuscatedValue) => {
    const headers: http.IncomingHttpHeaders = {};
    headers[name] = originalValue;
    headers["content-length"] = "5";

    const expected = JSON.parse(JSON.stringify(headers));
    expected[name] = expectedObfuscatedValue;

    expect(obfuscate.getObfuscated(headers, sdkContext, true)).toBe(JSON.stringify(expected, null, 2));
  });

  const customHeadersTestData = [
    ["Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["AUTHORIZATION", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],

    ["Content-Type", "application/json", "****************"],
    ["content-type", "application/json", "****************"],
    ["CONTENT-TYPE", "application/json", "****************"]
  ];

  each(customHeadersTestData).test("shouldObfuscateHeadersUsingCustomRule", (name, originalValue, expectedObfuscatedValue) => {
    const headers: http.IncomingHttpHeaders = {};
    headers[name] = originalValue;
    headers["content-length"] = "5";

    const expected = JSON.parse(JSON.stringify(headers));
    expected[name] = expectedObfuscatedValue;

    sdkContext.getObfuscationRules()["content-type"] = obfuscate.all();

    expect(obfuscate.getObfuscated(headers, sdkContext, true)).toBe(JSON.stringify(expected, null, 2));
  });

  describe("obfuscate.all() edge cases", () => {
    test("shouldReturnEmptyStringWhenValueIsEmpty", () => {
      expect(obfuscate.all()("")).toBe("");
    });

    test("shouldThrowWhenValueIsNull", () => {
      expect(() => obfuscate.all()((null as unknown) as string)).toThrow();
    });

    test("shouldThrowWhenValueIsUndefined", () => {
      expect(() => obfuscate.all()((undefined as unknown) as string)).toThrow();
    });
  });

  describe("obfuscate.allButFirst() edge cases", () => {
    test("shouldReturnEmptyStringWhenValueIsEmpty", () => {
      expect(obfuscate.allButFirst(3)("")).toBe("");
    });

    test("shouldThrowWhenValueIsNull", () => {
      expect(() => obfuscate.allButFirst(3)((null as unknown) as string)).toThrow();
    });

    test("shouldThrowWhenValueIsUndefined", () => {
      expect(() => obfuscate.allButFirst(3)((undefined as unknown) as string)).toThrow();
    });

    test("shouldKeepSpecifiedNumberOfLeadingCharacters", () => {
      expect(obfuscate.allButFirst(1)("secret123")).toBe("s********");
      expect(obfuscate.allButFirst(3)("secret123")).toBe("sec******");
      expect(obfuscate.allButFirst(5)("secret123")).toBe("secre****");
    });
  });

  describe("obfuscate.allButLast() edge cases", () => {
    test("shouldReturnEmptyStringWhenValueIsEmpty", () => {
      expect(obfuscate.allButLast(3)("")).toBe("");
    });

    test("shouldThrowWhenValueIsNull", () => {
      expect(() => obfuscate.allButLast(3)((null as unknown) as string)).toThrow();
    });

    test("shouldThrowWhenValueIsUndefined", () => {
      expect(() => obfuscate.allButLast(3)((undefined as unknown) as string)).toThrow();
    });

    test("shouldKeepSpecifiedNumberOfTrailingCharacters", () => {
      expect(obfuscate.allButLast(1)("secret123")).toBe("********3");
      expect(obfuscate.allButLast(3)("secret123")).toBe("******123");
      expect(obfuscate.allButLast(5)("secret123")).toBe("****et123");
    });
  });

  describe("obfuscate.withFixedLength() edge cases", () => {
    test("shouldReturnFixedLengthStringWhenValueIsEmpty", () => {
      expect(obfuscate.withFixedLength(8)("")).toBe("********");
    });

    test("shouldReturnFixedLengthStringWhenValueIsNull", () => {
      expect(obfuscate.withFixedLength(8)((null as unknown) as string)).toBe("********");
    });

    test("shouldReturnFixedLengthStringWhenValueIsUndefined", () => {
      expect(obfuscate.withFixedLength(8)((undefined as unknown) as string)).toBe("********");
    });

    test("shouldRespectDifferentConfiguredLengths", () => {
      expect(obfuscate.withFixedLength(4)("value")).toBe("****");
      expect(obfuscate.withFixedLength(8)("value")).toBe("********");
      expect(obfuscate.withFixedLength(16)("value")).toBe("****************");
    });
  });
});
