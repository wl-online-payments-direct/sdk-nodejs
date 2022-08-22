const { validate } = require('jsonschema');

module.exports = {
  validatePostData(postData, requestSchema, sdkContext) {
    const validationResult = validate(postData, requestSchema);
    if (!validationResult.valid) {
      if (sdkContext.isLoggingEnabled()) {
        sdkContext.getLogger()('error', validationResult.errors);
      }
      throw new Error(validationResult.errors.map((error) => `${error.property}: ${error.message}`).join('\n'));
    }
  },
};
