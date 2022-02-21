/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getToken = (merchantId, tokenId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/tokens/${tokenId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getToken;
