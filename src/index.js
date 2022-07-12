/* eslint-disable no-underscore-dangle, global-require */

const apiVersion = 'v2';

const clientContext = require('./utils/context');
const client = require('./client');
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
    const sdkContext = clientContext();
    setHttpOptions(context);
    context.API_VERSION = apiVersion;
    sdkContext.setContext(context);
    sdkContext.setIntegrator(context.integrator);
    sdkContext.setShoppingCartExtension(context.shoppingCartExtension);
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
    return client(sdkContext);
  },
  webhooks,
};

module.exports = defaultApi;
