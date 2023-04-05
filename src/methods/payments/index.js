/* This file was auto-generated. */

const createPayment = require('./createPayment');
const getPayment = require('./getPayment');
const completePayment = require('./completePayment');
const cancelPayment = require('./cancelPayment');
const subsequentPayment = require('./subsequentPayment');
const refundPayment = require('./refundPayment');
const capturePayment = require('./capturePayment');
const getCaptures = require('./getCaptures');
const getPaymentDetails = require('./getPaymentDetails');
const getRefunds = require('./getRefunds');

module.exports = function (sdkContext) {
  return {
    createPayment: createPayment(sdkContext),
    getPayment: getPayment(sdkContext),
    completePayment: completePayment(sdkContext),
    cancelPayment: cancelPayment(sdkContext),
    subsequentPayment: subsequentPayment(sdkContext),
    refundPayment: refundPayment(sdkContext),
    capturePayment: capturePayment(sdkContext),
    getCaptures: getCaptures(sdkContext),
    getPaymentDetails: getPaymentDetails(sdkContext),
    getRefunds: getRefunds(sdkContext),
  };
};
