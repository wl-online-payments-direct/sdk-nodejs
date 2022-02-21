/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getHostedCheckout = (merchantId, hostedCheckoutId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/hostedcheckouts/${hostedCheckoutId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getHostedCheckout;
