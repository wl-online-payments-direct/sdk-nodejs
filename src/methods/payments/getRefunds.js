/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
const communicator = require('../../utils/communicator');

const getRefunds = (merchantId, paymentId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/payments/${paymentId}/refunds`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getRefunds;
