/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getMandate = (merchantId, uniqueMandateReference, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/mandates/${uniqueMandateReference}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getMandate;
