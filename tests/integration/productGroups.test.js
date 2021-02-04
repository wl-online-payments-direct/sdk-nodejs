const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');

describe('Product groups', () => {
  describe('Promises', () => {
    test('it can get product groups', async () => {
      const sdkResponse = await sdkInstance.productGroups.getProductGroups(config.merchantId, {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a product group', async () => {
      const sdkResponse = await sdkInstance.productGroups.getProductGroup(config.merchantId, 'PRODUCT_GROUP_ID', {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can get product groups', (done) => {
      sdkInstance.productGroups.getProductGroups(
        config.merchantId,
        {
          countryCode: 'NL',
          currencyCode: 'EUR',
        },
        (error, sdkResponse) => {
          expect(error).toBeNull();
          expect(sdkResponse.isSuccess).toBe(true);
          expect(sdkResponse).toMatchSnapshot();
          done();
        }
      );
    });

    test('it can get a product group', (done) => {
      sdkInstance.productGroups.getProductGroup(
        config.merchantId,
        'PRODUCT_GROUP_ID',
        {
          countryCode: 'NL',
          currencyCode: 'EUR',
        },
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
