const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');

describe('Services', () => {
  describe('Promises', () => {
    test('it can test a connection', async () => {
      const sdkResponse = await sdkInstance.services.testConnection(config.merchantId, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can test a connection', (done) => {
      sdkInstance.services.testConnection(config.merchantId, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
