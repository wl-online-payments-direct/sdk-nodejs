/* eslint-disable no-underscore-dangle, global-require */

/*
 * This class was auto-generated.
 */
// SDK
const apiVersion = 'v2';

const sdkContext = require('./utils/context');
const promisify = require('./utils/promisify');

const apiRootMethods = {
  hostedCheckout: require('./methods/hostedCheckout'),
  hostedTokenization: require('./methods/hostedTokenization'),
  mandates: require('./methods/mandates'),
  payments: require('./methods/payments'),
  payouts: require('./methods/payouts'),
  productGroups: require('./methods/productGroups'),
  products: require('./methods/products'),
  services: require('./methods/services'),
  sessions: require('./methods/sessions'),
  tokens: require('./methods/tokens'),
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
