/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreateHostedCheckoutRequest.json');
const validator = require('../../utils/validator');

const createHostedCheckout = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/hostedcheckouts`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createHostedCheckout;
