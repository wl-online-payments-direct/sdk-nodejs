const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');
const stubs = require('./__stubs__');

describe('Tokens', () => {
  describe('Promises', () => {
    test('it can get a token', async () => {
      const sdkResponse = await sdkInstance.tokens.getToken(config.merchantId, 'TOKEN_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can create a token', async () => {
      const sdkResponse = await sdkInstance.tokens.createToken(config.merchantId, stubs.createToken, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can remove a token', async () => {
      const sdkResponse = await sdkInstance.tokens.removeToken(config.merchantId, 'TOKEN_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can get a token', (done) => {
      sdkInstance.tokens.getToken(config.merchantId, 'TOKEN_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can create a token', (done) => {
      sdkInstance.tokens.createToken(config.merchantId, stubs.createToken, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can remove a token', (done) => {
      sdkInstance.tokens.removeToken(config.merchantId, 'TOKEN_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
