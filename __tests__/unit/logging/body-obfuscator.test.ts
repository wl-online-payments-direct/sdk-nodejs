import _ from "lodash";
import obfuscate from "../../../src/utils/obfuscate";
import { SdkContext } from "../../../src";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group logging
 */
describe("bodyObfuscator", () => {
  let sdkContext: SdkContext;

  beforeEach(() => {
    const sdkConfig = dummySdkConfig();
    sdkConfig.host = "example.org";
    sdkConfig.scheme = "https";
    sdkConfig.port = -1;
    sdkConfig.integrator = "Integration tests";

    sdkContext = newSdkContext(sdkConfig);
  });

  test("shouldReturnEmptyStringWhenObfuscatingUndefinedBody", () => {
    expect(obfuscate.getObfuscated(undefined, sdkContext)).toBe("");
  });

  test("shouldReturnEmptyStringWhenObfuscatingNullBody", () => {
    expect(obfuscate.getObfuscated(null, sdkContext)).toBe("");
  });

  test("shouldReturnEmptyStringWhenObfuscatingEmptyBody", () => {
    expect(obfuscate.getObfuscated("", sdkContext)).toBe("");
  });

  test("shouldReturnObfuscatedBodyWhenObfuscatingBodyContainingCard", () => {
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

  test("shouldReturnBodyObfuscatedWithCustomCardRuleWhenObfuscatingCardBody", () => {
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

  test("shouldReturnObfuscatedBodyWhenObfuscatingBodyContainingIban", () => {
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

  test("shouldReturnObfuscatedBodyWhenObfuscatingBodyContainingBin", () => {
    const body = {
      bin: "12345678"
    };

    const expected = JSON.parse(JSON.stringify(body));
    expected.bin = "123456**";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("shouldReturnOriginalBodyWhenObfuscatingBodyWithoutMatchingFields", () => {
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

  test("shouldReturnObfuscatedBodyWhenObfuscatingBodyContainingNestedObjectValues", () => {
    const body = {
      values: [{ value: true }, { value: "12345" }, { value: 12345 }, { value: {} }]
    };

    const expected = JSON.parse(JSON.stringify(body));
    expected.values[0].value = "****";
    expected.values[1].value = "*****";
    expected.values[2].value = "*****";

    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("shouldReturnObfuscatedBodyWhenObfuscatingJsonStringInput", () => {
    const body = {
      cardPaymentMethodSpecificInput: {
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

    expect(obfuscate.getObfuscated(JSON.stringify(body), sdkContext)).toBe(JSON.stringify(expected, null, 2));
  });

  test("shouldReturnOriginalBodyWhenObfuscatingNonJsonStringInput", () => {
    const body = "plain text body that is not JSON";
    expect(obfuscate.getObfuscated(body, sdkContext)).toBe(body);
  });

  describe("value obfuscators", () => {
    test("shouldObfuscateAllCharactersWhenUsingAllRule", () => {
      const rule = obfuscate.all();
      expect(rule("abc")).toBe("***");
      expect(rule("hello")).toBe("*****");
      expect(rule("")).toBe("");
    });

    test("shouldObfuscateAllButFirstNCharacters", () => {
      const rule = obfuscate.allButFirst(4);
      expect(rule("1234567890")).toBe("1234******");
      expect(rule("abcd")).toBe("abcd");
      expect(rule("ab")).toBe("ab");
    });

    test("shouldKeepSpecifiedNumberOfLeadingCharactersForAllButFirst", () => {
      expect(obfuscate.allButFirst(1)("secret123")).toBe("s********");
      expect(obfuscate.allButFirst(3)("secret123")).toBe("sec******");
      expect(obfuscate.allButFirst(5)("secret123")).toBe("secre****");
    });

    test("shouldObfuscateAllButLastNCharacters", () => {
      const rule = obfuscate.allButLast(4);
      expect(rule("1234567890")).toBe("******7890");
      expect(rule("abcd")).toBe("abcd");
      expect(rule("ab")).toBe("ab");
    });

    test("shouldKeepSpecifiedNumberOfTrailingCharactersForAllButLast", () => {
      expect(obfuscate.allButLast(1)("secret123")).toBe("********3");
      expect(obfuscate.allButLast(3)("secret123")).toBe("******123");
      expect(obfuscate.allButLast(5)("secret123")).toBe("****et123");
    });

    test("shouldObfuscateValueWithFixedLengthMask", () => {
      const rule = obfuscate.withFixedLength(8);
      expect(rule("short")).toBe("********");
      expect(rule("a very long value")).toBe("********");
      expect(rule("")).toBe("********");
    });

    test("shouldRespectDifferentConfiguredLengthsForWithFixedLength", () => {
      expect(obfuscate.withFixedLength(4)("value")).toBe("****");
      expect(obfuscate.withFixedLength(8)("value")).toBe("********");
      expect(obfuscate.withFixedLength(16)("value")).toBe("****************");
    });
  });
});
