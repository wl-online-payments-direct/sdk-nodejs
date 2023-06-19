/* This file was auto-generated. */

const createPaymentLink = require('./createPaymentLink');
const getPaymentLinkById = require('./getPaymentLinkById');
const cancelPaymentLinkById = require('./cancelPaymentLinkById');

module.exports = function (sdkContext) {
  return {
    createPaymentLink: createPaymentLink(sdkContext),
    getPaymentLinkById: getPaymentLinkById(sdkContext),
    cancelPaymentLinkById: cancelPaymentLinkById(sdkContext),
  };
};
