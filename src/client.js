/* This file was auto-generated. */

const promisify = require('./utils/promisify');
const webhooks = require('./webhooks');

// API methods
const hostedCheckout = require('./methods/hostedCheckout');
const hostedTokenization = require('./methods/hostedTokenization');
const mandates = require('./methods/mandates');
const payments = require('./methods/payments');
const payouts = require('./methods/payouts');
const productGroups = require('./methods/productGroups');
const products = require('./methods/products');
const services = require('./methods/services');
const sessions = require('./methods/sessions');
const tokens = require('./methods/tokens');

module.exports = function (sdkContext) {
  const apis = {
    hostedCheckout: hostedCheckout(sdkContext),
    hostedTokenization: hostedTokenization(sdkContext),
    mandates: mandates(sdkContext),
    payments: payments(sdkContext),
    payouts: payouts(sdkContext),
    productGroups: productGroups(sdkContext),
    products: products(sdkContext),
    services: services(sdkContext),
    sessions: sessions(sdkContext),
    tokens: tokens(sdkContext),
  };
  return {
    ...promisify(apis),
    context: sdkContext,
    webhooks,
  };
};
