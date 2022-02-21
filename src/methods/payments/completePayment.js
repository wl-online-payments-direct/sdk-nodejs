/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CompletePaymentRequest.json');
const validator = require('../../utils/validator');

const completePayment = (merchantId, paymentId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/payments/${paymentId}/complete`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = completePayment;
