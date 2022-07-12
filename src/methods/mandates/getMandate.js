/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, uniqueMandateReference, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
