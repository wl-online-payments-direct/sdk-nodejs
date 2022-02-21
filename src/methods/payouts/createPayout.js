/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreatePayoutRequest.json');
const validator = require('../../utils/validator');

const createPayout = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/payouts`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createPayout;
