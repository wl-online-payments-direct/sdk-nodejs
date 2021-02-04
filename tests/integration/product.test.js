const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');

const PAYMENT_PRODUCT_ID = 1;

describe('Payment products', () => {
  describe('Promises', () => {
    test('it can get payment products', async () => {
      const sdkResponse = await sdkInstance.products.getPaymentProducts(config.merchantId, {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a payment product', async () => {
      const sdkResponse = await sdkInstance.products.getPaymentProduct(config.merchantId, PAYMENT_PRODUCT_ID, {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get payment product networks', async () => {
      const sdkResponse = await sdkInstance.products.getPaymentProductNetworks(config.merchantId, PAYMENT_PRODUCT_ID, {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a product directory', async () => {
      const sdkResponse = await sdkInstance.products.getProductDirectory(config.merchantId, PAYMENT_PRODUCT_ID, {
        countryCode: 'NL',
        currencyCode: 'EUR',
      });
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can get payment products', (done) => {
      sdkInstance.products.getPaymentProducts(
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

    test('it can get a payment product', (done) => {
      sdkInstance.products.getPaymentProduct(
        config.merchantId,
        PAYMENT_PRODUCT_ID,
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

    test('it can get payment product networks', (done) => {
      sdkInstance.products.getPaymentProductNetworks(
        config.merchantId,
        PAYMENT_PRODUCT_ID,
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

    test('it can get a product directory', (done) => {
      sdkInstance.products.getProductDirectory(
        config.merchantId,
        PAYMENT_PRODUCT_ID,
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
