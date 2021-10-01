/* eslint-disable no-undef, no-restricted-syntax, no-use-before-define, no-restricted-globals */
const crypto = require('crypto');
const compare = require('secure-compare');

const sdkApiVersion = 'v1';

const webhooksContext = {};

const secretKeyStore = {};

/**
 * @param body
 * @param requestHeaders
 * @param cb: function (error, even)
 */
const unmarshal = function (body, requestHeaders, cb) {
  validate(body, requestHeaders, function (error) {
    if (error) {
      cb(error, null);
    } else {
      try {
        const event = JSON.parse(body);
        validateApiVersion(event);
        cb(null, event);
      } catch (e) {
        cb(e, null);
      }
    }
  });
};

/**
 * @param body
 * @param requestHeaders
 * @param cb: function (error)
 */
const validate = function (body, requestHeaders, cb) {
  try {
    validateBody(body, requestHeaders, cb);
  } catch (e) {
    cb(e);
  }
};

// validation utility functions

// cb: function (error)
const validateBody = function (body, requestHeaders, cb) {
  try {
    const signature = getHeaderValue(requestHeaders, 'X-GCS-Signature');
    const keyId = getHeaderValue(requestHeaders, 'X-GCS-KeyId');

    webhooksContext.getSecretKey(keyId, function (error, secretKey) {
      if (error) {
        cb(error, null);
      } else {
        const expectedSignature = crypto.createHmac('sha256', secretKey).update(body).digest('base64');
        if (compare(expectedSignature, signature)) {
          cb(null);
        } else {
          cb(new Error(`failed to validate signature '${signature}'`));
        }
      }
    });
  } catch (e) {
    cb(e);
  }
};

// general utility methods

// returns void || throws Error {eventApiVersion, sdkApiVersion}
const validateApiVersion = function (event) {
  if (sdkApiVersion !== event.apiVersion) {
    const e = new Error(
      `event API version ${event.apiVersion} is not compatible with SDK API version ${sdkApiVersion}`
    );
    e.eventApiVersion = event.apiVersion;
    e.sdkApiVersion = sdkApiVersion;
    throw e;
  }
};

// returns string || throws Error
const getHeaderValue = function (requestHeaders, headerName) {
  const lowerCaseHeaderName = headerName.toLowerCase();
  for (const name in requestHeaders) {
    if (name != null && lowerCaseHeaderName === name.toLowerCase()) {
      return requestHeaders[name];
    }
  }
  throw new Error(`could not find header '${headerName}'`);
};

// module exports

const wrapper = {
  init(context) {
    if (!context || !context.getSecretKey || typeof context.getSecretKey !== 'function') {
      throw new Error('no valid secret key store given');
    }
    webhooksContext.getSecretKey = context.getSecretKey;

    return wrapper;
  },

  validate,
  unmarshal,

  inMemorySecretKeyStore: {
    getSecretKey(keyId, cb) {
      secretKey = secretKeyStore[keyId];
      if (!secretKey) {
        const e = new Error(`could not find secret key for key id ${keyId}`);
        e.keyId = keyId;
        cb(e, null);
      } else {
        cb(null, secretKey);
      }
    },
    storeSecretKey(keyId, secretKey) {
      if (!keyId || !keyId.trim()) {
        throw new Error('keyId is required');
      }
      if (!secretKey || !secretKey.trim()) {
        throw new Error('secretKey is required');
      }
      secretKeyStore[keyId] = secretKey;
    },
    removeSecretKey(keyId) {
      delete secretKeyStore[keyId];
    },
    clear() {
      for (const prop in secretKeyStore) {
        if (Object.prototype.hasOwnProperty.call(secretKeyStore, prop)) {
          delete secretKeyStore[prop];
        }
      }
    },
  },
};

module.exports = wrapper;
