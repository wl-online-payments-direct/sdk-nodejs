/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/payments/${paymentId}/captures`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
