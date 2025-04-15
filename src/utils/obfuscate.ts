import { padEnd, padStart } from "lodash";
import { ObfuscationRule, SdkContext } from "../model";

const REPLACE_CHAR = "*";
const INDENT = 2;

const ALL: ObfuscationRule = value => {
  const l = value.length;
  return padStart("", l, REPLACE_CHAR);
};

/**
 * @returns An obfuscation rule that will keep a fixed number of characters at the end, then replaces all other
 *   characters with *.
 */
export function allButLast(count: number): ObfuscationRule {
  return value => {
    const l = value.length;
    const end = value.substring(l - count);
    return padStart(end, l, REPLACE_CHAR);
  };
}

/**
 * @returns An obfuscation rule that will replace all characters with *.
 */
export function all(): ObfuscationRule {
  return ALL;
}

/**
 * @returns An obfuscation rule that will keep a fixed number of characters at the start, then replaces all other
 *   characters with *.
 */
export function allButFirst(count: number): ObfuscationRule {
  return value => {
    const l = value.length;
    const start = value.substring(0, count);
    return padEnd(start, l, REPLACE_CHAR);
  };
}

/**
 * @returns An obfuscation rule that will replace values with a fixed length string containing only *.
 */
export function withFixedLength(count: number): ObfuscationRule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return _value => {
    return padEnd("", count, REPLACE_CHAR);
  };
}

type ObfuscationRules = { [key: string]: ObfuscationRule | undefined };

function obfuscationRuleKey(name: string, toLowerCase: boolean): string {
  return toLowerCase ? name.toLowerCase() : name;
}

function applyObfuscationRule(value: unknown, obfuscationRule?: ObfuscationRule): unknown {
  return obfuscationRule ? obfuscationRule("" + value) : value;
}

function applyObfuscationRules(json: unknown, obfuscationRules: ObfuscationRules, toLowerCase: boolean): unknown {
  if (json === null || typeof json !== "object") {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(value => applyObfuscationRules(value, obfuscationRules, toLowerCase));
  }
  const entries = Object.entries(json).map(([key, value]) => {
    const newValue =
      value !== null && typeof value === "object"
        ? applyObfuscationRules(value, obfuscationRules, toLowerCase)
        : applyObfuscationRule(value, obfuscationRules[obfuscationRuleKey(key, toLowerCase)]);
    return [key, newValue];
  });
  return Object.fromEntries(entries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getObfuscated(input: any, context: SdkContext, caseInsensitive = false): string {
  if (!input) {
    return "";
  }
  if (typeof input === "string") {
    try {
      input = JSON.parse(input);
    } catch (e) {
      const logger = context.getLogger();
      if (context.isLoggingEnabled()) {
        logger("warn", "Cannot parse input to JSON: " + input);
      }
      return input;
    }
  }
  const obfuscationRules: ObfuscationRules = {};
  obfuscationRules[obfuscationRuleKey("additionalInfo", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("cardholderName", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("dateOfBirth", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("emailAddress", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("faxNumber", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("firstName", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("houseNumber", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("mobilePhoneNumber", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("passengerName", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("phoneNumber", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("street", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("workPhoneNumber", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("zip", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("cardNumber", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("expiryDate", caseInsensitive)] = allButLast(2);
  obfuscationRules[obfuscationRuleKey("cvv", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("iban", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("accountNumber", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("reformattedAccountNumber", caseInsensitive)] = allButLast(4);
  obfuscationRules[obfuscationRuleKey("bin", caseInsensitive)] = allButFirst(6);
  // key-value pairs can contain any value, like credit card numbers or other private data; mask all values
  obfuscationRules[obfuscationRuleKey("value", caseInsensitive)] = all();
  obfuscationRules[obfuscationRuleKey("keyId", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("secretKey", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("publicKey", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("userAuthenticationToken", caseInsensitive)] = withFixedLength(8);
  // encrypted payload is a base64 string that contains an encrypted value; to make decrypting even harder, just mask
  // the entire thing
  obfuscationRules[obfuscationRuleKey("encryptedPayload", caseInsensitive)] = withFixedLength(8);
  // decrypted payload is a simple base64 string that may contain credit card numbers or other private data; just mask
  // the entire thing
  obfuscationRules[obfuscationRuleKey("decryptedPayload", caseInsensitive)] = withFixedLength(8);
  // encrypted customer input is similar to encrypted payload
  obfuscationRules[obfuscationRuleKey("encryptedCustomerInput", caseInsensitive)] = withFixedLength(8);

  // headers
  obfuscationRules[obfuscationRuleKey("X-GCS-Authentication-Token", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("X-GCS-CallerPassword", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("Authorization", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("WWW-Authenticate", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("Proxy-Authenticate", caseInsensitive)] = withFixedLength(8);
  obfuscationRules[obfuscationRuleKey("Proxy-Authorization", caseInsensitive)] = withFixedLength(8);

  const customObfuscationRules = context.getObfuscationRules();
  for (const key in customObfuscationRules) {
    obfuscationRules[obfuscationRuleKey(key, caseInsensitive)] = customObfuscationRules[key];
  }

  const obfuscated = applyObfuscationRules(input, obfuscationRules, caseInsensitive);

  return JSON.stringify(obfuscated, null, INDENT);
}

export default {
  getObfuscated,
  all,
  allButLast,
  allButFirst,
  withFixedLength
};
