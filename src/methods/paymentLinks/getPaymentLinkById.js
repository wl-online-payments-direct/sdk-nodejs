/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentLinkId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/paymentlinks/${paymentLinkId}`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
