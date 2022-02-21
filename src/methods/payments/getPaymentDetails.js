/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPaymentDetails = (merchantId, paymentId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/payments/${paymentId}/details`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPaymentDetails;
