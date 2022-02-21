/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPaymentProduct = (merchantId, paymentProductId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/products/${paymentProductId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPaymentProduct;
