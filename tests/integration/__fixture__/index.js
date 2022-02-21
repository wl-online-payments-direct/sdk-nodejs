const onlinePaymentsSdk = require('../../..');
const config = require('./config');

module.exports = onlinePaymentsSdk.init({
  host: config.apiEndpoint.host,
  scheme: config.apiEndpoint.scheme,
  port: config.apiEndpoint.port,
  enableLogging: config.enableLogging,
  apiKeyId: config.apiKeyId,
  secretApiKey: config.secretApiKey,
  integrator: 'OnlinePayments',
});
