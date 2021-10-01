/* eslint-disable no-underscore-dangle, global-require */
/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
// SDK
const apiVersion = 'v2';

const sdkContext = require('./utils/context');
const promisify = require('./utils/promisify');

const apiRootMethods = {
  products: require('./methods/products'),
  sessions: require('./methods/sessions'),
  payouts: require('./methods/payouts'),
  payments: require('./methods/payments'),
  services: require('./methods/services'),
  productGroups: require('./methods/productGroups'),
  hostedTokenization: require('./methods/hostedTokenization'),
  tokens: require('./methods/tokens'),
  hostedCheckout: require('./methods/hostedCheckout'),
};

const webhooks = require('./webhooks');

const setProtocolAndPort = (context) => {
  if (typeof context.scheme === 'undefined') {
    context.scheme = 'https';
  }
  if (typeof context.port === 'undefined') {
    if (context.scheme === 'https') {
      context.port = 443;
    } else {
      context.port = 80;
    }
  }
};

const setHttpOptions = (context) => {
  setProtocolAndPort(context);
  context.httpOptions = {
    host: context.host,
    protocol: `${context.scheme}:`,
    method: null,
    port: context.port,
    headers: {},
  };
};

const defaultApi = {
  init(context) {
    setHttpOptions(context);
    context.API_VERSION = apiVersion;
    sdkContext.setContext(context);
    sdkContext.setLogger((level, message) => {
      if (typeof context.logger !== 'undefined' && context.logger) {
        context.logger[level](message);
      } else {
        console[level](message);
      }
    });
    if (Object.prototype.hasOwnProperty.call(context, 'enableLogging')) {
      sdkContext.setEnableLogging(context.enableLogging);
    } else {
      sdkContext.setEnableLogging(false);
    }
    sdkContext.setIntegrator(context.integrator);
    sdkContext.setShoppingCartExtension(context.shoppingCartExtension);
    return defaultApi;
  },
  ...promisify(apiRootMethods),
  context: sdkContext,
  webhooks,
};

module.exports = defaultApi;
