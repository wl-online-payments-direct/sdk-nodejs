/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
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
