/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getPrivacyPolicy = (merchantId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/services/privacypolicy`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getPrivacyPolicy;
