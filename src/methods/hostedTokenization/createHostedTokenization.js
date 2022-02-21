/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreateHostedTokenizationRequest.json');
const validator = require('../../utils/validator');

const createHostedTokenization = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/hostedtokenizations`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createHostedTokenization;
