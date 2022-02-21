/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreateTokenRequest.json');
const validator = require('../../utils/validator');

const createToken = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/tokens`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createToken;
