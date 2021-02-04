/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
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
