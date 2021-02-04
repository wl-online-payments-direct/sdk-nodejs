const util = require('util');

module.exports = (apiRootMethods) =>
  Object.keys(apiRootMethods).reduce(
    (rootMethodAccumulator, apiRootMethodKey) => ({
      ...rootMethodAccumulator,
      [apiRootMethodKey]: Object.keys(apiRootMethods[apiRootMethodKey]).reduce(
        (methodAccumulator, apiMethodKey) => ({
          ...methodAccumulator,
          [apiMethodKey]: util.promisify(apiRootMethods[apiRootMethodKey][apiMethodKey]),
        }),
        {}
      ),
    }),
    {}
  );
