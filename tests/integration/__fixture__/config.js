module.exports = {
  openApiDocPath: `${process.cwd()}/contract-definition.json`,
  openApiUrl: 'https://payment.preprod.direct.worldline-solutions.com/v1/public-contract-definition.yaml',
  port: 4010,
  merchantId: 'MERCHANT_ID',
  apiKeyId: 'API_KEY_ID',
  secretApiKey: 'API_SECRET',
  apiEndpoint: {
    host: 'localhost',
    scheme: 'http',
    port: 4010,
  },
  integrator: 'INTEGRATOR',
  enableLogging: false,
};
