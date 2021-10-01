/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreatePaymentRequest.json');
const validator = require('../../utils/validator');

const createPayment = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/payments`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createPayment;
