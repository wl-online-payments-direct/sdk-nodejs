const directSdk = require('../..');

const getContext = ({ apiKeyId, secretApiKey }) => ({
  integrator: 'INTEGRATOR_ONE',
  host: 'payment.preprod.direct.worldline-solutions.com',
  scheme: 'https', // default
  port: 443, // default
  enableLogging: false, // defaults to false
  apiKeyId,
  secretApiKey,
});

const CONTEXT_ONE = {
  apiKeyId: 'apiKeyIdOne',
  secretApiKey: 'secretApiKeyOne',
  merchantId: 'merchantIdOne',
};

const CONTEXT_TWO = {
  apiKeyId: 'apiKeyIdTwo',
  secretApiKey: 'secretApiKeyTwo',
  merchantId: 'merchantIdTwo',
};

describe('Default', () => {
  test('init cannot create two instances with different contexts', async () => {
    const sdkOne = directSdk.init(getContext(CONTEXT_ONE));
    const sdkTwo = directSdk.init(getContext(CONTEXT_TWO));
    const { apiKeyId: sdkOneApiKeyId, secretApiKey: sdkOneSecretApiKey } = sdkOne.context.getContext();
    const { apiKeyId: sdkTwoApiKeyId, secretApiKey: sdkTwoSecretApiKey } = sdkTwo.context.getContext();
    expect(sdkOneApiKeyId).toBe(sdkTwoApiKeyId);
    expect(sdkOneSecretApiKey).toBe(sdkTwoSecretApiKey);
  });

  test('immutableInit can create two instances with different contexts', async () => {
    const sdkOne = directSdk.immutableInit(getContext(CONTEXT_ONE));
    const sdkTwo = directSdk.immutableInit(getContext(CONTEXT_TWO));
    const { apiKeyId: sdkOneApiKeyId, secretApiKey: sdkOneSecretApiKey } = sdkOne.context.getContext();
    const { apiKeyId: sdkTwoApiKeyId, secretApiKey: sdkTwoSecretApiKey } = sdkTwo.context.getContext();
    expect(sdkOneApiKeyId).not.toBe(sdkTwoApiKeyId);
    expect(sdkOneSecretApiKey).not.toBe(sdkTwoSecretApiKey);
  });
});
