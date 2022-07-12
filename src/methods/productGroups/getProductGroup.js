/* This file was auto-generated. */
const communicator = require('../../utils/communicator');

module.exports = (sdkContext) => {
  return function (merchantId, paymentProductGroupId, paymentContext, cb = null) {
    communicator.json(
      {
        method: 'GET',
        modulePath: `/v2/${merchantId}/productgroups/${paymentProductGroupId}`,
        body: null,
        paymentContext,
        cb,
      },
      sdkContext
    );
  };
};
