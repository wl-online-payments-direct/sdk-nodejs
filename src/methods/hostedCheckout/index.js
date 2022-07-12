/* This file was auto-generated. */

const createHostedCheckout = require('./createHostedCheckout');
const getHostedCheckout = require('./getHostedCheckout');

module.exports = function (sdkContext) {
  return {
    createHostedCheckout: createHostedCheckout(sdkContext),
    getHostedCheckout: getHostedCheckout(sdkContext),
  };
};
