/*
 * This class was auto-generated.
 */
const communicator = require('../../utils/communicator');
const requestSchema = require('../../schemas/CreateMandateRequest.json');
const validator = require('../../utils/validator');

const createMandate = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  validator.validatePostData(postData, requestSchema);

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/mandates`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createMandate;
