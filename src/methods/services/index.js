/* This file was auto-generated. */

const surchargeCalculation = require('./surchargeCalculation');
const getPrivacyPolicy = require('./getPrivacyPolicy');
const testConnection = require('./testConnection');
const getIINDetails = require('./getIINDetails');

module.exports = function (sdkContext) {
  return {
    surchargeCalculation: surchargeCalculation(sdkContext),
    getPrivacyPolicy: getPrivacyPolicy(sdkContext),
    testConnection: testConnection(sdkContext),
    getIINDetails: getIINDetails(sdkContext),
  };
};
