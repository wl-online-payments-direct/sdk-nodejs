/* This file was auto-generated. */

const getPrivacyPolicy = require('./getPrivacyPolicy');
const testConnection = require('./testConnection');
const getIINDetails = require('./getIINDetails');

module.exports = function (sdkContext) {
  return {
    getPrivacyPolicy: getPrivacyPolicy(sdkContext),
    testConnection: testConnection(sdkContext),
    getIINDetails: getIINDetails(sdkContext),
  };
};
