/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPaymentProducts = (merchantId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/products`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPaymentProducts;
