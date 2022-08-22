/* eslint-disable no-param-reassign, global-require, no-unused-vars */
const traverse = require('traverse');

const INDENT = 2;

/** Replaces a value with a '*' followed by the length of the value. */
const obfuscateValue = function (json, property) {
  traverse(json).forEach(function (node) {
    if (this.key === property) {
      node = `${node}`; // make sure it's a string
      const l = node.length.toString();
      this.update(`*${l}`);
    }
  });
};
const obfuscateSensitiveValue = function (json, property) {
  traverse(json).forEach(function () {
    if (this.key === property) {
      this.update('***');
    }
  });
};

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
    const obfuscated = JSON.parse(JSON.stringify(input));
    obfuscateValue(obfuscated, 'accountNumber');
    obfuscateValue(obfuscated, 'bin');
    obfuscateValue(obfuscated, 'cardNumber');
    obfuscateValue(obfuscated, 'cvv');
    obfuscateValue(obfuscated, 'expiryDate');
    obfuscateValue(obfuscated, 'iban');
    obfuscateValue(obfuscated, 'reformattedAccountNumber');
    // GDPR-related fields
    obfuscateValue(obfuscated, 'additionalInfo');
    obfuscateValue(obfuscated, 'cardholderName');
    obfuscateValue(obfuscated, 'dateOfBirth');
    obfuscateValue(obfuscated, 'emailAddress');
    obfuscateValue(obfuscated, 'faxNumber');
    obfuscateValue(obfuscated, 'firstName');
    obfuscateValue(obfuscated, 'houseNumber');
    obfuscateValue(obfuscated, 'mobilePhoneNumber');
    obfuscateValue(obfuscated, 'passengerName');
    obfuscateValue(obfuscated, 'phoneNumber');
    obfuscateValue(obfuscated, 'street');
    obfuscateValue(obfuscated, 'surname');
    obfuscateValue(obfuscated, 'workPhoneNumber');
    obfuscateValue(obfuscated, 'zip');
    // key-value pairs can contain any value, like credit card numbers or other private data; mask all values
    obfuscateValue(obfuscated, 'value');

    obfuscateSensitiveValue(obfuscated, 'keyId');
    obfuscateSensitiveValue(obfuscated, 'secretKey');
    obfuscateSensitiveValue(obfuscated, 'publicKey');
    obfuscateSensitiveValue(obfuscated, 'userAuthenticationToken');
    // encrypted payload is a base64 string that contains an encrypted value; to make decrypting even harder, just mask the entire thing
    obfuscateSensitiveValue(obfuscated, 'encryptedPayload');
    // decrypted payload is a simple base64 string that may contain credit card numbers or other private data; just mask the entire thing
    obfuscateSensitiveValue(obfuscated, 'decryptedPayload');
    // encrypted customer input is similar to encrypted payload
    obfuscateSensitiveValue(obfuscated, 'encryptedCustomerInput');

    // headers
    obfuscateSensitiveValue(obfuscated, 'Authorization');
    obfuscateSensitiveValue(obfuscated, 'WWW-Authenticate');
    obfuscateSensitiveValue(obfuscated, 'Proxy-Authenticate');
    obfuscateSensitiveValue(obfuscated, 'Proxy-Authorization');
    obfuscateSensitiveValue(obfuscated, 'X-GCS-Authentication-Token');
    obfuscateSensitiveValue(obfuscated, 'X-GCS-CallerPassword');

    return JSON.stringify(obfuscated, null, INDENT);
  },
};

module.exports = obfuscate;
