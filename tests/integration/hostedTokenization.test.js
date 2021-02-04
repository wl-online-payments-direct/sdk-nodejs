const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');

describe('Hosted tokenization', () => {
  describe('Promises', () => {
    test('it can create a hosted tokenization', async () => {
      const sdkResponse = await sdkInstance.hostedTokenization.createHostedTokenization(config.merchantId, {}, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a hosted tokenization', async () => {
      const sdkResponse = await sdkInstance.hostedTokenization.getHostedTokenization(
        config.merchantId,
        'HOSTED_TOKENIZATION_ID',
        {}
      );

      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can create a hosted tokenization', (done) => {
      sdkInstance.hostedTokenization.createHostedTokenization(config.merchantId, {}, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can get a hosted tokenization', (done) => {
      sdkInstance.hostedTokenization.getHostedTokenization(
        config.merchantId,
        'HOSTED_TOKENIZATION_ID',
        {},
        (error, sdkResponse) => {
          expect(error).toBeNull();
          expect(sdkResponse.isSuccess).toBe(true);
          expect(sdkResponse).toMatchSnapshot();
          done();
        }
      );
    });
  });
});
