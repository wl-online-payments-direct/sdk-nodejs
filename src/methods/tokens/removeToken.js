/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, tokenId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'DELETE',
        modulePath: `/v2/${merchantId}/tokens/${tokenId}`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
