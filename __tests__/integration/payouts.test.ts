import sdkInstance, { config } from "./initPrism";
import stubs from "./__stubs__";

describe("Payouts", () => {
  describe("Promises", () => {
    test("it can create a payout", async () => {
      const sdkResponse = await sdkInstance.payouts.createPayout(config.merchantId, stubs.createPayout, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get a payout", async () => {
      const sdkResponse = await sdkInstance.payouts.getPayout(config.merchantId, "PAYOUT_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can create a payout", done => {
      sdkInstance.payouts.createPayout(config.merchantId, stubs.createPayout, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can get a payout", done => {
      sdkInstance.payouts.getPayout(config.merchantId, "PAYOUT_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
