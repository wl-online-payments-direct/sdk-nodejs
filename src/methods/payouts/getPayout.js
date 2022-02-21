/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPayout = (merchantId, payoutId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/payouts/${payoutId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPayout;
