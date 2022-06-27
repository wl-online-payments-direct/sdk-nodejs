/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const cancelPayment = (merchantId, paymentId, paymentContext, cb) => {
  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/payments/${paymentId}/cancel`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = cancelPayment;
