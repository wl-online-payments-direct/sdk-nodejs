/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const revokeMandate = (merchantId, uniqueMandateReference, paymentContext, cb) => {
  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}/revoke`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = revokeMandate;
