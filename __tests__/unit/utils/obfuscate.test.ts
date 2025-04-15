import each from "jest-each";
import http from "http";
import _ from "lodash";
import obfuscate from "../../../src/utils/obfuscate";
import { SdkContext } from "../../../src/model";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group unit:obfuscate
 */
describe("obfuscate.getObfuscated", () => {
  let sdkContext: SdkContext;

  beforeEach(() => {
    const sdkConfig = dummySdkConfig();
    sdkConfig.host = "example.org";
    sdkConfig.scheme = "https";
    sdkConfig.port = -1;
    sdkConfig.integrator = "Integration tests";

    sdkContext = newSdkContext(sdkConfig);
  });

  test("undefined body", () => {
    expect(obfuscate.getObfuscated(undefined, sdkContext)).toBe("");
  });

  test("empty body", () => {
    expect(obfuscate.getObfuscated("", sdkContext)).toBe("");
  });

  test("cardNumber", () => {
    const body = {
      order: {
        amountOfMoney: {
          currencyCode: "CAD",
          amount: 2345
        },
        customer: {
          billingAddress: {
            countryCode: "CA"
          }
        }
      },
      cardPaymentMethodSpecificInput: {
        paymentProductId: 1,
        card: {
          cvv: "123",
          cardNumber: "1234567890123456",
          expiryDate: "1220"
        }
      }
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.cardPaymentMethodSpecificInput.card.cvv = "***";
    expected.cardPaymentMethodSpecificInput.card.cardNumber = "************3456";
    expected.cardPaymentMethodSpecificInput.card.expiryDate = "**20";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("cardNumber with custom rule", () => {
    const body = {
      order: {
        amountOfMoney: {
          currencyCode: "CAD",
          amount: 2345
        },
        customer: {
          billingAddress: {
            countryCode: "CA"
          }
        }
      },
      cardPaymentMethodSpecificInput: {
        paymentProductId: 1,
        card: {
          cvv: "123",
          cardNumber: "1234567890123456",
          expiryDate: "1220"
        }
      }
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.cardPaymentMethodSpecificInput.card.cvv = "***";
    expected.cardPaymentMethodSpecificInput.card.cardNumber = "123456******3456";
    expected.cardPaymentMethodSpecificInput.card.expiryDate = "**20";

    sdkContext.getObfuscationRules().cardNumber = value => value.substring(0, 6) + _.padStart("", 6, "*") + value.substring(12);

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("iban", () => {
    const body = {
      sepaDirectDebit: {
        mandate: {
          bankAccountIban: {
            iban: "NL00INGB0001234567"
          },
          debtor: {
            surname: "Jones"
          },
          isRecurring: false
        },
        customer: {
          billingAddress: {
            countryCode: "NL"
          }
        }
      },
      paymentProductId: 770
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.sepaDirectDebit.mandate.bankAccountIban.iban = "**************4567";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("bin", () => {
    const body = {
      bin: "12345678"
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.bin = "123456**";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("no matches", () => {
    const body = {
      order: {
        amountOfMoney: {
          currencyCode: "EUR",
          amount: 1000
        },
        customer: {
          locale: "nl_NL",
          billingAddress: {
            countryCode: "NL"
          }
        }
      },
      bankTransferPaymentMethodSpecificInput: {
        paymentProductId: 11
      }
    };
    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(body, null, 2));
  });

  test("not matching object", () => {
    const body = {
      values: [{ value: true }, { value: "12345" }, { value: 12345 }, { value: {} }]
    };
    const expected = JSON.parse(JSON.stringify(body));
    expected.values[0].value = "****";
    expected.values[1].value = "*****";
    expected.values[2].value = "*****";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  const headersTestData = [
    ["Authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["authorization", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],
    ["AUTHORIZATION", "Basic QWxhZGRpbjpPcGVuU2VzYW1l", "********"],

    ["Content-Type", "application/json", "application/json"],
    ["content-type", "application/json", "application/json"],
    ["CONTENT-TYPE", "application/json", "application/json"]
  ];
  each(headersTestData).test("when the header is '%s'", (name, originalValue, expectedObfuscatedValue) => {
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
  each(customHeadersTestData).test("when the header is '%s'", (name, originalValue, expectedObfuscatedValue) => {
    const headers: http.IncomingHttpHeaders = {};
    headers[name] = originalValue;
    headers["content-length"] = "5";

    const expected = JSON.parse(JSON.stringify(headers));
    expected[name] = expectedObfuscatedValue;

    sdkContext.getObfuscationRules()["content-type"] = obfuscate.all();

    expect(obfuscate.getObfuscated(headers, sdkContext, true)).toBe(JSON.stringify(expected, null, 2));
  });
});
