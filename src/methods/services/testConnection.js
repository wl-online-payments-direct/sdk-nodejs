/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const testConnection = (merchantId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/services/testconnection`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = testConnection;
