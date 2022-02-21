/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getHostedTokenization = (merchantId, hostedTokenizationId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/hostedtokenizations/${hostedTokenizationId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getHostedTokenization;
