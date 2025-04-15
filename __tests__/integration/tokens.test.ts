import sdkInstance, { config } from "./initPrism";
import stubs from "./__stubs__";

describe("Tokens", () => {
  describe("Promises", () => {
    test("it can get a token", async () => {
      const sdkResponse = await sdkInstance.tokens.getToken(config.merchantId, "TOKEN_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can create a token", async () => {
      const sdkResponse = await sdkInstance.tokens.createToken(config.merchantId, stubs.createToken, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can remove a token", async () => {
      const sdkResponse = await sdkInstance.tokens.deleteToken(config.merchantId, "TOKEN_ID", {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can get a token", done => {
      sdkInstance.tokens.getToken(config.merchantId, "TOKEN_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can create a token", done => {
      sdkInstance.tokens.createToken(config.merchantId, stubs.createToken, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can remove a token", done => {
      sdkInstance.tokens.deleteToken(config.merchantId, "TOKEN_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
