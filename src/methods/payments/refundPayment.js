/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/RefundRequest.json');
const validator = require('../../utils/validator');

const refundPayment = (merchantId, paymentId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/payments/${paymentId}/refund`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = refundPayment;
