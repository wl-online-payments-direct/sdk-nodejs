const dateformat = require('dateformat');

const date = function () {
  return `${dateformat('GMT:ddd, dd mmm yyyy HH:MM:ss')} GMT`;
};

const serverMetaInfo = function (sdkContext) {
  const info = {
    key: 'X-GCS-ServerMetaInfo',
    value: {
      sdkCreator: 'OnlinePayments',
      sdkIdentifier: 'NodejsServerSDK/v3.9.0',
      platformIdentifier: `${process.env.OS} Node.js/${process.versions.node}`,
    },
  };
  if (sdkContext.getIntegrator() !== null) {
    info.value.integrator = sdkContext.getIntegrator();
  }
  if (sdkContext.getShoppingCartExtension() !== null) {
    info.value.shoppingCartExtension = sdkContext.getShoppingCartExtension();
  }
  info.value = Buffer.from(JSON.stringify(info.value)).toString('base64');
  return info;
};

const isJSON = function (contentType) {
  return contentType == null || contentType.toLowerCase().startsWith('application/json');
};

const contentLength = function (headers) {
  const length = headers['content-length'];
  if (length) {
    const intLength = parseInt(length, 10);
    return Number.isNaN(intLength) ? length : intLength;
  }
  return null;
};

module.exports = {
  date,
  serverMetaInfo,
  isJSON,
  contentLength,
};
