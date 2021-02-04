/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
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
