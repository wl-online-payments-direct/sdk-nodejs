/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentProductId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/products/${paymentProductId}/networks`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
