import client, { config } from "./initPrism";

describe("Hosted tokenization", () => {
  describe("Promises", () => {
    test("it can create a hosted tokenization", async () => {
      const sdkResponse = await client.hostedTokenization.createHostedTokenization(config.merchantId, {}, {});
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });

    test("it can get a hosted tokenization", async () => {
      const sdkResponse = await client.hostedTokenization.getHostedTokenization(config.merchantId, "HOSTED_TOKENIZATION_ID", {});

      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
    });
  });

  describe("Callback", () => {
    test("it can create a hosted tokenization", done => {
      client.hostedTokenization.createHostedTokenization(config.merchantId, {}, {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });

    test("it can get a hosted tokenization", done => {
      client.hostedTokenization.getHostedTokenization(config.merchantId, "HOSTED_TOKENIZATION_ID", {}).then(sdkResponse => {
        expect(sdkResponse.isSuccess).toBe(true);
        expect(sdkResponse).toMatchSnapshot();
        done();
      });
    });
  });
});
