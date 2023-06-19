/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentLinkId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'POST',
        modulePath: `/v2/${merchantId}/paymentlinks/${paymentLinkId}/cancel`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
