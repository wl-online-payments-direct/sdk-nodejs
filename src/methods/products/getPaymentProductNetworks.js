/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPaymentProductNetworks = (merchantId, paymentProductId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/products/${paymentProductId}/networks`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPaymentProductNetworks;
