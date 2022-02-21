/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');

const getProductGroups = (merchantId, paymentContext, cb) => {
  communicator.json({
    method: 'GET',
    modulePath: `/v2/${merchantId}/productgroups`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = getProductGroups;
