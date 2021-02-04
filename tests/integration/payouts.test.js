const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');
const stubs = require('./__stubs__');

describe('Payouts', () => {
  describe('Promises', () => {
    test('it can create a payout', async () => {
      const sdkResponse = await sdkInstance.payouts.createPayout(config.merchantId, stubs.createPayout, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a payout', async () => {
      const sdkResponse = await sdkInstance.payouts.getPayout(config.merchantId, 'PAYOUT_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can create a payout', (done) => {
      sdkInstance.payouts.createPayout(config.merchantId, stubs.createPayout, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can get a payout', (done) => {
      sdkInstance.payouts.getPayout(config.merchantId, 'PAYOUT_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
