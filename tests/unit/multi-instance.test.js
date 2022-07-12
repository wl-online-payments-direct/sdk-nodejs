const stubs = require('../integration/__stubs__');
const directSdk = require('../..');

const createTestContext = ({ apiKeyId, secretApiKey }) => ({
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

jest.mock('../../src/utils/communicator', () => {
  return {
    json(o, sdkContext) {
      o.cb(null /* error argument */, {
        // This is how we get the apiKeyId in `prepareRequest`, so verifying it this way is good enough
        apiKeyId: sdkContext.getContext().apiKeyId,
      });
    },
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('SDK multi-instance initialization', () => {
  test('init can create two instances with different contexts', async () => {
    const instance1 = directSdk.init(createTestContext(CONTEXT_ONE));
    const instance2 = directSdk.init(createTestContext(CONTEXT_TWO));

    const ctx1 = instance1.context.getContext();
    const ctx2 = instance2.context.getContext();

    expect(ctx1.apiKeyId).toBe(CONTEXT_ONE.apiKeyId);
    expect(ctx2.apiKeyId).toBe(CONTEXT_TWO.apiKeyId);
    expect(ctx1.apiKeyId).not.toBe(ctx2.apiKeyId);

    expect(ctx1.secretApiKey).toBe(CONTEXT_ONE.secretApiKey);
    expect(ctx2.secretApiKey).toBe(CONTEXT_TWO.secretApiKey);
    expect(ctx1.secretApiKey).not.toBe(ctx2.secretApiKey);
  });

  test('SDK methods use their own instance data', async () => {
    const instance1 = directSdk.init(createTestContext(CONTEXT_ONE));
    const instance2 = directSdk.init(createTestContext(CONTEXT_TWO));

    instance1.payments.createPayment(CONTEXT_ONE.merchantId, stubs.createPayment, {}, (err, response) => {
      expect(response.apiKeyId).toBe(CONTEXT_ONE.apiKeyId);
    });

    instance2.payments.createPayment(CONTEXT_TWO.merchantId, stubs.createPayment, {}, (err, response) => {
      expect(response.apiKeyId).toBe(CONTEXT_TWO.apiKeyId);
    });

    const response1 = await instance1.payments.createPayment(CONTEXT_ONE.merchantId, stubs.createPayment, {});
    expect(response1.apiKeyId).toBe(CONTEXT_ONE.apiKeyId);

    const response2 = await instance2.payments.createPayment(CONTEXT_TWO.merchantId, stubs.createPayment, {});
    expect(response2.apiKeyId).toBe(CONTEXT_TWO.apiKeyId);
  });
});
