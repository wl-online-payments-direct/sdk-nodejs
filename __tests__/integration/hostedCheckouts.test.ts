import sdkInstance, { config } from "./initPrism";
import stubs from "./__stubs__";

describe("Hosted checkouts", () => {
  describe("Promises", () => {
    test("it can create a hosted checkout", async () => {
      const sdkResponse = await sdkInstance.hostedCheckout.createHostedCheckout(config.merchantId, stubs.createHostedCheckout, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get a hosted checkout", async () => {
      const sdkResponse = await sdkInstance.hostedCheckout.getHostedCheckout(config.merchantId, "hostedCheckoutId", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can create a hosted checkout", done => {
      sdkInstance.hostedCheckout.createHostedCheckout(config.merchantId, stubs.createHostedCheckout, {}).then(response => {
        expect(response.isSuccess).toBe(true);
        expect(response).toMatchSnapshot();
        done();
      });
    });

    test("it can get a hosted checkout", done => {
      sdkInstance.hostedCheckout.getHostedCheckout(config.merchantId, "hostedCheckoutId", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
