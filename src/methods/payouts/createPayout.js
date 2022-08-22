/* This file was auto-generated. */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreatePayoutRequest.json');
const validator = require('../../utils/validator');

module.exports = (sdkContext) => {
  return function (merchantId, postData, paymentContext, cb = null) {
    // validate postData
    validator.validatePostData(postData, requestSchema, sdkContext);

    communicator.json(
      {
        method: 'POST',
        modulePath: `/v2/${merchantId}/payouts`,
        body: postData,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
