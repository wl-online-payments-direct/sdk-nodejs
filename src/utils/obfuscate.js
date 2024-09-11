/* eslint-disable no-param-reassign, global-require, no-unused-vars */

const INDENT = 2;
const REPLACECHAR = '*';

/**
 * @returns An obfuscation rule that will replace all characters with *.
 */
function obfuscateAll() {
  const rule = () => {
    return REPLACECHAR.repeat(3);
  };
  return rule;
}

/**
 * @returns An obfuscation rule that will replace with * and total lenght (e.g. AB1 -> *3).
 */
function obfuscateWithLength() {
  const rule = (_value) => {
    const l = `${_value}`.length.toString();
    return `${REPLACECHAR}${l}`;
  };
  return rule;
}

/**
 * @return All the obfuscation rules.
 */
function getObfuscateRules() {
  const obfuscationRules = {};

  obfuscationRules.accountNumber = obfuscateWithLength();
  obfuscationRules.bin = obfuscateWithLength();
  obfuscationRules.cardNumber = obfuscateWithLength();
  obfuscationRules.cvv = obfuscateWithLength();
  obfuscationRules.expiryDate = obfuscateWithLength();
  obfuscationRules.iban = obfuscateWithLength();
  obfuscationRules.reformattedAccountNumber = obfuscateWithLength();
  // GDPR-related fields
  obfuscationRules.additionalInfo = obfuscateWithLength();
  obfuscationRules.cardholderName = obfuscateWithLength();
  obfuscationRules.dateOfBirth = obfuscateWithLength();
  obfuscationRules.emailAddress = obfuscateWithLength();
  obfuscationRules.faxNumber = obfuscateWithLength();
  obfuscationRules.firstName = obfuscateWithLength();
  obfuscationRules.houseNumber = obfuscateWithLength();
  obfuscationRules.mobilePhoneNumber = obfuscateWithLength();
  obfuscationRules.passengerName = obfuscateWithLength();
  obfuscationRules.phoneNumber = obfuscateWithLength();
  obfuscationRules.street = obfuscateWithLength();
  obfuscationRules.surname = obfuscateWithLength();
  obfuscationRules.workPhoneNumber = obfuscateWithLength();
  obfuscationRules.zip = obfuscateWithLength();
  // key-value pairs can contain any value, like credit card numbers or other private data; mask all values
  obfuscationRules.value = obfuscateAll();

  obfuscationRules.keyId = obfuscateAll();
  obfuscationRules.secretKey = obfuscateAll();
  obfuscationRules.publicKey = obfuscateAll();
  obfuscationRules.userAuthenticationToken = obfuscateAll();
  // encrypted payload is a base64 string that contains an encrypted value; to make decrypting even harder, just mask the entire thing
  obfuscationRules.encryptedPayload = obfuscateAll();
  // decrypted payload is a simple base64 string that may contain credit card numbers or other private data; just mask the entire thing
  obfuscationRules.decryptedPayload = obfuscateAll();
  // encrypted customer input is similar to encrypted payload
  obfuscationRules.encryptedCustomerInput = obfuscateAll();

  // headers
  obfuscationRules.Authorization = obfuscateAll();
  obfuscationRules['WWW-Authenticate'] = obfuscateAll();
  obfuscationRules['Proxy-Authenticate'] = obfuscateAll();
  obfuscationRules['Proxy-Authorization'] = obfuscateAll();
  obfuscationRules['X-GCS-Authentication-Token'] = obfuscateAll();
  obfuscationRules['X-GCS-CallerPassword'] = obfuscateAll();

  return obfuscationRules;
}

/**
 * @param {*} value
 * @param {*} obfuscationRule
 * @returns the value obfuscated based on the obfuscation rule
 */
function applyObfuscationRule(value, obfuscationRule) {
  return obfuscationRule ? obfuscationRule(`${value}`) : value;
}

/**
 * @param {*} json
 * @param {*} obfuscationRules
 * @returns a new json based on the obfuscation rule
 */
function applyObfuscationRules(json, obfuscationRules) {
  if (json === null || typeof json !== 'object') {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map((value) => applyObfuscationRules(value, obfuscationRules));
  }

  const result = {};
  Object.entries(json).forEach(([key, value]) => {
    const newValue =
      value !== null && typeof value === 'object'
        ? applyObfuscationRules(value, obfuscationRules)
        : applyObfuscationRule(value, obfuscationRules[key]);
    result[key] = newValue;
  });
  return result;
}

const obfuscate = {
  getObfuscated(input, context) {
    if (!input) {
      return '';
    }
    if (typeof input === 'string') {
      try {
        input = JSON.parse(input);
      } catch (e) {
        if (context && context.isLoggingEnabled()) {
          context.getLogger()('warn', `Cannot parse input to JSON: ${input}`);
        }
        return input;
      }
    }

    const data = JSON.parse(JSON.stringify(input));
    const obfuscationRules = getObfuscateRules();
    const obfuscated = applyObfuscationRules(data, obfuscationRules);

    return JSON.stringify(obfuscated, null, INDENT);
  },
};

module.exports = obfuscate;
