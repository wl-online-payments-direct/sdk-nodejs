/* This file was auto-generated. */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreateTokenRequest.json');
const validator = require('../../utils/validator');

module.exports = (sdkContext) => {
  return function (merchantId, postData, paymentContext, cb = null) {
    // validate postData
    validator.validatePostData(postData, requestSchema);

    communicator.json(
      {
        method: 'POST',
        modulePath: `/v2/${merchantId}/tokens`,
        body: postData,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
