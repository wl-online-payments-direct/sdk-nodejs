/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPayment = (merchantId, paymentId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/payments/${paymentId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPayment;
