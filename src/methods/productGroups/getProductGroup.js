/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getProductGroup = (merchantId, paymentProductGroupId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/productgroups/${paymentProductGroupId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getProductGroup;
