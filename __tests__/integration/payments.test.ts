import sdkInstance, { config } from "./initPrism";
import stubs from "./__stubs__";

describe("Payments", () => {
  describe("Promises", () => {
    test("it can cancel a payment", async () => {
      const sdkResponse = await sdkInstance.payments.cancelPayment(config.merchantId, "PAYMENT_ID", {}, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can capture a payment", async () => {
      const sdkResponse = await sdkInstance.payments.capturePayment(config.merchantId, "PAYMENT_ID", stubs.capturePayment, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can complete a payment", async () => {
      const sdkResponse = await sdkInstance.complete.completePayment(config.merchantId, "PAYMENT_ID", stubs.completePayment, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can create a payment", async () => {
      const sdkResponse = await sdkInstance.payments.createPayment(config.merchantId, stubs.createPayment, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get captures", async () => {
      const sdkResponse = await sdkInstance.captures.getCaptures(config.merchantId, "PAYMENT_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get a payment", async () => {
      const sdkResponse = await sdkInstance.payments.getPayment(config.merchantId, "PAYMENT_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get a refunds", async () => {
      const sdkResponse = await sdkInstance.refunds.getRefunds(config.merchantId, "PAYMENT_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can refund a payment", async () => {
      const sdkResponse = await sdkInstance.payments.refundPayment(config.merchantId, "PAYMENT_ID", stubs.refundPayment, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can cancel a payment", done => {
      sdkInstance.payments.cancelPayment(config.merchantId, "PAYMENT_ID", {}, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can capture a payment", done => {
      sdkInstance.payments.capturePayment(config.merchantId, "PAYMENT_ID", stubs.capturePayment, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test("it can complete a payment", done => {
      sdkInstance.complete.completePayment(config.merchantId, "PAYMENT_ID", stubs.completePayment, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can create a payment", done => {
      sdkInstance.payments.createPayment(config.merchantId, stubs.createPayment, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test("it can get captures", done => {
      sdkInstance.captures.getCaptures(config.merchantId, "PAYMENT_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can get a payment", done => {
      sdkInstance.payments.getPayment(config.merchantId, "PAYMENT_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test("it can get a refunds", done => {
      sdkInstance.refunds.getRefunds(config.merchantId, "PAYMENT_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can refund a payment", done => {
      sdkInstance.payments.refundPayment(config.merchantId, "PAYMENT_ID", stubs.refundPayment, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
