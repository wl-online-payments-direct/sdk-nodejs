import sdkInstance, { config } from "./initPrism";

describe("Services", () => {
  describe("Promises", () => {
    test("it can test a connection", async () => {
      const sdkResponse = await sdkInstance.services.testConnection(config.merchantId, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can test a connection", done => {
      sdkInstance.services.testConnection(config.merchantId, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
