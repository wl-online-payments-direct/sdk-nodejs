/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const blockMandate = (merchantId, uniqueMandateReference, paymentContext, cb) => {
  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}/block`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = blockMandate;
