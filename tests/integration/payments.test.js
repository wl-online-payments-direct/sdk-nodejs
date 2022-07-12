const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');
const stubs = require('./__stubs__');

describe('Payments', () => {
  describe('Promises', () => {
    test('it can cancel a payment', async () => {
      const sdkResponse = await sdkInstance.payments.cancelPayment(config.merchantId, 'PAYMENT_ID', {}, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can capture a payment', async () => {
      const sdkResponse = await sdkInstance.payments.capturePayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.capturePayment,
        {}
      );
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test.skip('it can complete a payment', async () => {
      const sdkResponse = await sdkInstance.payments.completePayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.completePayment,
        {}
      );

      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can create a payment', async () => {
      const sdkResponse = await sdkInstance.payments.createPayment(config.merchantId, stubs.createPayment, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get captures', async () => {
      const sdkResponse = await sdkInstance.payments.getCaptures(config.merchantId, 'PAYMENT_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a payment', async () => {
      const sdkResponse = await sdkInstance.payments.getPayment(config.merchantId, 'PAYMENT_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can get a refunds', async () => {
      const sdkResponse = await sdkInstance.payments.getRefunds(config.merchantId, 'PAYMENT_ID', {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test('it can refund a payment', async () => {
      const sdkResponse = await sdkInstance.payments.refundPayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.refundPayment,
        {}
      );
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe('Callback', () => {
    test('it can cancel a payment', (done) => {
      sdkInstance.payments.cancelPayment(config.merchantId, 'PAYMENT_ID', {}, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can capture a payment', (done) => {
      sdkInstance.payments.capturePayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.capturePayment,
        {},
        (error, sdkResponse) => {
          expect(error).toBeNull();
          expect(sdkResponse.isSuccess).toBe(true);
          expect(sdkResponse).toMatchSnapshot();
          done();
        }
      );
    });

    test.skip('it can complete a payment', (done) => {
      sdkInstance.payments.completePayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.completePayment,
        {},
        (error, sdkResponse) => {
          expect(error).toBeNull();
          expect(sdkResponse.isSuccess).toBe(true);
          expect(sdkResponse).toMatchSnapshot();
          done();
        }
      );
    });

    test('it can create a payment', (done) => {
      sdkInstance.payments.createPayment(config.merchantId, stubs.createPayment, {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can get captures', (done) => {
      sdkInstance.payments.getCaptures(config.merchantId, 'PAYMENT_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can get a payment', (done) => {
      sdkInstance.payments.getPayment(config.merchantId, 'PAYMENT_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can get a refunds', (done) => {
      sdkInstance.payments.getRefunds(config.merchantId, 'PAYMENT_ID', {}, (error, sdkResponse) => {
        expect(error).toBeNull();
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test('it can refund a payment', (done) => {
      sdkInstance.payments.refundPayment(
        config.merchantId,
        'PAYMENT_ID',
        stubs.refundPayment,
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
