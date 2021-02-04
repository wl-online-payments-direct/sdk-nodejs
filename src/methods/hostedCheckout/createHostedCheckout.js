/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
const { validate } = require('jsonschema');
const communicator = require('../../utils/communicator');
const sdkContext = require('../../utils/context');
const requestSchema = require('../../schemas/CreateHostedCheckoutRequest.json');

const createHostedCheckout = (merchantId, postData, paymentContext, cb) => {
  // validate postData
  const isValidRequest = validate(postData, requestSchema);
  if (!isValidRequest.valid) {
    const logger = sdkContext.getLogger();
    if (sdkContext.isLoggingEnabled()) {
      logger('error', isValidRequest.errors);
    }
    throw new Error(isValidRequest.errors.map((error) => `${error.property}: ${error.message}`).join('\n'));
  }

  communicator.json({
    method: 'POST',
    modulePath: `/v2/${merchantId}/hostedcheckouts`,
    body: postData,
    paymentContext,
    cb,
  });
};

module.exports = createHostedCheckout;
