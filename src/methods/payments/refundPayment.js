/* This file was auto-generated. */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/RefundRequest.json');
const validator = require('../../utils/validator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentId, postData, paymentContext, cb = null) {
    // validate postData
    validator.validatePostData(postData, requestSchema);

    communicator.json(
      {
        method: 'POST',
        modulePath: `/v2/${merchantId}/payments/${paymentId}/refund`,
        body: postData,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
