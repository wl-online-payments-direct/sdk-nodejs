/* eslint-disable no-param-reassign, no-throw-literal  */
const crypto = require('crypto');

const _ = require('lodash');

/**
 * @param  {Array} gcsHeaders Collection of headers that need to be sorted; only headers that start with X-GCS will be returned
 */
const getSortedHeadersForContext = function (gcsHeaders) {
  let headers = '';
  if (gcsHeaders) {
    let sortedXGCSHeaders = [];
    _.forEach(gcsHeaders, function (header) {
      if (header.key.toUpperCase().indexOf('X-GCS') === 0) {
        // add this header
        sortedXGCSHeaders.push(header);
      }
    });
    sortedXGCSHeaders = sortedXGCSHeaders.sort(function (a, b) {
      a.key = a.key.toUpperCase();
      b.key = b.key.toUpperCase();
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
    _.forEach(sortedXGCSHeaders, function (header) {
      headers += `${header.key.toLowerCase()}:${header.value}\n`;
    });
  }
  return headers;
};

const sdkContext = {
  setContext(context) {
    this.context = context;
  },
  getContext() {
    return this.context;
  },
  getSignature(method, contentType, date, gcsHeaders, path) {
    const headers = getSortedHeadersForContext(gcsHeaders);
    return crypto
      .createHmac('SHA256', this.getContext().secretApiKey)
      .update(`${method}\n${contentType}\n${date}\n${headers}${path}\n`)
      .digest('base64');
  },
  setLogger(logger) {
    this.logger = logger;
  },
  getLogger() {
    return this.logger;
  },
  setEnableLogging(isLoggingEnabled) {
    this.enableLogging = isLoggingEnabled;
  },
  setIdempotenceRequestTimestamp(ts) {
    this.idempotenceRequestTimestamp = ts;
  },
  getIdempotenceRequestTimestamp() {
    return this.idempotenceRequestTimestamp;
  },
  setIntegrator(integrator) {
    this.integrator = integrator;
  },
  getIntegrator() {
    return this.integrator;
  },
  setShoppingCartExtension(shoppingCartExtension) {
    if (this.getShoppingCartExtension()) {
      if (this.isLoggingEnabled()) {
        this.getLogger()('error', 'shoppingCartExtension has already been set and cannot be overwritten');
      }
      throw 'shoppingCartExtension has already been set and cannot be overwritten';
    }
    if (shoppingCartExtension) {
      if (shoppingCartExtension.creator && shoppingCartExtension.name && shoppingCartExtension.version) {
        this.shoppingCartExtension = shoppingCartExtension;
      } else if (this.isLoggingEnabled()) {
        this.getLogger()(
          'warn',
          `shoppingCartExtension is missing a required property (creator / name / version). Your shoppingCartExtension: ${JSON.stringify(
            shoppingCartExtension
          )}`
        );
      }
    }
  },
  getShoppingCartExtension() {
    return this.shoppingCartExtension;
  },
  isLoggingEnabled() {
    return this.enableLogging;
  },
};

module.exports = sdkContext;
