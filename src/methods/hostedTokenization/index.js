/* This file was auto-generated. */

const createHostedTokenization = require('./createHostedTokenization');
const getHostedTokenization = require('./getHostedTokenization');

module.exports = function (sdkContext) {
  return {
    createHostedTokenization: createHostedTokenization(sdkContext),
    getHostedTokenization: getHostedTokenization(sdkContext),
  };
};
