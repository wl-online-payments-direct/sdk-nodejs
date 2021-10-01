const { validate } = require('jsonschema');
const sdkContext = require('./context');

module.exports = {
  validatePostData(postData, requestSchema) {
    const isValidRequest = validate(postData, requestSchema);
    if (!isValidRequest.valid) {
      const logger = sdkContext.getLogger();
      if (sdkContext.isLoggingEnabled()) {
        logger('error', isValidRequest.errors);
      }
      throw new Error(isValidRequest.errors.map((error) => `${error.property}: ${error.message}`).join('\n'));
    }
  },
};
