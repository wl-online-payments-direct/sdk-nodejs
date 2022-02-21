/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const unblockMandate = (merchantId, uniqueMandateReference, paymentContext, cb) => {
  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}/unblock`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = unblockMandate;
