/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, hostedCheckoutId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/hostedcheckouts/${hostedCheckoutId}`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
