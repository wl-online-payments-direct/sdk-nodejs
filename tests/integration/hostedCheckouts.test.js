const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');
const stubs = require('./__stubs__');

describe('Hosted checkouts', () => {
  describe('Promises', () => {
    test('it can create a hosted checkout', async () => {
      const sdkResponse = await sdkInstance.hostedCheckout.createHostedCheckout(
        config.merchantId,
        stubs.createHostedCheckout,
        {}
      );
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a hosted checkout', async () => {
      const sdkResponse = await sdkInstance.hostedCheckout.getHostedCheckout(config.merchantId, 'hostedCheckoutId', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can create a hosted checkout', (done) => {
      sdkInstance.hostedCheckout.createHostedCheckout(
        config.merchantId,
        stubs.createHostedCheckout,
        {},
        (error, sdkResponse) => {
          expect(error).toBeNull();
          expect(sdkResponse.isSuccess).toBe(true);
          expect(sdkResponse).toMatchSnapshot();
          done();
        }
      );
    });

    test('it can get a hosted checkout', (done) => {
      sdkInstance.hostedCheckout.getHostedCheckout(config.merchantId, 'hostedCheckoutId', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
