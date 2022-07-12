/* This file was auto-generated. */

const getPaymentProducts = require('./getPaymentProducts');
const getPaymentProduct = require('./getPaymentProduct');
const getProductDirectory = require('./getProductDirectory');
const getPaymentProductNetworks = require('./getPaymentProductNetworks');

module.exports = function (sdkContext) {
  return {
    getPaymentProducts: getPaymentProducts(sdkContext),
    getPaymentProduct: getPaymentProduct(sdkContext),
    getProductDirectory: getProductDirectory(sdkContext),
    getPaymentProductNetworks: getPaymentProductNetworks(sdkContext),
  };
};
